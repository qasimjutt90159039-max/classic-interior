import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, ArrowUpRight, Compass, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../types';
import { InquiryForm } from '../components/InquiryForm';

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const [initialType, setInitialType] = useState<any>('General Inquiry');
  const [initialSubject, setInitialSubject] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('inquiryType');
    const collectionParam = params.get('collection');

    if (typeParam) {
      setInitialType(typeParam);
    }
    if (collectionParam) {
      setInitialSubject(`Inquiry regarding ${collectionParam}`);
    }
  }, [location.search]);

  return (
    <div id="contact-page" className="min-h-screen pt-[72px] bg-[#FFFFFF]">
      {/* Editorial Header */}
      <section className="border-b border-[#E7E7E5] py-20 px-6 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block mb-2 font-mono">
            COMMUNICATION & LOCATION
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl text-[#111111] font-light">
            Contact Showroom & Design Desk
          </h1>
          <p className="text-sm text-[#8A8A86] mt-4 leading-relaxed max-w-2xl">
            Direct communication desk for Classic Interior. Call our phone line or submit an inquiry for bedroom wallpaper specifications, wall panel estimates, and material inquiries in Lahore.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Interactive Inquiry Form */}
      <section className="py-16 sm:py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Exact Verified Business Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border border-[#E7E7E5] p-8 bg-[#FAF9F7] space-y-6">
              <div>
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#8A8A86] block">
                  Registered Business Name
                </span>
                <h2 className="font-serif-display text-2xl text-[#111111] mt-1 leading-snug">
                  {BUSINESS_INFO.name}
                </h2>
                <span className="inline-block mt-2 px-2.5 py-0.5 bg-[#FFFFFF] border border-[#E7E7E5] text-[11px] uppercase tracking-wider text-[#252525]">
                  Category: {BUSINESS_INFO.category}
                </span>
              </div>

              <div className="pt-6 border-t border-[#E7E7E5] space-y-5 text-sm">
                {/* Contact Number */}
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-[#111111] shrink-0 mt-1" />
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#8A8A86] block">
                      Direct Telephone Line
                    </span>
                    <a
                      href={BUSINESS_INFO.phoneRaw}
                      id="contact-phone-direct"
                      className="text-base font-medium text-[#111111] hover:underline underline-offset-4"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Showroom Address */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#111111] shrink-0 mt-1" />
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#8A8A86] block">
                      Physical Showroom Address
                    </span>
                    <address className="not-italic text-[#252525] mt-0.5 leading-relaxed">
                      {BUSINESS_INFO.address}
                    </address>
                  </div>
                </div>

                {/* Google Maps Button */}
                <div className="pt-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-google-maps-btn"
                    className="inline-flex items-center space-x-2 px-5 py-3 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest hover:bg-[#252525] transition-colors w-full justify-center"
                  >
                    <span>Navigate on Google Maps</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Notice */}
            <div className="p-6 border border-[#E7E7E5] bg-[#FFFFFF] text-xs text-[#8A8A86] leading-relaxed">
              <span className="font-medium uppercase tracking-wider text-[#111111] block mb-1">
                Direct Communication Channel
              </span>
              No official social media link was registered for this business. For authentic product pricing, showroom visits, or swatch inspections, please communicate exclusively through the verified telephone number ({BUSINESS_INFO.phone}) or through the inquiry desk on this page.
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <InquiryForm
              initialType={initialType}
              className="shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Embedded Map Visual Frame */}
      <section className="border-t border-[#E7E7E5] bg-[#FAF9F7] py-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E7E7E5]">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#8A8A86] font-mono">
                Physical Location Anchor
              </span>
              <h3 className="font-serif-display text-2xl text-[#111111]">
                15 MAIN Beadon Rd, Lahore
              </h3>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 sm:mt-0 inline-flex items-center space-x-1 text-xs uppercase tracking-widest text-[#111111] underline underline-offset-4"
            >
              <span>Launch Full Map Navigation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 bg-[#E7E7E5] border border-[#E7E7E5] overflow-hidden relative">
            <iframe
              title="Classic Interior Showroom Lahore Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) contrast(90%)' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${BUSINESS_INFO.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
