import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

export default function Navigation() {
  const { lang, dir, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setAnnouncementVisible(window.scrollY < 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { key: 'nav.places', href: '#explore' },
    { key: 'nav.experiences', href: '#experiences' },
    { key: 'nav.photographers', href: '#photographers' },
    { key: 'nav.itineraries', href: '#itineraries' },
    { key: 'nav.deals', href: '#deals' },
    { key: 'nav.guides', href: '#guides' },
  ];

  const isRTL = dir === 'rtl';

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(26,26,46,0.98)' : 'rgba(26,26,46,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,169,98,0.2)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {/* Announcement Bar */}
      <div
        className="transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: announcementVisible ? 40 : 0,
          opacity: announcementVisible ? 1 : 0,
          background: 'rgba(201,169,98,0.1)',
          borderBottom: '1px solid rgba(201,169,98,0.15)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 lg:px-12"
          style={{ height: 40 }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--gold-light)',
              fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
            }}
          >
            {t('top.note') as string}
          </p>
          <button
            onClick={toggleLang}
            className="transition-all duration-300 hover:bg-[rgba(201,169,98,0.15)]"
            style={{
              color: 'var(--gold)',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '3px 12px',
              border: '1px solid rgba(201,169,98,0.3)',
              borderRadius: 20,
              cursor: 'pointer',
              background: 'transparent',
            }}
          >
            {t('nav.lang') as string}
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <div
        className="flex items-center justify-between px-6 lg:px-12"
        style={{ height: 70 }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 no-underline">
          <div
            className="flex items-center justify-center gradient-gold"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              fontSize: 20,
              color: 'var(--dark)',
              fontWeight: 700,
            }}
          >
            DM
          </div>
          <div className="hidden sm:block">
            <div
              className="font-display"
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--gold-light)',
                letterSpacing: 1,
                lineHeight: 1.2,
              }}
            >
              DubaiMemory
            </div>
            <div
              style={{
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: 2,
              }}
            >
              {lang === 'ar' ? 'الدليل السياحي الصادق' : 'The Honest Dubai Guide'}
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center" style={{ gap: 30 }}>
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="relative no-underline transition-all duration-300 group"
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.85rem',
                fontWeight: 500,
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              }}
            >
              {t(link.key) as string}
              <span
                className="absolute bottom-0 h-0.5 bg-[#C9A962] transition-all duration-300 group-hover:w-full"
                style={{
                  [isRTL ? 'right' : 'left']: 0,
                  width: 0,
                  bottom: -5,
                }}
              />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isDashboard ? (
            <Link
              to="/"
              className="hidden md:inline-flex items-center no-underline transition-all duration-300"
              style={{
                padding: '10px 22px',
                borderRadius: 30,
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              }}
            >
              <i className="fas fa-home" style={{ marginRight: 6 }} />
              {t('nav.home') as string}
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:inline-flex items-center no-underline transition-all duration-300"
                style={{
                  padding: '10px 22px',
                  borderRadius: 30,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                }}
              >
                <i className="fas fa-user" style={{ marginRight: 6 }} />
                {t('nav.login') as string}
              </Link>
              <a
                href="#photographers"
                className="hidden md:inline-flex items-center no-underline transition-all duration-300 gradient-gold hover:shadow-lg"
                style={{
                  padding: '10px 22px',
                  borderRadius: 30,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--dark)',
                  fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                }}
              >
                {t('nav.cta') as string}
              </a>
            </>
          )}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              color: '#fff',
              fontSize: '1.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-0 h-full overflow-y-auto"
            style={{
              [isRTL ? 'left' : 'right']: 0,
              width: '80%',
              maxWidth: 400,
              background: 'var(--dark)',
              padding: '100px 40px 40px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6"
              style={{
                [isRTL ? 'right' : 'left']: 25,
                color: '#fff',
                fontSize: '1.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <i className="fas fa-times" />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block no-underline transition-colors duration-300"
                style={{
                  color: '#fff',
                  fontSize: '1.1rem',
                  padding: '15px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#fff';
                }}
              >
                {t(link.key) as string}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block no-underline transition-colors duration-300"
              style={{
                color: 'var(--gold)',
                fontSize: '1.1rem',
                padding: '15px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                fontWeight: 600,
              }}
            >
              <i className="fas fa-user" style={{ marginRight: 8 }} />
              {t('nav.login') as string}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
