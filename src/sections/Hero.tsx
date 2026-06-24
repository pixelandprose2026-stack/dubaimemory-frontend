import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';

export default function Hero() {
  const { dir, t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);
  const isRTL = dir === 'rtl';

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: 110 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(rgba(26,26,46,0.7), rgba(26,26,46,0.85)), url('/images/dubai-skyline-dusk.jpg') center/cover`,
        }}
      />
      {/* Gold radial glow */}
      <div
        className="absolute"
        style={{
          top: '-30%',
          right: '-10%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(201,169,98,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6"
        style={{ maxWidth: 900, opacity: 0 }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-8"
          style={{
            background: 'rgba(201,169,98,0.15)',
            border: '1px solid rgba(201,169,98,0.3)',
            padding: '8px 20px',
            borderRadius: 50,
            color: 'var(--gold-light)',
            fontSize: '0.85rem',
            fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
          }}
        >
          <i className="fas fa-star" style={{ color: 'var(--gold)' }} />
          {t('hero.badge') as string}
        </div>

        {/* Headline */}
        <h1
          className="font-display mb-5"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: '#fff',
            lineHeight: 1.15,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {t('hero.title') as string}{' '}
          <span style={{ color: 'var(--gold)' }}>
            {t('hero.titleSpan') as string}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mb-10 mx-auto"
          style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 600,
            lineHeight: 1.7,
            fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
          }}
        >
          {t('hero.subtitle') as string}
        </p>

        {/* Buttons */}
        <div className="flex gap-5 justify-center flex-wrap">
          <a
            href="#experiences"
            className="inline-flex items-center gap-2.5 no-underline transition-all duration-400 gradient-gold hover:-translate-y-1"
            style={{
              padding: '16px 40px',
              borderRadius: 50,
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--dark)',
              fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              boxShadow: '0 10px 30px rgba(201,169,98,0.3)',
            }}
          >
            <i className="fas fa-compass" />
            {t('hero.primary') as string}
          </a>
          <a
            href="#inquire"
            className="inline-flex items-center gap-2.5 no-underline transition-all duration-400 hover:bg-[rgba(255,255,255,0.1)] hover:border-white"
            style={{
              padding: '16px 40px',
              borderRadius: 50,
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.4)',
              background: 'transparent',
              fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
            }}
          >
            <i className="fas fa-handshake" />
            {t('hero.secondary') as string}
          </a>
        </div>
      </div>
    </section>
  );
}
