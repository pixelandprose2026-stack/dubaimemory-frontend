import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pills = ['pill1', 'pill2', 'pill3', 'pill4'];

export default function Itineraries() {
  const { dir, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = dir === 'rtl';

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const el = sectionRef.current!.querySelector('.iti-content');
      if (el) gsap.fromTo(el, { opacity: 0, x: isRTL ? 60 : -60 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 78%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} id="itineraries" className="py-24 px-6" style={{ background: 'var(--light)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <div className="lg:w-1/2 overflow-hidden" style={{ borderRadius: 20 }}>
            <img
              src="/images/yacht-sunset.jpg"
              alt="Dubai Itineraries"
              className="w-full object-cover"
              style={{ height: 450 }}
            />
          </div>

          {/* Content */}
          <div className="iti-content lg:w-1/2" style={{ opacity: 0 }}>
            <p className="uppercase tracking-widest mb-3" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}>
              {t('iti.eyebrow') as string}
            </p>
            <h2 className="font-display mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--dark)', lineHeight: 1.2 }}>
              {t('iti.title') as string}
            </h2>
            <p className="mb-7" style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.7, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {t('iti.desc') as string}
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-block"
                  style={{
                    padding: '10px 22px',
                    borderRadius: 30,
                    background: 'rgba(201,169,98,0.12)',
                    color: 'var(--gold)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                  }}
                >
                  {t(`iti.${pill}`) as string}
                </span>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 no-underline transition-all duration-300"
              style={{
                padding: '14px 32px',
                borderRadius: 30,
                background: 'var(--dark)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              }}
            >
              {t('iti.cta') as string}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
