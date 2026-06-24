import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    key: 'testimonial1',
    avatar: '/images/arabic-coffee.jpg',
    stars: 5,
  },
  {
    key: 'testimonial2',
    avatar: '/images/desert-photoshoot.jpg',
    stars: 5,
  },
  {
    key: 'testimonial3',
    avatar: '/images/art-gallery.jpg',
    stars: 5,
  },
];

export default function Testimonials() {
  const { dir, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.testimonial-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.12,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 px-6" style={{ background: 'var(--light)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest mb-3" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.2em' }}>
            {t('testimonials.eyebrow') as string}
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--dark)', lineHeight: 1.15 }}>
            {t('testimonials.title') as string}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.key}
              className="testimonial-card relative"
              style={{
                background: '#fff',
                padding: 40,
                borderRadius: 20,
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                opacity: 0,
              }}
            >
              {/* Gold Quote */}
              <div
                className="absolute font-display select-none"
                style={{
                  top: 20,
                  [dir === 'rtl' ? 'left' : 'right']: 30,
                  fontSize: '5rem',
                  color: 'var(--gold)',
                  opacity: 0.25,
                  lineHeight: 1,
                }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="mb-5" style={{ color: '#F39C12', fontSize: '0.9rem' }}>
                {[...Array(testimonial.stars)].map((_, i) => (
                  <i key={i} className="fas fa-star" />
                ))}
              </div>

              {/* Text */}
              <p className="mb-6" style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.8 }}>
                {t(`${testimonial.key}.text`) as string}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="overflow-hidden flex-shrink-0"
                  style={{ width: 50, height: 50, borderRadius: '50%' }}
                >
                  <img
                    src={testimonial.avatar}
                    alt={t(`${testimonial.key}.name`) as string}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)' }}>
                    {t(`${testimonial.key}.name`) as string}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>
                    {t(`${testimonial.key}.country`) as string}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 mt-1"
                    style={{
                      background: 'rgba(39,174,96,0.1)',
                      color: 'var(--success)',
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}
                  >
                    <i className="fas fa-check-circle" />
                    {t('testimonials.verified') as string}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
