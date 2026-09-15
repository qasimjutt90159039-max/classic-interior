import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ArrowUpRight, Check, Compass } from 'lucide-react';
import { BUSINESS_INFO } from '../types';

export const AboutPage: React.FC = () => {
  return (
    <div id="about-page" className="min-h-screen pt-[72px] bg-[#FFFFFF]">
      {/* Editorial Header */}
      <section className="border-b border-[#E7E7E5] py-16 sm:py-24 px-6 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block mb-3">
            Studio Information
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#111111] font-light max-w-4xl leading-tight">
            CLASSIC INTERIOR
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A86] mt-2">
            Category: {BUSINESS_INFO.category} • Lahore, Pakistan
          </p>
        </div>
      </section>

      {/* Main Studio Profile & Focus Disciplines */}
      <section className="py-20 px-6 sm:px-8 border-b border-[#E7E7E5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Business Overview */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[10px] tracking-[0.2em] font-mono text-[#8A8A86] uppercase block mb-2">
                01 / BUSINESS IDENTITY & FOCUS
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111]">
                Specialized in Wallpaper, Bedroom Walls, and Surface Design
              </h2>
            </div>

            <div className="space-y-5 text-sm text-[#252525] font-light leading-relaxed">
              <p>
                <strong>Classic Interior</strong> operates as an interior designer and architectural wall surface supplier based on Beadon Road in Lahore. The business’s stated specialization encompasses bedroom wallpaper selections, bespoke wallpaper panels, and comprehensive interior design consultation for residential spaces.
              </p>
              <p>
                Rather than treating interior walls as neutral boundaries, Classic Interior centers surface finishes as the primary element in defining room intimacy, acoustics, and tactile luxury.
              </p>
            </div>

            {/* Stated Core Focus Areas */}
            <div className="pt-6 border-t border-[#E7E7E5] space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#111111] font-medium">
                Core Stated Focus Areas
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 border border-[#E7E7E5] bg-[#FAF9F7]">
                  <span className="text-[10px] font-mono text-[#8A8A86] block mb-1">FOCUS A</span>
                  <h4 className="font-serif-display text-xl text-[#111111] mb-2">Bedroom Wallpaper</h4>
                  <p className="text-xs text-[#8A8A86] leading-relaxed">
                    Dedicated bedroom wall coverings emphasizing soothing textures, matte finishes, and calm domestic atmosphere.
                  </p>
                </div>

                <div className="p-5 border border-[#E7E7E5] bg-[#FAF9F7]">
                  <span className="text-[10px] font-mono text-[#8A8A86] block mb-1">FOCUS B</span>
                  <h4 className="font-serif-display text-xl text-[#111111] mb-2">Wallpaper Panels</h4>
                  <p className="text-xs text-[#8A8A86] leading-relaxed">
                    Architectural relief wall panels and fluted configurations for headboards, focal niches, and feature walls.
                  </p>
                </div>

                <div className="p-5 border border-[#E7E7E5] bg-[#FAF9F7]">
                  <span className="text-[10px] font-mono text-[#8A8A86] block mb-1">FOCUS C</span>
                  <h4 className="font-serif-display text-xl text-[#111111] mb-2">Interior Design</h4>
                  <p className="text-xs text-[#8A8A86] leading-relaxed">
                    Spatial layout coordination, material selection, and harmonizing lighting with dimensional wall treatments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Location & Verification Notice */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border border-[#E7E7E5] p-8 bg-[#FAF9F7]">
              <span className="text-[10px] tracking-[0.2em] font-mono text-[#8A8A86] uppercase block mb-3">
                02 / VERIFIED LOCATION
              </span>
              <h3 className="font-serif-display text-2xl text-[#111111] mb-4">
                Lahore Showroom Premises
              </h3>

              <div className="space-y-4 text-xs text-[#252525]">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#111111] uppercase tracking-wider text-[11px]">Address</strong>
                    <p className="text-[#8A8A86] mt-0.5">{BUSINESS_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#111111] uppercase tracking-wider text-[11px]">Telephone</strong>
                    <a href={BUSINESS_INFO.phoneRaw} className="text-[#111111] font-medium mt-0.5 block hover:underline">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E7E7E5]">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest text-center block hover:bg-[#252525] transition-colors"
                >
                  Locate Showroom on Google Maps
                </a>
              </div>
            </div>

            <div className="border border-[#E7E7E5] p-6 bg-[#FFFFFF]">
              <span className="text-[10px] tracking-widest text-[#8A8A86] uppercase block mb-2">
                Showroom Transparency Note
              </span>
              <p className="text-xs text-[#8A8A86] leading-relaxed">
                This website presents strictly the registered business details, stated interior focus, and catalog items entered directly into the showroom database. No synthetic reviews, unverified project claims, or mock certifications are published.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Spatial Atmosphere */}
      <section className="py-20 px-6 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="aspect-[4/3] bg-[#E7E7E5] overflow-hidden border border-[#E7E7E5]">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
              alt="Classic Interior Showroom Philosophy Study"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6 md:pl-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86]">Design Desk</span>
            <h3 className="font-serif-display text-3xl sm:text-4xl text-[#111111]">
              Connecting Material Samples to Physical Rooms
            </h3>
            <p className="text-sm text-[#8A8A86] leading-relaxed">
              We invite clients, homeowners, and architects to discuss their wall plans with us directly on Beadon Road. Whether examining sample wallpaper rolls or configuring dimensional panel runs, our team assists you with technical substrate advice and installation planning.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="px-6 py-3 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest hover:bg-[#252525] transition-colors inline-block"
              >
                Inquire With Showroom
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
