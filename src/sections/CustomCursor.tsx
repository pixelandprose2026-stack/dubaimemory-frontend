import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    let isHovering = false;
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer'
      ) {
        isHovering = true;
        dot.style.background = '#C9A962';
        dot.style.transform = `translate(${posRef.current.x - 8}px, ${posRef.current.y - 8}px) scale(2)`;
      }
    };

    const onMouseOut = () => {
      isHovering = false;
      dot.style.background = '#FFFFFF';
    };

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      const scale = isHovering ? 2 : 1;
      const offset = isHovering ? 8 : 4;
      dot.style.transform = `translate(${posRef.current.x - offset}px, ${posRef.current.y - offset}px) scale(${scale})`;
    };

    animate();
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#FFFFFF',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transition: 'background 0.3s ease, width 0.3s ease, height 0.3s ease',
      }}
    />
  );
}
