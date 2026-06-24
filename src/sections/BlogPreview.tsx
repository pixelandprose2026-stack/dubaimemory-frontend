import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    key: 'blog1',
    image: '/images/old-dubai-fashion.jpg',
    tagKey: 'blog1.tag',
    dateKey: 'blog1.date',
    readKey: 'blog1.read',
  },
  {
    id: 2,
    key: 'blog2',
    image: '/images/dubai-marina.jpg',
    tagKey: 'blog2.tag',
    dateKey: 'blog2.date',
    readKey: 'blog2.read',
  },
  {
    id: 3,
    key: 'blog3',
    image: '/images/desert-photoshoot.jpg',
    tagKey: 'blog3.tag',
    dateKey: 'blog3.date',
    readKey: 'blog3.read',
  },
];

export default function BlogPreview() {
  const { dir, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.blog-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.12,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog" className="py-24 px-6" style={{ background: '#fff' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p
              className="uppercase tracking-widest mb-3"
              style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}
            >
              {t('blog.eyebrow') as string}
            </p>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--dark)', lineHeight: 1.2 }}
            >
              {t('blog.title') as string}
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-2 no-underline transition-all duration-300"
            style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.85rem' }}
          >
            {t('blog.viewAll') as string}
            <i className={`fas fa-arrow-${dir === 'rtl' ? 'left' : 'right'}`} />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog`}
              className="blog-card group block no-underline overflow-hidden transition-all duration-400 hover:-translate-y-2"
              style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                border: '1px solid #F0EDE6',
                opacity: 0,
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 220 }}>
                <img
                  src={article.image}
                  alt={t(`${article.key}.title`) as string}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    style={{
                      background: 'rgba(201,169,98,0.12)',
                      color: 'var(--gold)',
                      padding: '3px 12px',
                      borderRadius: 20,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}
                  >
                    {t(article.tagKey) as string}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#999' }}>
                    {t(article.dateKey) as string}
                  </span>
                </div>

                <h3
                  className="mb-2 transition-colors duration-300 group-hover:text-[var(--gold)]"
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--dark)',
                    lineHeight: 1.4,
                  }}
                >
                  {t(`${article.key}.title`) as string}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#777',
                    lineHeight: 1.6,
                    marginBottom: 12,
                  }}
                >
                  {t(`${article.key}.desc`) as string}
                </p>

                <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600 }}>
                  {t(article.readKey) as string}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
