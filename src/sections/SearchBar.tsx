import { useLanguage } from '../hooks/useLanguage';

export default function SearchBar() {
  const { dir, t } = useLanguage();
  const isRTL = dir === 'rtl';

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #E8E4DC',
    borderRadius: 12,
    fontSize: '0.9rem',
    background: 'var(--light)',
    outline: 'none',
    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
    color: 'var(--dark)',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: isRTL ? 'left 14px center' : 'right 14px center',
    paddingRight: isRTL ? 16 : 40,
    paddingLeft: isRTL ? 40 : 16,
    transition: 'border-color 0.3s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#888',
    marginBottom: 6,
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
  };

  return (
    <section className="relative z-20 px-6" style={{ marginTop: -30 }}>
      <div
        className="mx-auto"
        style={{
          maxWidth: 1000,
          background: '#fff',
          borderRadius: 20,
          padding: '28px 36px',
          boxShadow: '0 20px 60px rgba(26,26,46,0.12)',
        }}
      >
        {/* Horizontal layout - all fields in one row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 16,
            flexWrap: 'nowrap',
          }}
          className="searchbar-row"
        >
          {/* What */}
          <div style={{ flex: '1.3 1 0', minWidth: 0 }}>
            <label style={labelStyle}>{t('search.what') as string}</label>
            <select
              style={selectStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E8E4DC'; }}
            >
              <option>{t('search.photo') as string}</option>
              <option>{t('search.place') as string}</option>
              <option>{t('search.experience') as string}</option>
              <option>{t('search.itinerary') as string}</option>
            </select>
          </div>

          {/* Area */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            <label style={labelStyle}>{t('search.area') as string}</label>
            <select
              style={selectStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E8E4DC'; }}
            >
              <option>Downtown Dubai</option>
              <option>Dubai Marina</option>
              <option>Old Dubai</option>
              <option>Desert</option>
            </select>
          </div>

          {/* Budget */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            <label style={labelStyle}>{t('search.budget') as string}</label>
            <select
              style={selectStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E8E4DC'; }}
            >
              <option>{t('budget.value') as string}</option>
              <option>{t('budget.mid') as string}</option>
              <option>{t('budget.luxury') as string}</option>
            </select>
          </div>

          {/* Search Button */}
          <div style={{ flex: '0 0 auto' }}>
            <label style={{ ...labelStyle, opacity: 0 }}>Search</label>
            <button
              className="gradient-gold transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              style={{
                padding: '14px 32px',
                borderRadius: 12,
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--dark)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                whiteSpace: 'nowrap',
                height: 49,
              }}
            >
              <i className="fas fa-search" />
              {t('search.btn') as string}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .searchbar-row { flex-wrap: wrap !important; }
          .searchbar-row > div { flex: 1 1 45% !important; }
          .searchbar-row > div:last-child { flex: 1 1 100% !important; }
          .searchbar-row > div:last-child button { width: 100%; }
        }
        @media (max-width: 480px) {
          .searchbar-row > div { flex: 1 1 100% !important; }
        }
      `}</style>
    </section>
  );
}
