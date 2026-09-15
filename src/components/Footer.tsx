import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../types';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Wallpaper', path: '/wallpaper' },
    { name: 'Wallpaper Panels', path: '/wallpaper-panels' },
    { name: 'Interior Design', path: '/interior-design' },
    { name: 'Collections', path: '/collections' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer id="main-footer" className="bg-[#FAF9F7] border-t border-[#E7E7E5] pt-16 pb-12 text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#E7E7E5]">
          {/* Business Identity */}
          <div className="md:col-span-6 space-y-4">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-[#8A8A86]">
              {BUSINESS_INFO.category} • Lahore, Pakistan
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#111111] leading-snug font-normal max-w-xl">
              {BUSINESS_INFO.name}
            </h2>
            <p className="text-sm text-[#8A8A86] max-w-md leading-relaxed">
              Curating architectural wallpapers, bedroom feature wall panels, and refined interior surfaces from our Lahore showroom.
            </p>
          </div>

          {/* Showroom Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#8A8A86]">Showroom Location</h3>
            <div className="flex items-start space-x-2 text-sm text-[#252525]">
              <MapPin className="w-4 h-4 text-[#8A8A86] shrink-0 mt-1" />
              <address className="not-italic leading-relaxed">
                {BUSINESS_INFO.address}
              </address>
            </div>
            <div className="pt-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-maps-link"
                className="inline-flex items-center text-xs tracking-wider uppercase text-[#111111] hover:underline underline-offset-4"
              >
                <span>Locate on Google Maps</span>
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Inquiries & Direct Line */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#8A8A86]">Direct Telephone</h3>
            <div className="flex items-center space-x-2 text-sm text-[#252525]">
              <Phone className="w-4 h-4 text-[#8A8A86] shrink-0" />
              <a
                href={BUSINESS_INFO.phoneRaw}
                id="footer-phone-link"
                className="text-base font-medium tracking-wide hover:underline underline-offset-4"
              >
                {BUSINESS_INFO.phone}
              </a>
            </div>
            <p className="text-xs text-[#8A8A86] leading-relaxed pt-1">
              Visit our showroom on Beadon Road or contact our design desk for wallpaper specifications.
            </p>
          </div>
        </div>

        {/* Directory Navigation Links */}
        <div className="py-8 flex flex-wrap gap-x-8 gap-y-3 items-center justify-between text-xs tracking-wider uppercase text-[#8A8A86]">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-[#111111] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Link
            to="/admin"
            className="text-[#8A8A86] hover:text-[#111111] text-[11px] underline underline-offset-2"
          >
            Showroom Admin Portal
          </Link>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#E7E7E5]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8A86] gap-4">
          <p>© {currentYear} Classic Interior. All architectural rights reserved.</p>
          <p>Beadon Rd, Lahore, Pakistan • Certified Showroom Catalog</p>
        </div>
      </div>
    </footer>
  );
};
