import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const moods = [
  {
    key: 'luxury',
    image: '/images/vip-dining.jpg',
    large: true,
  },
  {
    key: 'hidden',
    image: '/images/old-dubai-fashion.jpg',
    large: false,
  },
  {
    key: 'desert',
    image: '/images/desert-photoshoot.jpg',
    large: false,
  },
  {
    key: 'photo',
    image: '/images/dubai-marina.jpg',
    large: false,
    wide: true,
  },
];

export default function ExploreByMood() {
  const { dir, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = dir === 'rtl';

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('.mood-card');
    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          delay: i * 0.1,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="explore" className="py-24 px-6" style={{ background: 'var(--light)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="uppercase tracking-widest mb-3"
            style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}
          >
            {t('mood.eyebrow') as string}
          </p>
          <h2
            className="font-display mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--dark)', lineHeight: 1.15 }}
          >
            {t('mood.title') as string}
          </h2>
          <p style={{ color: '#666', fontSize: '1rem', maxWidth: 540, margin: '0 auto', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
            {t('mood.subtitle') as string}
          </p>
        </div>

        {/* Mood Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: '320px 200px',
            gap: 16,
          }}
          className="mood-grid-responsive"
        >
          {moods.map((mood) => (
            <a
              key={mood.key}
              href="#experiences"
              className="mood-card relative block overflow-hidden no-underline group"
              style={{
                borderRadius: 16,
                gridColumn: mood.large ? 'span 2' : mood.wide ? 'span 2' : 'span 1',
                gridRow: mood.large ? 'span 2' : 'span 1',
                opacity: 0,
              }}
            >
              <img
                src={mood.image}
                alt={t(`mood.${mood.key}`) as string}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.7))' }}
              />
              <div
                className="absolute bottom-0 p-5"
                style={{ zIndex: 2 }}
              >
                <div
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 4,
                    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                  }}
                >
                  {t(`mood.${mood.key}`) as string}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.8)',
                    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                  }}
                >
                  {t(`mood.${mood.key}Desc`) as string}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mood-grid-responsive { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
          .mood-grid-responsive > * { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 180px; }
        }
      `}</style>
    </section>
  );
}
