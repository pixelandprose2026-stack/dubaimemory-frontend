import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experienceTypes = ['Photography', 'Tour', 'Yacht', 'Dining', 'Adventure', 'Wellness'];

export default function Inquiry() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left side entrance
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Form fields staggered reveal
      const fields = section.querySelectorAll('.field-inner');
      fields.forEach((field, index) => {
        gsap.fromTo(
          field,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
            delay: 0.3 + index * 0.08,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(26, 26, 46, 0.15)',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.85rem',
    color: '#1A1A2E',
    transition: 'border-color 0.3s ease',
  };

  const labelStyle = {
    display: 'block',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: '#666',
    marginBottom: 8,
  };

  return (
    <section
      ref={sectionRef}
      id="inquire"
      className="relative w-full"
      style={{ minHeight: '80vh' }}
    >
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        {/* Left Side - Dark */}
        <div
          ref={leftRef}
          className="relative flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20 lg:py-0"
          style={{
            width: '100%',
            minHeight: '40vh',
            background: '#1A1A2E',
            opacity: 0,
          }}
        >
          <span
            className="block mb-6"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C9A962',
            }}
          >
            Get in Touch
          </span>

          <h2
            className="font-display mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 600,
              color: '#F8F6F0',
              lineHeight: 1.1,
            }}
          >
            Begin Your
            <br />
            <em
              className="font-serif"
              style={{ color: '#C9A962', fontStyle: 'italic' }}
            >
              Journey
            </em>
          </h2>

          <p
            className="max-w-md mb-10"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              lineHeight: 1.7,
              color: 'rgba(248, 246, 240, 0.7)',
            }}
          >
            Every unforgettable Dubai memory starts with a conversation. Our concierge
            team crafts bespoke experiences tailored to your desires — from private
            photoshoots on golden dunes to yacht cruises at sunset.
          </p>

          <div className="flex items-center gap-6">
            {[
              { label: 'Response Time', value: '< 2 hours' },
              { label: 'Bespoke Plans', value: '100% Custom' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(248, 246, 240, 0.5)',
                    marginBottom: 4,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#C9A962',
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - White Form */}
        <div
          className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20"
          style={{
            width: '100%',
            minHeight: '40vh',
            background: '#FFFFFF',
          }}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <CheckCircle size={48} color="#C9A962" className="mb-6" />
              <h3
                className="font-display mb-4"
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: '#1A1A2E',
                }}
              >
                Inquiry Received
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  color: '#666',
                  maxWidth: 360,
                  lineHeight: 1.6,
                }}
              >
                Our concierge team will reach out within 2 hours to begin crafting
                your bespoke Dubai experience.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label style={labelStyle}>Full Name</label>
                <div className="field-inner" style={{ opacity: 0 }}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderBottomColor = '#C9A962';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottomColor = 'rgba(26, 26, 46, 0.15)';
                    }}
                  />
                </div>
              </div>

              <div className="mb-8">
                <label style={labelStyle}>Email Address</label>
                <div className="field-inner" style={{ opacity: 0 }}>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderBottomColor = '#C9A962';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottomColor = 'rgba(26, 26, 46, 0.15)';
                    }}
                  />
                </div>
              </div>

              <div className="mb-8">
                <label style={labelStyle}>Experience Type</label>
                <div className="field-inner" style={{ opacity: 0 }}>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0 center',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderBottomColor = '#C9A962';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottomColor = 'rgba(26, 26, 46, 0.15)';
                    }}
                  >
                    <option value="">Select experience type</option>
                    {experienceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-10">
                <label style={labelStyle}>Your Message</label>
                <div className="field-inner" style={{ opacity: 0 }}>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your dream Dubai experience..."
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderBottomColor = '#C9A962';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottomColor = 'rgba(26, 26, 46, 0.15)';
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-3 py-4 transition-all duration-400 hover:bg-gold"
                style={{
                  background: '#1A1A2E',
                  color: '#F8F6F0',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                <span>Submit Inquiry</span>
                <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
