import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const bookings = [
  { id: 1001, client: 'Sarah Ahmed', date: 'July 15, 2025', time: '5:00 PM', location: 'Desert Dunes', package: 'Standard — 90 min', price: '$340', status: 'new' },
  { id: 1002, client: 'Mohammed Al-Rashid', date: 'July 18, 2025', time: '6:30 PM', location: 'Dubai Marina', package: 'Premium — 3 hours', price: '$595', status: 'confirmed' },
  { id: 1003, client: 'Fatima Zahra', date: 'July 20, 2025', time: '7:00 AM', location: 'Burj Khalifa', package: 'Basic — 45 min', price: '$210', status: 'completed' },
  { id: 1004, client: 'John Smith', date: 'July 22, 2025', time: '5:30 PM', location: 'Old Dubai', package: 'Standard — 90 min', price: '$340', status: 'cancelled' },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];

export default function PhotographerDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'calendar'>('profile');
  const [bookingStatus, setBookingStatus] = useState<Record<number, string>>({});
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [profile, setProfile] = useState({
    name: 'Ahmed Al Mansoori',
    bio: 'Professional photographer based in Dubai with 8+ years of experience. Specializing in family portraits, desert shoots, and luxury lifestyle photography. Fluent in Arabic and English.',
    languages: 'Arabic, English',
    basicPrice: '210',
    standardPrice: '340',
    premiumPrice: '515',
    basicDesc: '45 min / 20 photos',
    standardDesc: '90 min / 45 photos',
    premiumDesc: '3 hours / 90 photos',
  });

  const tabs = [
    { key: 'profile' as const, label: 'Profile & Portfolio', icon: 'fa-user' },
    { key: 'bookings' as const, label: 'Booking Requests', icon: 'fa-calendar-check' },
    { key: 'calendar' as const, label: 'Availability', icon: 'fa-calendar-alt' },
  ];

  const statusColors: Record<string, { bg: string; color: string }> = {
    new: { bg: 'rgba(201,169,98,0.1)', color: 'var(--gold)' },
    confirmed: { bg: 'rgba(39,174,96,0.1)', color: '#27AE60' },
    completed: { bg: 'rgba(45,90,123,0.1)', color: 'var(--accent)' },
    cancelled: { bg: 'rgba(231,76,60,0.1)', color: '#E74C3C' },
  };

  const toggleSlot = (slot: string) => {
    setAvailability((prev) => ({ ...prev, [slot]: !prev[slot] }));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light)', paddingTop: 100 }}>
      <div className="mx-auto" style={{ maxWidth: 1200, padding: '0 24px' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="overflow-hidden flex-shrink-0" style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid var(--gold)' }}>
              <img src="/images/desert-photoshoot.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--dark)' }}>
                {profile.name}
              </h1>
              <p style={{ fontSize: '0.8rem', color: '#777' }}>Professional Photographer · {profile.languages}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-4 py-2" style={{ background: '#fff', borderRadius: 10, border: '1px solid #E8E4DC' }}>
              <i className="fas fa-star" style={{ color: 'var(--gold)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>4.9</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2" style={{ background: '#fff', borderRadius: 10, border: '1px solid #E8E4DC' }}>
              <i className="fas fa-camera" style={{ color: 'var(--gold)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>127 {t('dash.shoots') as string}</span>
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

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bio & Info */}
            <div className="p-6" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 20 }}>Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666', marginBottom: 6, display: 'block' }}>Display Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #E8E4DC', borderRadius: 10, fontSize: '0.9rem', outline: 'none', color: 'var(--dark)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666', marginBottom: 6, display: 'block' }}>Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                    rows={4}
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #E8E4DC', borderRadius: 10, fontSize: '0.9rem', outline: 'none', color: 'var(--dark)', resize: 'vertical' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666', marginBottom: 6, display: 'block' }}>Languages</label>
                  <input
                    type="text"
                    value={profile.languages}
                    onChange={(e) => setProfile((p) => ({ ...p, languages: e.target.value }))}
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #E8E4DC', borderRadius: 10, fontSize: '0.9rem', outline: 'none', color: 'var(--dark)' }}
                  />
                </div>
                <button className="gradient-gold" style={{ padding: '12px 30px', borderRadius: 10, border: 'none', fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark)', cursor: 'pointer' }}>
                  Save Profile
                </button>
              </div>
            </div>

            {/* Pricing Packages */}
            <div className="p-6" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 20 }}>Pricing Packages (USD)</h3>
              <div className="space-y-4">
                {(['basic', 'standard', 'premium'] as const).map((tier) => (
                  <div key={tier} className="p-4" style={{ background: 'var(--light)', borderRadius: 12, border: tier === 'premium' ? '1px solid var(--gold)' : '1px solid transparent' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)' }}>${profile[`${tier}Price`]}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#999' }}>{tier}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#999' }}>Price (USD)</label>
                        <input
                          type="text"
                          value={profile[`${tier}Price`]}
                          onChange={(e) => setProfile((p) => ({ ...p, [`${tier}Price`]: e.target.value }))}
                          style={{ width: '100%', padding: '8px 12px', border: '1px solid #E8E4DC', borderRadius: 8, fontSize: '0.85rem', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#999' }}>Description</label>
                        <input
                          type="text"
                          value={profile[`${tier}Desc`]}
                          onChange={(e) => setProfile((p) => ({ ...p, [`${tier}Desc`]: e.target.value }))}
                          style={{ width: '100%', padding: '8px 12px', border: '1px solid #E8E4DC', borderRadius: 8, fontSize: '0.85rem', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Gallery */}
            <div className="lg:col-span-2 p-6" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 20 }}>Portfolio Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['/images/desert-photoshoot.jpg', '/images/dubai-marina.jpg', '/images/skydiving-palm.jpg', '/images/old-dubai-fashion.jpg'].map((img, i) => (
                  <div key={i} className="relative overflow-hidden group" style={{ borderRadius: 12, aspectRatio: '3/4' }}>
                    <img src={img} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(26,26,46,0.5)' }}>
                      <i className="fas fa-trash" style={{ color: '#E74C3C', fontSize: '1.2rem' }} />
                    </button>
                  </div>
                ))}
                <button
                  className="flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  style={{ aspectRatio: '3/4', borderRadius: 12, border: '2px dashed #E8E4DC', background: '#fff', color: '#999', cursor: 'pointer' }}
                >
                  <i className="fas fa-plus" style={{ fontSize: '1.5rem' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Upload New</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'New Requests', value: 1, color: 'var(--gold)' },
                { label: 'Confirmed', value: 1, color: '#27AE60' },
                { label: 'Completed', value: 1, color: 'var(--accent)' },
                { label: 'Cancelled', value: 1, color: '#E74C3C' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 text-center" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}>
                  <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#999' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {bookings.map((booking) => {
              const currentStatus = bookingStatus[booking.id] || booking.status;
              return (
                <div key={booking.id} className="p-6" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1" style={{ borderRadius: 20, fontSize: '0.7rem', fontWeight: 700, background: statusColors[currentStatus]?.bg || '#f5f5f5', color: statusColors[currentStatus]?.color || '#666' }}>
                          {currentStatus === 'new' ? 'New Request' : currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#999' }}>#{booking.id}</span>
                      </div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 2 }}>{booking.client}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#666' }}>{booking.package}</p>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span style={{ fontSize: '0.8rem', color: '#888' }}><i className="far fa-calendar" style={{ marginRight: 4 }} />{booking.date}</span>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}><i className="far fa-clock" style={{ marginRight: 4 }} />{booking.time}</span>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}><i className="fas fa-map-marker-alt" style={{ marginRight: 4 }} />{booking.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)' }}>{booking.price}</span>
                      {booking.status === 'new' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setBookingStatus((prev) => ({ ...prev, [booking.id]: 'confirmed' }))}
                            style={{ padding: '8px 18px', borderRadius: 20, background: '#27AE60', color: '#fff', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            <i className="fas fa-check" style={{ marginRight: 4 }} />Accept
                          </button>
                          <button
                            onClick={() => setBookingStatus((prev) => ({ ...prev, [booking.id]: 'cancelled' }))}
                            style={{ padding: '8px 18px', borderRadius: 20, background: '#E74C3C', color: '#fff', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            <i className="fas fa-times" style={{ marginRight: 4 }} />Decline
                          </button>
                        </div>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => setBookingStatus((prev) => ({ ...prev, [booking.id]: 'completed' }))}
                          style={{ padding: '8px 18px', borderRadius: 20, background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          <i className="fas fa-check-double" style={{ marginRight: 4 }} />Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div>
            <div className="p-6 mb-6" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #F0EDE6' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 16 }}>Set Your Availability</h3>
              <p style={{ fontSize: '0.85rem', color: '#777', marginBottom: 20 }}>Click on time slots to toggle availability. Green slots are available for booking.</p>

              <div className="overflow-x-auto">
                <table className="w-full" style={{ minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '12px', fontSize: '0.75rem', color: '#999', fontWeight: 600, textAlign: 'left' }}>Time</th>
                      {weekDays.map((day) => (
                        <th key={day} style={{ padding: '12px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--dark)', textAlign: 'center' }}>{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot) => (
                      <tr key={slot} style={{ borderTop: '1px solid #F0EDE6' }}>
                        <td style={{ padding: '10px 12px', fontSize: '0.8rem', color: '#666', fontWeight: 500 }}>{slot}</td>
                        {weekDays.map((day) => {
                          const key = `${day}-${slot}`;
                          const isAvailable = availability[key] || false;
                          return (
                            <td key={key} style={{ padding: 6, textAlign: 'center' }}>
                              <button
                                onClick={() => toggleSlot(key)}
                                style={{
                                  width: '100%',
                                  padding: '8px 4px',
                                  borderRadius: 8,
                                  border: 'none',
                                  fontSize: '0.65rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  background: isAvailable ? 'rgba(39,174,96,0.15)' : 'rgba(0,0,0,0.03)',
                                  color: isAvailable ? '#27AE60' : '#ccc',
                                }}
                              >
                                {isAvailable ? 'Available' : '—'}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => {
                  const allAvailable: Record<string, boolean> = {};
                  weekDays.forEach((day) => timeSlots.forEach((slot) => { allAvailable[`${day}-${slot}`] = true; }));
                  setAvailability(allAvailable);
                }}
                className="transition-all duration-300"
                style={{ padding: '10px 24px', borderRadius: 10, background: '#27AE60', color: '#fff', border: 'none', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
              >
                <i className="fas fa-check" style={{ marginRight: 6 }} />Mark All Available
              </button>
              <button
                onClick={() => setAvailability({})}
                className="transition-all duration-300"
                style={{ padding: '10px 24px', borderRadius: 10, background: '#E74C3C', color: '#fff', border: 'none', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
              >
                <i className="fas fa-times" style={{ marginRight: 6 }} />Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
