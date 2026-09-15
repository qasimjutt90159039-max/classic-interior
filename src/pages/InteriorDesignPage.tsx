import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../types';

export const InteriorDesignPage: React.FC = () => {
  const designPillars = [
    {
      number: '01',
      title: 'SPACE',
      subheading: 'Volumetric Balance & Bedroom Layouts',
      description: 'Understanding sightlines, natural light ingress, and circulation vectors before fixing wall treatments. Space choreography ensures that bedroom suites feel protective yet unconfined.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      aspectRatio: 'aspect-[16/10]',
    },
    {
      number: '02',
      title: 'WALL',
      subheading: 'Defining Surfaces as Architectural Planes',
      description: 'Walls are the largest continuous visual elements in any room. Rather than flat neutral paint, intentional wallpaper and paneling introduce hierarchy, delineate headboard boundaries, and define domestic zones.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
      aspectRatio: 'aspect-[4/3]',
    },
    {
      number: '03',
      title: 'TEXTURE',
      subheading: 'Tactility, Light Absorption & Grain',
      description: 'Matte linen, fluted relief, mineral plaster grain, and fine metallic leaf respond dynamically to shifting sun angles and interior luminaires. Texture softens acoustic reverberation and adds subconscious comfort.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      aspectRatio: 'aspect-[16/9]',
    },
    {
      number: '04',
      title: 'ATMOSPHERE',
      subheading: 'The Emotional Resonance of Interior Living',
      description: 'A harmonious bedroom environment arises when wall textures, indirect warm illumination, and understated color palettes coalesce into a cohesive, restful whole.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80',
      aspectRatio: 'aspect-[16/10]',
    },
  ];

  return (
    <div id="interior-design-page" className="min-h-screen pt-[72px] bg-[#FFFFFF]">
      {/* Editorial Header */}
      <section className="border-b border-[#E7E7E5] py-20 sm:py-24 px-6 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block mb-2 font-mono">
            DISCIPLINE 03 • SPATIAL PHILOSOPHY
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl text-[#111111] font-light max-w-4xl">
            Interior Design & Surface Choreography
          </h1>
          <p className="text-sm text-[#8A8A86] mt-4 leading-relaxed max-w-2xl">
            An editorial exploration of spatial balance, wall architecture, material textures, and peaceful room atmosphere. Consult with our Lahore design desk to plan bedroom wall surfaces.
          </p>
        </div>
      </section>

      {/* 4 Architectural Pillars: 01 SPACE, 02 WALL, 03 TEXTURE, 04 ATMOSPHERE */}
      <div className="divide-y divide-[#E7E7E5]">
        {designPillars.map((pillar) => (
          <section key={pillar.number} className="py-24 px-6 sm:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Column: Editorial text */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-light">
                      {pillar.number}
                    </span>
                    <span className="w-10 h-[1px] bg-[#111111]"></span>
                    <span className="font-serif-display text-2xl sm:text-3xl tracking-wide uppercase text-[#111111]">
                      {pillar.title}
                    </span>
                  </div>

                  <h3 className="text-base text-[#111111] font-medium tracking-wide">
                    {pillar.subheading}
                  </h3>

                  <p className="text-sm text-[#8A8A86] leading-relaxed font-light">
                    {pillar.description}
                  </p>

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-medium text-[#111111] hover:underline underline-offset-4"
                    >
                      <span>Inquire for {pillar.title.toLowerCase()} Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Column: Full-width architectural visual */}
                <div className="lg:col-span-7">
                  <div className={`${pillar.aspectRatio} bg-[#FAF9F7] overflow-hidden border border-[#E7E7E5] shadow-sm`}>
                    <img
                      src={pillar.image}
                      alt={`Interior Design Philosophy: ${pillar.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Showroom Consultation Callout */}
      <section className="py-20 px-6 sm:px-8 bg-[#FAF9F7] border-t border-[#E7E7E5]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block">
            Lahore Showroom Consultation
          </span>
          <h3 className="font-serif-display text-3xl sm:text-4xl text-[#111111]">
            Plan Your Bedroom Walls With Classic Interior
          </h3>
          <p className="text-sm text-[#8A8A86] max-w-lg mx-auto leading-relaxed">
            Our Beadon Road design desk assists homeowners and builders with wallpaper selection, roll calculation, and wall panel integration.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest hover:bg-[#252525] transition-colors inline-block"
            >
              Reach Design Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
