import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import Sidebar from './components/layout/Sidebar';
import MobileHeader from './components/layout/MobileHeader';
import ScrollIndicator from './components/layout/ScrollIndicator';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import MainRoutes from './routes/MainRoutes';

const DARK_ROUTES = ['/contact'];
const KNOWN_ROUTES = ['/', '/work', '/about', '/contact'];

function AppShell() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const { pathname } = useLocation();
  const isKnownRoute = KNOWN_ROUTES.includes(pathname);
  const isDark = isFooterVisible || DARK_ROUTES.includes(pathname);
  const hideNav = isFooterVisible || !isKnownRoute;

  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'start center'],
  });
  const transitionBg = useTransform(footerProgress, [0, 1], ['#FBF9EF', '#1F1F1F']);

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <main className='relative min-h-screen bg-base-bg text-base-ink flex flex-col'>
      <Sidebar overFooter={hideNav} dark={isDark} />
      <MobileHeader overFooter={isDark} />
      <ScrollIndicator overFooter={isDark} />

      <motion.div
        className="relative flex-1 pt-24 md:pt-0 md:px-32 w-full"
        style={isKnownRoute ? { backgroundColor: transitionBg } : undefined}
      >
        <MainRoutes />
      </motion.div>

      {isKnownRoute && (
        <div ref={footerRef}>
          <Footer />
        </div>
      )}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  );
}
