import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../types';

interface NavbarProps {
  onOpenInquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Wallpaper', path: '/wallpaper' },
    { name: 'Panels', path: '/wallpaper-panels' },
    { name: 'Interior Design', path: '/interior-design' },
    { name: 'Collections', path: '/collections' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E7E7E5] py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
          : 'bg-[#FFFFFF]/80 backdrop-blur-sm border-b border-[#E7E7E5]/50 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link
          to="/"
          id="brand-logo-link"
          className="group flex flex-col focus:outline-none"
        >
          <span className="font-serif-display text-xl sm:text-2xl font-medium tracking-tight text-[#111111] group-hover:text-[#252525] transition-colors">
            CLASSIC INTERIOR
          </span>
          <span className="text-[10px] tracking-[0.2em] text-[#8A8A86] uppercase -mt-0.5">
            Lahore Showroom
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav id="desktop-nav" aria-label="Main Navigation" className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-[13px] tracking-wider uppercase transition-colors relative py-1 ${
                isActive(link.path)
                  ? 'text-[#111111] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111]'
                  : 'text-[#8A8A86] hover:text-[#111111]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Contact Call-To-Action & Admin shortcut */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/admin"
            title="Admin Showroom Manager"
            id="admin-shortcut-btn"
            className="text-[#8A8A86] hover:text-[#111111] p-1.5 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            id="nav-contact-cta"
            className="inline-flex items-center justify-center px-4 py-2 border border-[#111111] bg-[#111111] text-[#FFFFFF] text-[12px] tracking-widest uppercase hover:bg-transparent hover:text-[#111111] transition-all duration-200"
          >
            <span>Contact Us</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* Mobile: Hamburger Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <Link
            to="/contact"
            id="mobile-call-icon"
            className="p-2 text-[#111111] hover:text-[#252525]"
            title="Call Showroom"
          >
            <Phone className="w-4 h-4" />
          </Link>
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111111] focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden fixed inset-x-0 top-[65px] bg-[#FFFFFF] border-b border-[#E7E7E5] shadow-xl px-6 py-8 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                id={`mobile-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-base tracking-wider uppercase py-2 border-b border-[#FAF9F7] flex items-center justify-between ${
                  isActive(link.path)
                    ? 'text-[#111111] font-semibold'
                    : 'text-[#8A8A86] hover:text-[#111111]'
                }`}
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#8A8A86]">0{navLinks.indexOf(link) + 1}</span>
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E7E7E5] flex flex-col space-y-3">
            <a
              href={BUSINESS_INFO.phoneRaw}
              id="mobile-phone-action"
              className="text-sm font-medium text-[#111111] flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-[#8A8A86]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <div className="flex space-x-3 pt-2">
              <Link
                to="/contact"
                id="mobile-contact-btn"
                className="flex-1 py-3 text-center bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest"
              >
                Inquire Showroom
              </Link>
              <Link
                to="/admin"
                id="mobile-admin-btn"
                className="px-4 py-3 border border-[#E7E7E5] text-center text-xs uppercase tracking-wider text-[#8A8A86]"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
