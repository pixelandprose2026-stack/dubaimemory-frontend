import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const photographers = [
  {
    name: 'Ahmed Al Mansoori',
    nameAr: 'أحمد المنصوري',
    style: 'Family and lifestyle photography',
    styleAr: 'تصوير عائلي ولايف ستايل',
    desc: 'Local photographer specialized in Downtown, desert and marina sessions. Arabic and English.',
    descAr: 'مصور محلي متخصص في جلسات وسط المدينة والصحراء والمارينا. يتحدث العربية والإنجليزية.',
    image: '/images/desert-photoshoot.jpg',
    prices: { basic: 210, standard: 340, premium: 515 },
    reverse: false,
  },
  {
    name: 'Omar Al Nuaimi',
    nameAr: 'عمر النعيمي',
    style: 'Luxury and editorial photography',
    styleAr: 'تصوير فاخر وتحريري',
    desc: 'Ideal for refined portraits, personal branding and quiet hotel-style images.',
    descAr: 'مثالي للصور الراقية، العلامة الشخصية وصور الفندق الهادئة.',
    image: '/images/vip-dining.jpg',
    prices: { basic: 255, standard: 390, premium: 595 },
    reverse: true,
  },
];

export default function Photography() {
  const { lang, dir, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = dir === 'rtl';

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.photographer-card');
      cards.forEach((card) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="photographers" className="py-24 px-6" style={{ background: 'var(--light)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="uppercase tracking-widest mb-3" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}>
              {t('photo.eyebrow') as string}
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--dark)', lineHeight: 1.2 }}>
              {t('photo.title') as string}
            </h2>
          </div>
          <a href="https://wa.me/971501234567" className="no-underline flex items-center gap-2 transition-all duration-300" style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.85rem', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
            {t('photo.whatsapp') as string}
            <i className="fab fa-whatsapp" />
          </a>
        </div>

        {/* Photographer Cards */}
        <div className="space-y-10">
          {photographers.map((ph) => (
            <div
              key={ph.name}
              className="photographer-card flex flex-col lg:flex-row overflow-hidden"
              style={{
                background: '#fff',
                borderRadius: 20,
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                opacity: 0,
                flexDirection: ph.reverse && !isRTL ? 'row-reverse' as const : undefined,
              }}
            >
              {/* Visual */}
              <div className="lg:w-2/5 relative overflow-hidden" style={{ minHeight: 300 }}>
                <img src={ph.image} alt={lang === 'ar' ? ph.nameAr : ph.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              {/* Body */}
              <div className="lg:w-3/5 p-8 lg:p-10">
                <span
                  className="inline-block mb-3"
                  style={{
                    background: 'rgba(201,169,98,0.12)', color: 'var(--gold)',
                    padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
                    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                  }}
                >
                  {lang === 'ar' ? ph.styleAr : ph.style}
                </span>
                <h3 className="font-display mb-3" style={{ fontSize: '1.5rem', color: 'var(--dark)' }}>
                  {lang === 'ar' ? ph.nameAr : ph.name}
                </h3>
                <p className="mb-6" style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.7, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  {lang === 'ar' ? ph.descAr : ph.desc}
                </p>

                {/* Packages */}
                <div className="grid grid-cols-3 gap-3 mb-7">
                  {(['basic', 'standard', 'premium'] as const).map((tier) => (
                    <div
                      key={tier}
                      className="text-center p-4 transition-all duration-300"
                      style={{
                        background: 'var(--light)',
                        borderRadius: 12,
                        border: tier === 'premium' ? '1px solid var(--gold)' : '1px solid transparent',
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#999', marginBottom: 4, letterSpacing: '0.08em' }}>
                        {t(`photo.${tier}`) as string}
                      </div>
                      <div className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)' }}>
                        ${ph.prices[tier]}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#888', marginTop: 2, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                        {t(`photo.pkg${tier.charAt(0).toUpperCase() + tier.slice(1)}`) as string}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                  <a href="#" className="inline-flex items-center gap-2 no-underline transition-all duration-300" style={{ padding: '10px 22px', borderRadius: 30, border: '1px solid var(--dark)', color: 'var(--dark)', fontSize: '0.8rem', fontWeight: 600, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                    {t('photo.portfolio') as string}
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 no-underline transition-all duration-300 gradient-gold" style={{ padding: '10px 22px', borderRadius: 30, color: 'var(--dark)', fontSize: '0.8rem', fontWeight: 600, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                    {t('photo.book') as string}
                  </a>
                  <a href="https://wa.me/971501234567" className="inline-flex items-center gap-2 no-underline transition-all duration-300" style={{ padding: '10px 22px', borderRadius: 30, background: '#25D366', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>
                    <i className="fab fa-whatsapp" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
