import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Resources from "./pages/Resources";
import Safety from "./pages/Safety";
import Organization from "./pages/Organization";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsArticlePage from "./pages/NewsArticlePage";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import ServiceDetail from "./pages/ServiceDetail";
import NewsCategoryPage from "./pages/NewsCategoryPage";
import { resolveRedirect } from "@/config/redirects";

const queryClient = new QueryClient();

/** Centralised legacy-URL redirect handler (single source: config/redirects.ts). */
const LegacyRedirects = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const target = resolveRedirect(pathname);
    if (target) navigate(target, { replace: true });
  }, [pathname, navigate]);
  return null;
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      const t = window.setTimeout(scroll, 260);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
        <Route path="/safety" element={<PageTransition><Safety /></PageTransition>} />
        <Route path="/organization" element={<PageTransition><Organization /></PageTransition>} />
        <Route path="/news" element={<PageTransition><News /></PageTransition>} />
        <Route path="/news/category/:slug" element={<PageTransition><NewsCategoryPage /></PageTransition>} />
        <Route path="/news/:slug" element={<PageTransition><NewsArticlePage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Loader />
          <BrowserRouter>
            <ScrollProgress />
            <LegacyRedirects />
            <ScrollToTop />
            <Navbar />
            <AnimatedRoutes />
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
