import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const { dir, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isRTL = dir === 'rtl';

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const el = sectionRef.current!.querySelector('.news-inner');
      if (el) gsap.fromTo(el, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="newsletter" className="py-24 px-6" style={{ background: 'var(--darker)' }}>
      <div className="news-inner" style={{ maxWidth: 1000, margin: '0 auto', opacity: 0 }}>
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="md:w-1/2">
            <p className="uppercase tracking-widest mb-3" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}>
              {t('news.eyebrow') as string}
            </p>
            <h2 className="font-display mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#fff', lineHeight: 1.2 }}>
              {t('news.title') as string}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {t('news.desc') as string}
            </p>
          </div>

          {/* Form */}
          <div className="md:w-1/2 w-full">
            {submitted ? (
              <div
                className="flex items-center gap-3 p-6"
                style={{ background: 'rgba(39,174,96,0.1)', borderRadius: 16, border: '1px solid rgba(39,174,96,0.3)' }}
              >
                <i className="fas fa-check-circle" style={{ color: 'var(--success)', fontSize: '1.5rem' }} />
                <span style={{ color: '#fff', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  Thank you! Check your inbox for the guide.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('news.placeholder') as string}
                  required
                  className="flex-1"
                  style={{
                    padding: '16px 22px',
                    borderRadius: 12,
                    border: '2px solid rgba(201,169,98,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,169,98,0.2)';
                  }}
                />
                <button
                  type="submit"
                  className="gradient-gold transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                  style={{
                    padding: '16px 30px',
                    borderRadius: 12,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--dark)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                  }}
                >
                  {t('news.btn') as string}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
