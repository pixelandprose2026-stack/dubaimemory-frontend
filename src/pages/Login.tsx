import { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

export default function Login() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<'traveler' | 'photographer' | 'partner'>('traveler');

  const isRTL = false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light)', paddingTop: 120 }}>
      <div className="mx-auto" style={{ maxWidth: 480, padding: '0 24px' }}>
        {/* Tabs */}
        <div className="flex mb-10" style={{ borderBottom: '1px solid #E8E4DC' }}>
          <button
            onClick={() => setMode('login')}
            className="flex-1 pb-4 text-center transition-all duration-300"
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              borderBottom: mode === 'login' ? '2px solid var(--gold)' : '2px solid transparent',
              color: mode === 'login' ? 'var(--dark)' : '#999',
              background: 'none',
              border: 'none',
              borderBottomWidth: 2,
              borderBottomColor: mode === 'login' ? 'var(--gold)' : 'transparent',
              borderBottomStyle: 'solid',
              cursor: 'pointer',
              fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
            }}
          >
            {t('auth.login') as string}
          </button>
          <button
            onClick={() => setMode('register')}
            className="flex-1 pb-4 text-center transition-all duration-300"
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              borderBottom: mode === 'register' ? '2px solid var(--gold)' : '2px solid transparent',
              color: mode === 'register' ? 'var(--dark)' : '#999',
              background: 'none',
              border: 'none',
              borderBottomWidth: 2,
              borderBottomColor: mode === 'register' ? 'var(--gold)' : 'transparent',
              borderBottomStyle: 'solid',
              cursor: 'pointer',
              fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
            }}
          >
            {t('auth.register') as string}
          </button>
        </div>

        {/* Title */}
        <h1 className="font-display mb-2" style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>
          {mode === 'login' ? (t('auth.loginTitle') as string) : (t('auth.registerTitle') as string)}
        </h1>
        <p className="mb-8" style={{ fontSize: '0.9rem', color: '#777', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
          {mode === 'login' ? (t('auth.loginSubtitle') as string) : (t('auth.registerSubtitle') as string)}
        </p>

        {/* Social Login */}
        <div className="flex gap-3 mb-8">
          {[
            { icon: 'fab fa-google', label: 'Google', color: '#DB4437' },
            { icon: 'fab fa-apple', label: 'Apple', color: '#000' },
            { icon: 'fab fa-facebook-f', label: 'Facebook', color: '#4267B2' },
          ].map((provider) => (
            <button
              key={provider.label}
              className="flex-1 flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                padding: '12px',
                borderRadius: 12,
                border: '1px solid #E8E4DC',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--dark)',
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              }}
            >
              <i className={provider.icon} style={{ color: provider.color, fontSize: '1rem' }} />
              <span className="hidden sm:inline">{provider.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1" style={{ height: 1, background: '#E8E4DC' }} />
          <span style={{ fontSize: '0.75rem', color: '#999' }}>{t('auth.or') as string}</span>
          <div className="flex-1" style={{ height: 1, background: '#E8E4DC' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              {/* Account Type */}
              <div className="mb-6">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--dark)', marginBottom: 8, display: 'block' }}>
                  {t('auth.accountType') as string}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['traveler', 'photographer', 'partner'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAccountType(type)}
                      className="py-3 text-center transition-all duration-300"
                      style={{
                        borderRadius: 12,
                        border: accountType === type ? '2px solid var(--gold)' : '2px solid #E8E4DC',
                        background: accountType === type ? 'rgba(201,169,98,0.08)' : '#fff',
                        color: accountType === type ? 'var(--dark)' : '#999',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                      }}
                    >
                      <i className={`fas ${type === 'traveler' ? 'fa-suitcase' : type === 'photographer' ? 'fa-camera' : 'fa-handshake'}`} style={{ marginRight: 6, color: 'var(--gold)' }} />
                      {t(`auth.${type}`) as string}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="mb-5">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--dark)', marginBottom: 8, display: 'block' }}>
                  {t('auth.name') as string}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('auth.namePlaceholder') as string}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    border: '2px solid #E8E4DC',
                    borderRadius: 12,
                    fontSize: '0.9rem',
                    background: '#fff',
                    outline: 'none',
                    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                    transition: 'all 0.3s ease',
                    color: 'var(--dark)',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E8E4DC'; }}
                />
              </div>
            </>
          )}

          {/* Email */}
          <div className="mb-5">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--dark)', marginBottom: 8, display: 'block' }}>
              {t('auth.email') as string}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailPlaceholder') as string}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '2px solid #E8E4DC',
                borderRadius: 12,
                fontSize: '0.9rem',
                background: '#fff',
                outline: 'none',
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                transition: 'all 0.3s ease',
                color: 'var(--dark)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E8E4DC'; }}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--dark)', marginBottom: 8, display: 'block' }}>
              {t('auth.password') as string}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.passwordPlaceholder') as string}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '2px solid #E8E4DC',
                borderRadius: 12,
                fontSize: '0.9rem',
                background: '#fff',
                outline: 'none',
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                transition: 'all 0.3s ease',
                color: 'var(--dark)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E8E4DC'; }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full gradient-gold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              padding: '16px',
              borderRadius: 12,
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--dark)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
            }}
          >
            {mode === 'login' ? (t('auth.loginBtn') as string) : (t('auth.registerBtn') as string)}
          </button>
        </form>

        {/* Magic Link */}
        {mode === 'login' && (
          <div className="mt-6 text-center">
            <button
              className="transition-colors duration-300"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--gold)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              }}
            >
              <i className="fas fa-link" style={{ marginRight: 6 }} />
              {t('auth.magicLink') as string}
            </button>
          </div>
        )}

        {/* Quick access links for demo */}
        <div className="mt-8 p-4" style={{ background: 'rgba(201,169,98,0.08)', borderRadius: 12, border: '1px solid rgba(201,169,98,0.15)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Demo Access
          </p>
          <div className="flex gap-3">
            <Link
              to="/dashboard"
              className="flex-1 text-center no-underline transition-all duration-300"
              style={{
                padding: '10px',
                borderRadius: 8,
                background: '#fff',
                color: 'var(--dark)',
                fontSize: '0.75rem',
                fontWeight: 600,
                border: '1px solid #E8E4DC',
              }}
            >
              <i className="fas fa-suitcase" style={{ color: 'var(--gold)', marginRight: 4 }} />
              Traveler
            </Link>
            <Link
              to="/photographer-dashboard"
              className="flex-1 text-center no-underline transition-all duration-300"
              style={{
                padding: '10px',
                borderRadius: 8,
                background: '#fff',
                color: 'var(--dark)',
                fontSize: '0.75rem',
                fontWeight: 600,
                border: '1px solid #E8E4DC',
              }}
            >
              <i className="fas fa-camera" style={{ color: 'var(--gold)', marginRight: 4 }} />
              Photographer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
