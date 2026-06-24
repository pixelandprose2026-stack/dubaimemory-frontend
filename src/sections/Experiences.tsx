import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { id: 1, key: 'exp1', image: '/images/dubai-skyline-dusk.jpg', rating: 4.9, reviews: 2847 },
  { id: 2, key: 'exp2', image: '/images/skydiving-palm.jpg', rating: 4.7, reviews: 1523 },
  { id: 3, key: 'exp3', image: '/images/arabic-coffee.jpg', rating: 4.8, reviews: 987 },
  { id: 4, key: 'exp4', image: '/images/desert-photoshoot.jpg', rating: 4.9, reviews: 3201 },
  { id: 5, key: 'exp5', image: '/images/helicopter-tour.jpg', rating: 5.0, reviews: 456 },
  { id: 6, key: 'exp6', image: '/images/luxury-spa.jpg', rating: 4.9, reviews: 1102 },
];

export default function Experiences() {
  const { dir, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const isRTL = dir === 'rtl';

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.exp-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.08,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggleFav = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section ref={sectionRef} id="experiences" className="py-24 px-6" style={{ background: '#fff' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="uppercase tracking-widest mb-3" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}>
              {t('exp.eyebrow') as string}
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--dark)', lineHeight: 1.2 }}>
              {t('exp.title') as string}
            </h2>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-2 no-underline transition-all duration-300" style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.85rem' }}>
            {t('exp.viewAll') as string}
            <i className={`fas fa-arrow-${isRTL ? 'left' : 'right'}`} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {experiences.map((exp) => {
            const isFav = favorites.has(exp.id);
            return (
              <div
                key={exp.id}
                className="exp-card overflow-hidden transition-all duration-400 hover:-translate-y-2"
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                  border: '1px solid #F0EDE6',
                  opacity: 0,
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: 260 }}>
                  <img
                    src={exp.image}
                    alt={t(`exp.${exp.key}.title`) as string}
                    className="w-full h-full object-cover transition-transform duration-600"
                    style={{}}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  <span
                    className="absolute top-5 gradient-gold"
                    style={{
                      [isRTL ? 'left' : 'right']: 20,
                      padding: '6px 16px', borderRadius: 30, fontSize: '0.75rem', fontWeight: 700,
                      color: 'var(--dark)',
                    }}
                  >
                    {t(`exp.${exp.key}.badge`) as string}
                  </span>
                  <button
                    onClick={() => toggleFav(exp.id)}
                    className="absolute top-5 flex items-center justify-center transition-all duration-300"
                    style={{
                      [isRTL ? 'right' : 'left']: 20,
                      width: 40, height: 40, borderRadius: '50%',
                      background: isFav ? '#fff' : 'rgba(255,255,255,0.9)',
                      border: 'none', cursor: 'pointer',
                    }}
                  >
                    <i className={`fas fa-heart ${isFav ? 'text-red-500' : 'text-gray-300'}`} style={{ color: isFav ? '#E74C3C' : '#ccc' }} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ color: '#F39C12', fontSize: '0.8rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star${i >= Math.floor(exp.rating) ? (exp.rating % 1 >= 0.5 && i === Math.floor(exp.rating) ? '-half-alt' : '') : ''}`}
                          style={{ opacity: i < Math.ceil(exp.rating) ? 1 : 0.3 }}
                        />
                      ))}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>
                      {exp.rating} ({exp.reviews.toLocaleString()})
                    </span>
                  </div>

                  <h3 className="mb-2" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                    {t(`exp.${exp.key}.title`) as string}
                  </h3>
                  <p className="mb-5" style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.6, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                    {t(`exp.${exp.key}.desc`) as string}
                  </p>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #F0EDE6' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#999' }}>{t('exp.from') as string}</span>
                      <div>
                        <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark)' }}>
                          ${t(`exp.${exp.key}.price`) as string}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 600 }}> USD</span>
                      </div>
                    </div>
                    <button
                      className="transition-all duration-300"
                      style={{
                        padding: '10px 25px', borderRadius: 30, background: 'var(--dark)', color: '#fff',
                        border: 'none', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                        fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--dark)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--dark)'; e.currentTarget.style.color = '#fff'; }}
                    >
                      {t('exp.bookNow') as string}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
