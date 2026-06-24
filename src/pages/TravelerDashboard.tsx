import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const savedItems = [
  { id: 1, title: 'Burj Khalifa — At the Top', type: 'experience', image: '/images/dubai-skyline-dusk.jpg', folder: 'My October Trip', date: 'Saved Jun 12', price: '$149' },
  { id: 2, title: 'Desert Photoshoot', type: 'photography', image: '/images/desert-photoshoot.jpg', folder: 'My October Trip', date: 'Saved Jun 10', price: '$350' },
  { id: 3, title: 'VIP Desert Safari', type: 'experience', image: '/images/desert-photoshoot.jpg', folder: 'Restaurants to Try', date: 'Saved Jun 8', price: '$450' },
];

const bookings = [
  { id: 1, photographer: 'Ahmed Al Mansoori', date: 'July 15, 2025', time: '5:00 PM', location: 'Desert Dunes', status: 'confirmed', package: 'Standard — 90 min / 45 photos', price: '$340', rating: 0 },
  { id: 2, photographer: 'Omar Al Nuaimi', date: 'August 3, 2025', time: '6:30 PM', location: 'Dubai Marina', status: 'pending', package: 'Premium — 3 hours / 90 photos', price: '$595', rating: 0 },
];

const digitalProducts = [
  { id: 1, title: 'Dubai Short Guide', type: 'PDF', size: '4.2 MB', date: 'Purchased Jun 1' },
  { id: 2, title: 'Photography Spots Map', type: 'PDF', size: '2.8 MB', date: 'Purchased May 28' },
];

const folders = ['All', 'My October Trip', 'Restaurants to Try', 'Wedding Plans'];

export default function TravelerDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'saved' | 'bookings' | 'downloads' | 'settings'>('saved');
  const [activeFolder, setActiveFolder] = useState('All');
  const [bookingRatings, setBookingRatings] = useState<Record<number, number>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const tabs = [
    { key: 'saved' as const, label: t('dash.saved') as string, icon: 'fa-heart' },
    { key: 'bookings' as const, label: t('dash.bookings') as string, icon: 'fa-calendar-check' },
    { key: 'downloads' as const, label: t('dash.downloads') as string, icon: 'fa-download' },
    { key: 'settings' as const, label: t('dash.settings') as string, icon: 'fa-cog' },
  ];

  const filteredItems = activeFolder === 'All' ? savedItems : savedItems.filter((item) => item.folder === activeFolder);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light)', paddingTop: 100 }}>
      <div className="mx-auto" style={{ maxWidth: 1200, padding: '0 24px' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display" style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>
              {t('dash.welcome') as string}, Sarah
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#777' }}>{t('dash.manage') as string}</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-4 py-2" style={{ background: '#fff', borderRadius: 10, border: '1px solid #E8E4DC' }}>
              <i className="fas fa-coins" style={{ color: 'var(--gold)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>USD</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2" style={{ background: '#fff', borderRadius: 10, border: '1px solid #E8E4DC' }}>
              <i className="fas fa-envelope" style={{ color: 'var(--gold)' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 500, color: '#27AE60' }}>2 {t('dash.new') as string}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex items-center gap-2 px-5 py-3 transition-all duration-300 whitespace-nowrap"
              style={{
                borderRadius: 12,
                background: activeTab === tab.key ? 'var(--dark)' : '#fff',
                color: activeTab === tab.key ? '#fff' : '#666',
                border: activeTab === tab.key ? 'none' : '1px solid #E8E4DC',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <i className={`fas ${tab.icon}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'saved' && (
          <div>
            {/* Folders */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {folders.map((folder) => (
                <button
                  key={folder}
                  onClick={() => setActiveFolder(folder)}
                  className="px-4 py-2 transition-all duration-300"
                  style={{
                    borderRadius: 20,
                    background: activeFolder === folder ? 'var(--gold)' : '#fff',
                    color: activeFolder === folder ? 'var(--dark)' : '#666',
                    border: activeFolder === folder ? 'none' : '1px solid #E8E4DC',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {folder}
                </button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}
                >
                  <div className="relative overflow-hidden" style={{ height: 180 }}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <button
                      className="absolute top-3 flex items-center justify-center transition-all duration-300"
                      style={{ right: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer' }}
                    >
                      <i className="fas fa-heart" style={{ color: '#E74C3C' }} />
                    </button>
                    <span className="absolute bottom-3 left-3 px-3 py-1" style={{ background: 'rgba(26,26,46,0.8)', color: '#fff', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600 }}>
                      {item.type === 'experience' ? 'Experience' : 'Photography'}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>{item.title}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: 8 }}>{item.folder} · {item.date}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold)' }}>{item.price}</span>
                      <button style={{ padding: '6px 14px', borderRadius: 20, background: 'var(--dark)', color: '#fff', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6 transition-all duration-300"
                style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="px-3 py-1"
                        style={{
                          borderRadius: 20,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          background: booking.status === 'confirmed' ? 'rgba(39,174,96,0.1)' : 'rgba(243,156,18,0.1)',
                          color: booking.status === 'confirmed' ? '#27AE60' : '#F39C12',
                        }}
                      >
                        {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#999' }}>#{String(booking.id).padStart(4, '0')}</span>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>{booking.photographer}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#666' }}>{booking.package}</p>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <span style={{ fontSize: '0.8rem', color: '#888' }}><i className="far fa-calendar" style={{ marginRight: 4 }} />{booking.date}</span>
                      <span style={{ fontSize: '0.8rem', color: '#888' }}><i className="far fa-clock" style={{ marginRight: 4 }} />{booking.time}</span>
                      <span style={{ fontSize: '0.8rem', color: '#888' }}><i className="fas fa-map-marker-alt" style={{ marginRight: 4 }} />{booking.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--dark)' }}>{booking.price}</span>
                    {booking.status === 'confirmed' && (
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setBookingRatings((prev) => ({ ...prev, [booking.id]: star }))}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: (bookingRatings[booking.id] || 0) >= star ? '#F39C12' : '#ddd' }}
                          >
                            <i className="fas fa-star" />
                          </button>
                        ))}
                      </div>
                    )}
                    <button style={{ padding: '8px 20px', borderRadius: 20, background: booking.status === 'confirmed' ? 'var(--success)' : '#F39C12', color: '#fff', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                      {booking.status === 'confirmed' ? 'Leave Review' : 'Pending Confirmation'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {digitalProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-5 p-6 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}
              >
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: 60, height: 60, borderRadius: 12, background: 'rgba(201,169,98,0.1)' }}>
                  <i className="fas fa-file-pdf" style={{ fontSize: '1.5rem', color: 'var(--gold)' }} />
                </div>
                <div className="flex-1">
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 2 }}>{product.title}</h3>
                  <p style={{ fontSize: '0.75rem', color: '#999' }}>{product.type} · {product.size} · {product.date}</p>
                </div>
                <button className="flex items-center gap-2 transition-all duration-300" style={{ padding: '10px 20px', borderRadius: 10, background: 'var(--dark)', color: '#fff', border: 'none', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                  <i className="fas fa-download" />
                  Download
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ maxWidth: 600 }}>
            <div className="p-6 mb-5" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 20 }}>{t('dash.personal') as string}</h3>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666', marginBottom: 6, display: 'block' }}>Full Name</label>
                  <input type="text" defaultValue="Sarah Ahmed" style={{ width: '100%', padding: '12px 16px', border: '2px solid #E8E4DC', borderRadius: 10, fontSize: '0.9rem', outline: 'none', color: 'var(--dark)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666', marginBottom: 6, display: 'block' }}>Email</label>
                  <input type="email" defaultValue="sarah@email.com" style={{ width: '100%', padding: '12px 16px', border: '2px solid #E8E4DC', borderRadius: 10, fontSize: '0.9rem', outline: 'none', color: 'var(--dark)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666', marginBottom: 6, display: 'block' }}>Phone</label>
                  <input type="tel" defaultValue="+966 50 123 4567" style={{ width: '100%', padding: '12px 16px', border: '2px solid #E8E4DC', borderRadius: 10, fontSize: '0.9rem', outline: 'none', color: 'var(--dark)' }} />
                </div>
                <button className="gradient-gold" style={{ padding: '12px 30px', borderRadius: 10, border: 'none', fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark)', cursor: 'pointer', marginTop: 8 }}>
                  Save Changes
                </button>
              </div>
            </div>

            <div className="p-6 mb-5" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 20 }}>{t('dash.currency') as string}</h3>
              <select style={{ width: '100%', padding: '12px 16px', border: '2px solid #E8E4DC', borderRadius: 10, fontSize: '0.9rem', outline: 'none', color: 'var(--dark)' }}>
                <option value="USD">USD ($)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <div className="p-6" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#E74C3C', marginBottom: 12 }}>{t('dash.danger') as string}</h3>
              <p style={{ fontSize: '0.85rem', color: '#777', marginBottom: 16 }}>{t('dash.deleteDesc') as string}</p>
              {!showDeleteConfirm ? (
                <button onClick={() => setShowDeleteConfirm(true)} style={{ padding: '10px 24px', borderRadius: 10, background: 'rgba(231,76,60,0.1)', color: '#E74C3C', border: '1px solid #E74C3C', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                  {t('dash.deleteBtn') as string}
                </button>
              ) : (
                <div className="flex gap-3">
                  <button style={{ padding: '10px 24px', borderRadius: 10, background: '#E74C3C', color: '#fff', border: 'none', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                    {t('dash.confirmDelete') as string}
                  </button>
                  <button onClick={() => setShowDeleteConfirm(false)} style={{ padding: '10px 24px', borderRadius: 10, background: '#f5f5f5', color: '#666', border: 'none', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
