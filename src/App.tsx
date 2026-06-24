import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LanguageProvider } from './hooks/useLanguage';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import SearchBar from './sections/SearchBar';
import ExploreByMood from './sections/ExploreByMood';
import PhotoSpots from './sections/PhotoSpots';
import Experiences from './sections/Experiences';
import Itineraries from './sections/Itineraries';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Guides from './sections/Guides';
import Deals from './sections/Deals';
import BlogPreview from './sections/BlogPreview';
import Newsletter from './sections/Newsletter';
import Footer from './sections/Footer';
import MobileSticky from './sections/MobileSticky';

import Blog from './pages/Blog';
import Login from './pages/Login';
import TravelerDashboard from './pages/TravelerDashboard';
import PhotographerDashboard from './pages/PhotographerDashboard';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <SearchBar />
        <ExploreByMood />
        <PhotoSpots />
        <Experiences />
        <Itineraries />
        <Gallery />
        <Testimonials />
        <Guides />
        <Deals />
        <BlogPreview />
        <Newsletter />
      </main>
      <Footer />
      <MobileSticky />
    </>
  );
}

function BlogPage() {
  return (
    <>
      <Navigation />
      <Blog />
      <Footer />
    </>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/dashboard" element={<AuthLayout><TravelerDashboard /></AuthLayout>} />
      <Route path="/photographer-dashboard" element={<AuthLayout><PhotographerDashboard /></AuthLayout>} />
    </Routes>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
