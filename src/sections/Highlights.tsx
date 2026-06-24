import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: number;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  duration: string;
  price: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Desert Golden Hour Photoshoot',
    category: 'Photography',
    image: '/images/desert-photoshoot.jpg',
    rating: 4.9,
    reviews: 284,
    location: 'Al Qudra Desert',
    duration: '3 hours',
    price: 'From $450',
  },
  {
    id: 2,
    title: 'VIP Skyline Dining Experience',
    category: 'Dining',
    image: '/images/vip-dining.jpg',
    rating: 4.9,
    reviews: 412,
    location: 'DIFC',
    duration: '4 hours',
    price: 'From $680',
  },
  {
    id: 3,
    title: 'Palm Jumeirah Skydiving',
    category: 'Adventure',
    image: '/images/skydiving-palm.jpg',
    rating: 5.0,
    reviews: 198,
    location: 'Skydive Dubai',
    duration: '2 hours',
    price: 'From $580',
  },
  {
    id: 4,
    title: 'Art & Cultural Heritage Tour',
    category: 'Culture',
    image: '/images/art-gallery.jpg',
    rating: 4.8,
    reviews: 156,
    location: 'Al Fahidi',
    duration: '5 hours',
    price: 'From $320',
  },
  {
    id: 5,
    title: 'Seven-Star Spa Retreat',
    category: 'Wellness',
    image: '/images/luxury-spa.jpg',
    rating: 4.9,
    reviews: 367,
    location: 'Burj Al Arab',
    duration: '6 hours',
    price: 'From $890',
  },
  {
    id: 6,
    title: 'Marina Yacht Sunset Cruise',
    category: 'Yacht',
    image: '/images/yacht-sunset.jpg',
    rating: 4.9,
    reviews: 523,
    location: 'Dubai Marina',
    duration: '4 hours',
    price: 'From $1,200',
  },
  {
    id: 7,
    title: 'Arabic Culinary Experience',
    category: 'Food',
    image: '/images/arabic-coffee.jpg',
    rating: 4.8,
    reviews: 241,
    location: 'Old Dubai',
    duration: '3 hours',
    price: 'From $280',
  },
  {
    id: 8,
    title: 'Helicopter Grand Tour',
    category: 'Aerial',
    image: '/images/helicopter-tour.jpg',
    rating: 5.0,
    reviews: 178,
    location: 'Palm Jumeirah',
    duration: '45 min',
    price: 'From $750',
  },
];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: (index % 4) * 0.1,
        }
      );
    }, card);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        background: '#FFFFFF',
        opacity: 0,
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={exp.image}
          alt={exp.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-500 flex items-end justify-center pb-8"
        >
          <span
            className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 px-6 py-3"
            style={{
              background: '#C9A962',
              color: '#1A1A2E',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            View Details
          </span>
        </div>
        {/* Category badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1.5"
          style={{
            background: 'rgba(26, 26, 46, 0.85)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem',
              fontWeight: 500,
              color: '#C9A962',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {exp.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-display mb-3"
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#1A1A2E',
            lineHeight: 1.25,
          }}
        >
          {exp.title}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <Star size={12} fill="#C9A962" color="#C9A962" />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#111111',
            }}
          >
            {exp.rating}
          </span>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              color: '#666',
            }}
          >
            ({exp.reviews} reviews)
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <MapPin size={11} color="#666" />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                color: '#666',
              }}
            >
              {exp.location}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={11} color="#666" />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                color: '#666',
              }}
            >
              {exp.duration}
            </span>
          </div>
        </div>

        <div
          className="pt-3"
          style={{ borderTop: '1px solid rgba(201, 169, 98, 0.2)' }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#C9A962',
            }}
          >
            {exp.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Highlights() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="highlights"
      className="relative w-full"
      style={{ background: '#F8F6F0', padding: '8rem 5vw 10rem' }}
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16" style={{ opacity: 0 }}>
        <div className="flex items-end justify-between mb-4">
          <div>
            <span
              className="block mb-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C9A962',
              }}
            >
              Curated For You
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                fontWeight: 600,
                color: '#1A1A2E',
                lineHeight: 1.1,
              }}
            >
              Exclusive Experiences
            </h2>
          </div>
          <a
            href="#inquire"
            className="hidden md:flex items-center gap-2 transition-colors duration-300 hover:text-gold"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#1A1A2E',
            }}
          >
            View All
            <span>&rarr;</span>
          </a>
        </div>
        <div
          style={{
            width: 60,
            height: 2,
            background: '#C9A962',
          }}
        />
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
