import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const deals = [
  { key: 'deal1', discount: '25%', bg: 'linear-gradient(135deg, #C9A962 0%, #E8D5A3 100%)' },
  { key: 'deal2', discount: '15%', bg: 'linear-gradient(135deg, #2D5A7B 0%, #1A1A2E 100%)' },
  { key: 'deal3', discount: '10%', bg: 'linear-gradient(135deg, #1A1A2E 0%, #0F0F1A 100%)' },
];

export default function Deals() {
  const { dir, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = dir === 'rtl';

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.deal-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.1,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="deals" className="py-24 px-6" style={{ background: 'var(--light)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest mb-3" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}>
            {t('deals.eyebrow') as string}
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--dark)', lineHeight: 1.15 }}>
            {t('deals.title') as string}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {deals.map((deal) => (
            <div
              key={deal.key}
              className="deal-card relative overflow-hidden p-8 transition-all duration-400 hover:-translate-y-2"
              style={{
                background: deal.bg,
                borderRadius: 20,
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                opacity: 0,
              }}
            >
              {/* Discount Badge */}
              <div
                className="absolute top-6 font-display"
                style={{
                  [isRTL ? 'left' : 'right']: 20,
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.2)',
                  lineHeight: 1,
                }}
              >
                {deal.discount}
              </div>

              <div
                className="inline-block mb-4"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  padding: '6px 16px',
                  borderRadius: 30,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {t('deals.book') as string} → {deal.discount} OFF
              </div>

              <h3 className="font-display mb-3" style={{ fontSize: '1.3rem', color: '#fff' }}>
                {t(`deals.${deal.key}`) as string}
              </h3>
              <p className="mb-6" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                {t(`deals.${deal.key}Desc`) as string}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 no-underline transition-all duration-300"
                style={{
                  padding: '12px 28px',
                  borderRadius: 30,
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                }}
              >
                {t('deals.book') as string}
                <i className={`fas fa-arrow-${isRTL ? 'left' : 'right'}`} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
