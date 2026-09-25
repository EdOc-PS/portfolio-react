import { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import MobileHeader from './components/layout/MobileHeader';
import ScrollIndicator from './components/layout/ScrollIndicator';
import Footer from './components/layout/Footer';
import MainRoutes from './routes/MainRoutes';

export default function App() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <BrowserRouter>
      <main className='relative min-h-screen bg-base-bg text-base-ink flex flex-col'>
        <Sidebar overFooter={isFooterVisible} />
        <MobileHeader />
        <ScrollIndicator overFooter={isFooterVisible} />

        <div className="relative flex-1 pt-24 md:pt-0 md:px-32 w-full">
          <MainRoutes />
        </div>

        <div ref={footerRef}>
          <Footer />
        </div>
      </main>
    </BrowserRouter>
  );
}
