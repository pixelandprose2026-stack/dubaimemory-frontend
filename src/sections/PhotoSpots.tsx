import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const spots = [
  { key: 'spot1', image: '/images/dubai-skyline-dusk.jpg', rating: 4.9 },
  { key: 'spot2', image: '/images/dubai-marina.jpg', rating: 4.8 },
  { key: 'spot3', image: '/images/old-dubai-fashion.jpg', rating: 4.8 },
  { key: 'spot4', image: '/images/desert-photoshoot.jpg', rating: 4.9 },
];

export default function PhotoSpots() {
  const { dir, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = dir === 'rtl';

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.spot-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.1,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6" style={{ background: 'var(--darker)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="text-center mb-16">
          <p className="uppercase tracking-widest mb-3" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}>
            {t('spots.eyebrow') as string}
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', lineHeight: 1.15 }}>
            {t('spots.title') as string}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {spots.map((spot) => (
            <div
              key={spot.key}
              className="spot-card relative overflow-hidden group"
              style={{ borderRadius: 16, opacity: 0 }}
            >
              <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={spot.image}
                  alt={t(`spots.${spot.key}`) as string}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-400 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  style={{ background: 'rgba(26,26,46,0.6)' }}
                >
                  <span
                    className="gradient-gold cursor-pointer"
                    style={{
                      padding: '10px 24px', borderRadius: 30, fontSize: '0.8rem', fontWeight: 700,
                      color: 'var(--dark)', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                    }}
                  >
                    {t('spots.bookBtn') as string}
                  </span>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="font-display" style={{ fontSize: '1.1rem', color: '#fff', marginBottom: 4 }}>
                  {t(`spots.${spot.key}`) as string}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  {t(`spots.${spot.key}Desc`) as string}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
