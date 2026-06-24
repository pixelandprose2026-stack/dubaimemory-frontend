import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

const fluidVertShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fluidFragShader = `
precision highp float;
uniform sampler2D uFluidTex;
uniform vec2 iMouse;
uniform vec2 uResolution;
uniform float uBrushSize;
uniform float uBrushStrength;
uniform float uFluidDecay;
uniform float uTrailLength;
uniform float uStopDecay;
uniform float uPointerActive;
varying vec2 v_uv;

void main() {
  vec2 texel = vec2(1.0) / uResolution;
  vec4 prev = texture2D(uFluidTex, v_uv);
  vec2 vel = prev.rg * 2.0 - 1.0;
  float ink = prev.b * 2.0 - 1.0;

  vec4 n = texture2D(uFluidTex, v_uv + vec2(0.0, texel.y));
  vec4 s = texture2D(uFluidTex, v_uv + vec2(0.0, -texel.y));
  vec4 e = texture2D(uFluidTex, v_uv + vec2(texel.x, 0.0));
  vec4 w = texture2D(uFluidTex, v_uv + vec2(-texel.x, 0.0));

  vec2 nVel = n.rg * 2.0 - 1.0;
  vec2 sVel = s.rg * 2.0 - 1.0;
  vec2 eVel = e.rg * 2.0 - 1.0;
  vec2 wVel = w.rg * 2.0 - 1.0;

  float nInk = n.b * 2.0 - 1.0;
  float sInk = s.b * 2.0 - 1.0;
  float eInk = e.b * 2.0 - 1.0;
  float wInk = w.b * 2.0 - 1.0;

  vel = mix(vel, (nVel + sVel + eVel + wVel) * 0.25, 0.18);
  ink = mix(ink, (nInk + sInk + eInk + wInk) * 0.25, 0.18);

  vel *= uFluidDecay;
  ink *= uTrailLength;

  if (uPointerActive > 0.5) {
    vec2 mouseUV = iMouse / uResolution;
    vec2 delta = v_uv - mouseUV;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    delta *= aspect;
    float dist = length(delta);
    float brushSizeFactor = 2.2e-4 / uBrushSize;
    float strengthFactor = 0.03 * uBrushStrength;
    float falloff = exp(-dist * dist / brushSizeFactor);
    vel += delta * strengthFactor * falloff;
    ink += falloff * strengthFactor * 6.0;
  } else {
    vec2 mouseUV = iMouse / uResolution;
    vec2 delta = v_uv - mouseUV;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    delta *= aspect;
    float dist = length(delta);
    float nearCursor = exp(-dist * dist / (2.2e-4 / uBrushSize));
    float stopFade = mix(1.0, uStopDecay, nearCursor);
    vel *= stopFade;
    ink *= stopFade;
  }

  vel = clamp(vel, vec2(-0.8), vec2(0.8));
  ink = clamp(ink, -0.8, 0.8);

  vec3 col = vec3(vel * 0.5 + 0.5, ink * 0.5 + 0.5);
  gl_FragColor = vec4(col, 1.0);
}
`;

const displayVertShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const displayFragShader = `
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform sampler2D u_fluid;
varying vec2 v_uv;

vec2 zoom(vec2 uv, float t) {
  return uv * t;
}

vec2 translate(vec2 uv, vec2 d) {
  return uv + d;
}

float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

vec2 rotate(vec2 uv, float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * uv;
}

void main() {
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 uv = v_uv;
  vec2 mouseUV = u_mouse / u_resolution - 0.5;
  mouseUV *= aspect;

  vec3 fluidState = texture2D(u_fluid, uv).rgb;
  vec2 fluidVel = (fluidState.rg - 0.5) * 0.8;
  uv += fluidVel * 0.014;
  uv = (uv - 0.5) * aspect + 0.5;

  float pattern = 0.0;
  float zoomAmount = 0.6;
  uv = zoom(uv, zoomAmount);

  vec2 mouseEffectUV = uv;
  mouseEffectUV = translate(mouseEffectUV, -mouseUV * 0.00047);
  mouseEffectUV = rotate(mouseEffectUV, 0.0);
  float circle1 = sdCircle(mouseEffectUV, 0.3);
  pattern += smoothstep(0.0, 0.1, circle1) * 0.12;

  vec2 bgUV = uv;
  bgUV = translate(bgUV, vec2(0.0004));
  vec2 animUV1 = bgUV;
  animUV1 = animUV1 * animUV1;
  animUV1 = rotate(animUV1, u_time * 0.0001);
  animUV1 = translate(animUV1, vec2(u_time * 0.00002, u_time * 0.00003));

  vec4 texColor = texture2D(u_texture, animUV1);
  vec3 bgColor = texColor.rgb * vec3(1.1);
  vec3 col = bgColor + vec3(pattern);
  gl_FragColor = vec4(col, 1.0);
}
`;

interface FluidLensProps {
  onEnter: () => void;
  visible: boolean;
}

export default function FluidLens({ onEnter, visible }: FluidLensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const enteringRef = useRef(false);

  const initScene = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const fboSize = { width: Math.floor(width * 0.5), height: Math.floor(height * 0.5) };
    const fboOpts: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    };

    let fboA = new THREE.WebGLRenderTarget(fboSize.width, fboSize.height, fboOpts);
    let fboB = new THREE.WebGLRenderTarget(fboSize.width, fboSize.height, fboOpts);

    // Load background texture
    const textureLoader = new THREE.TextureLoader();
    const bgTexture = textureLoader.load('/images/dubai-skyline-dusk.jpg');
    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.magFilter = THREE.LinearFilter;

    // Fluid simulation material
    const fluidMaterial = new THREE.ShaderMaterial({
      vertexShader: fluidVertShader,
      fragmentShader: fluidFragShader,
      uniforms: {
        uFluidTex: { value: fboA.texture },
        iMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(fboSize.width, fboSize.height) },
        uBrushSize: { value: 1.0 },
        uBrushStrength: { value: 1.0 },
        uFluidDecay: { value: 0.985 },
        uTrailLength: { value: 0.97 },
        uStopDecay: { value: 0.92 },
        uPointerActive: { value: 0.0 },
      },
    });

    const fluidQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fluidMaterial);
    const fluidScene = new THREE.Scene();
    fluidScene.add(fluidQuad);

    // Display material
    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader: displayVertShader,
      fragmentShader: displayFragShader,
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_texture: { value: bgTexture },
        u_fluid: { value: fboB.texture },
      },
    });

    const displayQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), displayMaterial);
    scene.add(displayQuad);

    const startTime = performance.now();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = performance.now() - startTime;

      fluidMaterial.uniforms.uFluidTex.value = fboA.texture;
      fluidMaterial.uniforms.iMouse.value.set(mouseRef.current.x * 0.5, mouseRef.current.y * 0.5);
      fluidMaterial.uniforms.uPointerActive.value = mouseRef.current.active ? 1.0 : 0.0;

      renderer.setRenderTarget(fboB);
      renderer.render(fluidScene, camera);
      renderer.setRenderTarget(null);

      // Swap FBOs
      const temp = fboA;
      fboA = fboB;
      fboB = temp;

      displayMaterial.uniforms.u_time.value = elapsed;
      displayMaterial.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      displayMaterial.uniforms.u_fluid.value = fboA.texture;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      displayMaterial.uniforms.u_resolution.value.set(w, h);
    };

    window.addEventListener('resize', onResize);

    cleanupRef.current = () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      fboA.dispose();
      fboB.dispose();
      fluidMaterial.dispose();
      displayMaterial.dispose();
      bgTexture.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      enteringRef.current = false;
      initScene();
    }
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [visible, initScene]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = rect.height - (e.clientY - rect.top);
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleClick = () => {
    if (enteringRef.current) return;
    enteringRef.current = true;
    onEnter();
  };

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        cursor: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      {/* Gold particles trail */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        <button
          onClick={handleClick}
          className="group relative flex items-center justify-center"
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: '2px solid #C9A962',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <span
            className="text-gold transition-all duration-400 group-hover:scale-125"
            style={{
              fontSize: 28,
              fontWeight: 300,
              fontFamily: '"Inter", sans-serif',
              lineHeight: 1,
            }}
          >
            +
          </span>
          <div
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              bottom: -32,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C9A962',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Enter
          </div>
        </button>
      </div>
      {/* Particle dots */}
      <ParticleOverlay />
    </div>
  );
}

function ParticleOverlay() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particles: { el: HTMLDivElement; x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];

    const createParticle = (x: number, y: number) => {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.width = '4px';
      el.style.height = '4px';
      el.style.borderRadius = '50%';
      el.style.background = '#C9A962';
      el.style.opacity = '0.6';
      el.style.mixBlendMode = 'screen';
      el.style.pointerEvents = 'none';
      el.style.left = '0';
      el.style.top = '0';
      container.appendChild(el);
      particles.push({
        el,
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        maxLife: 1500 + Math.random() * 1000,
      });
    };

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (now - lastTime > 30 && (Math.abs(x - lastX) > 5 || Math.abs(y - lastY) > 5)) {
        createParticle(x, y);
        lastX = x;
        lastY = y;
        lastTime = now;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = 16;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= dt / p.maxLife;

        if (p.life <= 0) {
          container.removeChild(p.el);
          particles.splice(i, 1);
        } else {
          p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
          p.el.style.opacity = String(p.life * 0.6);
          const scale = 1 + (1 - p.life) * 2;
          p.el.style.width = `${4 * scale}px`;
          p.el.style.height = `${4 * scale}px`;
        }
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      particles.forEach(p => container.removeChild(p.el));
      particles.length = 0;
    };
  }, []);

  return (
    <div
      ref={particlesRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
      }}
    />
  );
}
