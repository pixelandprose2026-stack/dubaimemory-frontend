import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allArticles = [
  {
    id: 1,
    key: 'blog1',
    image: '/images/old-dubai-fashion.jpg',
    featured: true,
  },
  {
    id: 2,
    key: 'blog2',
    image: '/images/dubai-marina.jpg',
    featured: false,
  },
  {
    id: 3,
    key: 'blog3',
    image: '/images/desert-photoshoot.jpg',
    featured: false,
  },
  {
    id: 4,
    key: 'blog4',
    image: '/images/dubai-skyline-dusk.jpg',
    featured: false,
  },
  {
    id: 5,
    key: 'blog5',
    image: '/images/art-gallery.jpg',
    featured: false,
  },
  {
    id: 6,
    key: 'blog6',
    image: '/images/burj-al-arab.jpg',
    featured: false,
  },
];

export default function Blog() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.blog-page-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 90%' },
          delay: i * 0.08,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = allArticles.find((a) => a.featured);
  const rest = allArticles.filter((a) => !a.featured);

  return (
    <div style={{ background: 'var(--light)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--dark)', padding: '140px 24px 80px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 no-underline transition-colors duration-300"
            style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 500 }}
          >
            <i className="fas fa-arrow-left" />
            {t('blog.backHome') as string}
          </Link>
          <h1
            className="font-display mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#fff', lineHeight: 1.15 }}
          >
            {t('blog.pageTitle') as string}
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 600, lineHeight: 1.6 }}>
            {t('blog.pageDesc') as string}
          </p>
        </div>
      </div>

      {/* Content */}
      <div ref={sectionRef} style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 24px 100px' }}>
        {/* Featured Article */}
        {featured && (
          <Link
            to="/"
            className="blog-page-card group block no-underline overflow-hidden mb-12 transition-all duration-400 hover:-translate-y-1"
            style={{
              background: '#fff',
              borderRadius: 20,
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              opacity: 0,
            }}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 overflow-hidden" style={{ maxHeight: 400 }}>
                <img
                  src={featured.image}
                  alt={t(`${featured.key}.title`) as string}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  style={{ minHeight: 300 }}
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="uppercase tracking-wider"
                    style={{
                      background: 'var(--gold)',
                      color: 'var(--dark)',
                      padding: '4px 14px',
                      borderRadius: 20,
                      fontSize: '0.65rem',
                      fontWeight: 700,
                    }}
                  >
                    {t('blog.featured') as string}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#999' }}>
                    {t(`${featured.key}.date`) as string}
                  </span>
                </div>
                <h2
                  className="font-display mb-4 transition-colors duration-300 group-hover:text-[var(--gold)]"
                  style={{ fontSize: '1.8rem', color: 'var(--dark)', lineHeight: 1.25 }}
                >
                  {t(`${featured.key}.title`) as string}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.7, marginBottom: 16 }}>
                  {t(`${featured.key}.desc`) as string}
                </p>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600 }}>
                  {t(`${featured.key}.read`) as string}
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {rest.map((article) => (
            <Link
              key={article.id}
              to="/"
              className="blog-page-card group block no-underline overflow-hidden transition-all duration-400 hover:-translate-y-2"
              style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                border: '1px solid #F0EDE6',
                opacity: 0,
              }}
            >
              <div className="relative overflow-hidden" style={{ height: 220 }}>
                <img
                  src={article.image}
                  alt={t(`${article.key}.title`) as string}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                />
              </div>
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
                    {t(`${article.key}.tag`) as string}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#999' }}>
                    {t(`${article.key}.date`) as string}
                  </span>
                </div>
                <h3
                  className="mb-2 transition-colors duration-300 group-hover:text-[var(--gold)]"
                  style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)', lineHeight: 1.4 }}
                >
                  {t(`${article.key}.title`) as string}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.6, marginBottom: 12 }}>
                  {t(`${article.key}.desc`) as string}
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600 }}>
                  {t(`${article.key}.read`) as string}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
