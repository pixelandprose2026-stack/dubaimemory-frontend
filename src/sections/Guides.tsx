import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sideArticles = [
  { key: 'article1' },
  { key: 'article2' },
  { key: 'article3' },
];

export default function Guides() {
  const { dir, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = dir === 'rtl';

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll('.guide-item');
      items.forEach((item, i) => {
        gsap.fromTo(item, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
          delay: i * 0.1,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="guides" className="py-24 px-6" style={{ background: '#fff' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest mb-3" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}>
            {t('guides.eyebrow') as string}
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--dark)', lineHeight: 1.15 }}>
            {t('guides.title') as string}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Featured */}
          <div className="guide-item lg:w-3/5 overflow-hidden group cursor-pointer" style={{ borderRadius: 16, opacity: 0 }}>
            <div className="relative overflow-hidden" style={{ height: 420 }}>
              <img
                src="/images/old-dubai-fashion.jpg"
                alt={t('guides.mainTitle') as string}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.75))' }} />
              <div className="absolute bottom-0 p-8">
                <span
                  className="inline-block mb-3"
                  style={{
                    background: 'rgba(201,169,98,0.2)',
                    color: 'var(--gold-light)',
                    padding: '4px 14px',
                    borderRadius: 20,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {t('guides.mainTag') as string}
                </span>
                <h3 className="font-display mb-3" style={{ fontSize: '1.6rem', color: '#fff' }}>
                  {t('guides.mainTitle') as string}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  {t('guides.mainDesc') as string}
                </p>
              </div>
            </div>
          </div>

          {/* Side Articles */}
          <div className="lg:w-2/5 flex flex-col gap-5">
            {sideArticles.map((article) => (
              <div
                key={article.key}
                className="guide-item flex-1 p-6 cursor-pointer transition-all duration-300"
                style={{
                  background: 'var(--light)',
                  borderRadius: 16,
                  border: '1px solid transparent',
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,169,98,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <h4 className="mb-2" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  {t(`guides.${article.key}`) as string}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.6, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  {t(`guides.${article.key}Desc`) as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
