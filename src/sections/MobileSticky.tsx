import { useLanguage } from '../hooks/useLanguage';

export default function MobileSticky() {
  const { t } = useLanguage();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden"
      style={{ background: 'var(--dark)', borderTop: '1px solid rgba(201,169,98,0.2)' }}
    >
      <a
        href="#photographers"
        className="flex-1 flex items-center justify-center gap-2 no-underline py-3 transition-colors duration-300"
        style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, borderRight: '1px solid rgba(255,255,255,0.1)' }}
      >
        <i className="fas fa-camera" style={{ color: 'var(--gold)' }} />
        {t('nav.photographers') as string}
      </a>
      <a
        href="#deals"
        className="flex-1 flex items-center justify-center gap-2 no-underline py-3 transition-colors duration-300"
        style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}
      >
        <i className="fas fa-tag" style={{ color: 'var(--gold)' }} />
        {t('nav.deals') as string}
      </a>
    </div>
  );
}
