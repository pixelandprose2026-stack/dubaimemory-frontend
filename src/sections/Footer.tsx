import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { dir, t } = useLanguage();
  const isRTL = dir === 'rtl';

  const exploreLinks = [
    'Featured Experiences', 'Photography Sessions', 'Desert Safari', 'Luxury Hotels', 'Cultural Tours',
  ];
  const exploreLinksAr = ['تجارب مميزة', 'جلسات تصوير', 'سفاري صحراوي', 'فنادق فاخرة', 'جولات ثقافية'];

  const companyLinks = [
    'About Us', 'Become a Partner', 'Blog', 'Careers', 'Press',
  ];
  const companyLinksAr = ['من نحن', 'كن شريكاً', 'المدونة', 'وظائف', 'الصحافة'];

  const supportLinks = [
    'Help Center', 'Cancellation Policy', 'FAQ', 'Contact Us', 'Terms & Conditions',
  ];
  const supportLinksAr = ['مركز المساعدة', 'سياسة الإلغاء', 'الأسئلة الشائعة', 'تواصل معنا', 'الشروط والأحكام'];

  return (
    <footer id="footer" style={{ background: 'var(--darker)', color: 'rgba(255,255,255,0.7)', padding: '80px 30px 30px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display mb-4" style={{ color: 'var(--gold-light)', fontSize: '1.5rem' }}>
              DubaiMemory
            </h3>
            <p className="mb-6" style={{ fontSize: '0.85rem', lineHeight: 1.8, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {t('footer.desc') as string}
            </p>
            <div className="flex gap-3">
              {['instagram', 'facebook-f', 'twitter', 'youtube', 'tiktok'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="flex items-center justify-center transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--dark)] hover:-translate-y-1"
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(255,255,255,0.05)', color: 'var(--gold)',
                    textDecoration: 'none',
                  }}
                >
                  <i className={`fab fa-${icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-6" style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>
              {t('footer.explore') as string}
            </h4>
            <ul className="list-none space-y-3">
              {(isRTL ? exploreLinksAr : exploreLinks).map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="no-underline transition-colors duration-300 hover:text-[var(--gold)]"
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6" style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>
              {t('footer.company') as string}
            </h4>
            <ul className="list-none space-y-3">
              {(isRTL ? companyLinksAr : companyLinks).map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="no-underline transition-colors duration-300 hover:text-[var(--gold)]"
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-6" style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>
              {t('footer.support') as string}
            </h4>
            <ul className="list-none space-y-3">
              {(isRTL ? supportLinksAr : supportLinks).map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="no-underline transition-colors duration-300 hover:text-[var(--gold)]"
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p style={{ fontSize: '0.8rem' }}>
            {t('footer.bottom') as string}
          </p>
          <div className="flex gap-4">
            {['cc-visa', 'cc-mastercard', 'cc-amex', 'cc-apple-pay', 'cc-paypal'].map((icon) => (
              <i key={icon} className={`fab fa-${icon}`} style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,0.3)' }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
