import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll<HTMLElement>('.reveal-word');
    const video = videoRef.current;

    const ctx = gsap.context(() => {
      words.forEach((word) => {
        gsap.to(word, {
          '--reveal-progress': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: word,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.3,
          },
        });
      });

      if (video) {
        gsap.to(video, {
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const statementText =
    'From golden dunes to glittering skylines, we curate premium experiences and capture your memories with an unmatched artistic eye.';

  const words = statementText.split(' ');

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="relative w-full overflow-hidden"
      style={{
        background: '#1A1A2E',
        padding: '12vh 5vw',
        display: 'grid',
      }}
    >
      {/* Video background layer */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          gridArea: '1 / 1',
          opacity: 0.2,
          transform: 'scale(1.2)',
          zIndex: 0,
        }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/images/dubai-skyline-dusk.jpg" type="image/jpg" />
      </video>
      {/* Fallback to image since video source isn't actually a video */}
      <img
        src="/images/dubai-skyline-dusk.jpg"
        alt="Dubai skyline"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          gridArea: '1 / 1',
          opacity: 0.15,
          transform: 'scale(1.2)',
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(26, 26, 46, 0.7)', zIndex: 1 }}
      />

      {/* Text layer */}
      <div
        className="relative flex flex-wrap gap-x-3 gap-y-2"
        style={{
          gridArea: '1 / 1',
          zIndex: 2,
          maxWidth: 1100,
          margin: '0 auto',
          alignContent: 'center',
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="reveal-word relative inline-block font-display"
            style={{
              fontSize: 'clamp(2rem, 4vw, 4.5rem)',
              lineHeight: 1.15,
              color: 'rgba(255, 255, 255, 0.15)',
              whiteSpace: 'nowrap',
              // @ts-expect-error CSS custom property
              '--reveal-progress': 0,
            }}
          >
            {word}
            {/* Highlight overlay */}
            <span
              className="reveal-word-highlight absolute top-0 left-0 overflow-hidden pointer-events-none"
              style={{
                width: '100%',
                height: '100%',
                color: '#FFFFFF',
                clipPath: 'inset(0 calc(100% - (var(--reveal-progress, 0) * 100%)) 0 0)',
              }}
            >
              <span
                className="block"
                style={{
                  width: 'max-content',
                  minWidth: '100%',
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                  fontFamily: 'inherit',
                  fontWeight: 'inherit',
                }}
              >
                {word}
              </span>
            </span>
          </span>
        ))}
      </div>

      {/* Decorative gold line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: 1,
          height: '8vh',
          background: 'linear-gradient(to bottom, transparent, #C9A962)',
          zIndex: 3,
        }}
      />
    </section>
  );
}
