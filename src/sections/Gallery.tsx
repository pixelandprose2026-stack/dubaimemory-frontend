import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { image: '/images/burj-al-arab.jpg', title: 'Burj Al Arab at Sunset', titleAr: 'برج العرب عند الغروب', category: 'Photography', catAr: 'تصوير' },
  { image: '/images/skydiving-palm.jpg', title: 'Ocean Depths', titleAr: 'عمق المحيطات', category: 'Family Experience', catAr: 'تجربة عائلية' },
  { image: '/images/desert-photoshoot.jpg', title: 'Desert Adventure', titleAr: 'مغامرة الصحراء', category: 'VIP Safari', catAr: 'سفاري VIP' },
  { image: '/images/arabic-coffee.jpg', title: 'Gold Souk', titleAr: 'السوق الذهبي', category: 'Heritage & Culture', catAr: 'تراث وثقافة' },
  { image: '/images/old-dubai-fashion.jpg', title: 'Professional Photoshoot', titleAr: 'جلسة تصوير احترافية', category: 'Memories', catAr: 'ذكريات' },
];

export default function Gallery() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll('.gallery-item');
      items.forEach((item, i) => {
        gsap.fromTo(item, { opacity: 0, scale: 0.95 }, {
          opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
          delay: i * 0.08,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="py-24 px-6" style={{ background: 'var(--darker)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest mb-3" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}>
            {t('gallery.eyebrow') as string}
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', lineHeight: 1.15 }}>
            {t('gallery.title') as string}
          </h2>
        </div>

        <div
          className="gallery-grid-css"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 300px)',
            gap: 20,
          }}
        >
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="gallery-item relative overflow-hidden cursor-pointer group"
              style={{
                borderRadius: 16,
                gridColumn: i === 0 ? 'span 2' : i === 3 ? 'span 2' : 'span 1',
                gridRow: i === 0 ? 'span 2' : 'span 1',
                opacity: 0,
              }}
            >
              <img
                src={item.image}
                alt={lang === 'ar' ? item.titleAr : item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-7 transition-all duration-400 opacity-0 group-hover:opacity-100"
                style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}
              >
                <h4 className="font-display" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: 4 }}>
                  {lang === 'ar' ? item.titleAr : item.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>
                  {lang === 'ar' ? item.catAr : item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .gallery-grid-css { grid-template-columns: repeat(2, 1fr) !important; grid-template-rows: repeat(3, 250px) !important; }
          .gallery-grid-css > * { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
        @media (max-width: 640px) {
          .gallery-grid-css { grid-template-columns: 1fr !important; grid-template-rows: repeat(5, 250px) !important; }
        }
      `}</style>
    </section>
  );
}
