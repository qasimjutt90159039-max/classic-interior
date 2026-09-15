import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Sliders } from 'lucide-react';
import { BUSINESS_INFO } from '../types';

export const WallpaperPanelsPage: React.FC = () => {
  const panelSections = [
    {
      id: 'decorative-wall-panels',
      number: '01',
      title: 'Decorative Wall Panels',
      categoryTag: 'SURFACE RELIEF & GEOMETRY',
      description: 'Three-dimensional relief surfaces, geometric grooves, and fluted acoustic slats that convert flat boundaries into tactile architectural features.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      technicalSpecs: [
        'Modular interlocking panels for seamless horizontal or vertical alignment',
        'Engineered substrates with damp-resistant backing for durability',
        'Integrates with concealed perimeter LED channel illumination',
      ],
      textureNote: 'Matte fluted timber & composite profile study',
    },
    {
      id: 'bedroom-wall-panels',
      number: '02',
      title: 'Bedroom Wall Panels',
      categoryTag: 'SANCTUARY & HEADBOARD ACCENTS',
      description: 'Specially scaled configurations for master bedroom backdrops, headboard integration, and acoustic dampening. Muted organic tones promote restful spatial psychology.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
      technicalSpecs: [
        'Acoustically softened backing reducing bedroom reverberation',
        'Fabric-wrapped or textured vinyl surface laminates',
        'Custom height configurations to align with bedroom bed frames',
      ],
      textureNote: 'Linen-clad textured paneling with soft chamfered edges',
    },
    {
      id: 'feature-walls',
      number: '03',
      title: 'Feature Walls',
      categoryTag: 'FOCAL ARCHITECTURAL STATEMENTS',
      description: 'Full-height monolithic compositions crafted for salon focal walls, living room media niches, and grand entrance halls requiring dramatic visual anchoring.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      technicalSpecs: [
        'Large-format modular panels minimizing visible seam interruptions',
        'Compatible with stone-look, micro-cement, and metallic accent veins',
        'Non-combustible core substrate options for safe interior placement',
      ],
      textureNote: 'Monolithic warm stone effect with precision shadow reveal gaps',
    },
    {
      id: 'interior-wall-applications',
      number: '04',
      title: 'Interior Wall Applications',
      categoryTag: 'MATERIAL INTERFACE & TRIM',
      description: 'Bespoke transitions between wallpaper fields and panel relief systems, providing tailored corner reveals, skirting terminations, and ceiling coves.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      technicalSpecs: [
        'Anodized and coated junction trims for crisp material interfaces',
        'Concealed fastening systems preserving immaculate surface integrity',
        'Custom detailing designed to meet unique Lahore room layouts',
      ],
      textureNote: 'Architectural reveal profiles and material junction detail',
    },
  ];

  return (
    <div id="wallpaper-panels-page" className="min-h-screen pt-[72px] bg-[#FFFFFF]">
      {/* Editorial Header */}
      <section className="border-b border-[#E7E7E5] py-20 px-6 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between">
          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block mb-2 font-mono">
              VERTICAL MATERIAL SHOWCASE • DISCIPLINE 02
            </span>
            <h1 className="font-serif-display text-4xl sm:text-6xl text-[#111111] font-light">
              Wallpaper Panels
            </h1>
            <p className="text-sm text-[#8A8A86] mt-4 leading-relaxed max-w-2xl">
              Vertical material storytelling featuring architectural relief wall systems, bedroom feature backdrops, and dimensional surface applications. Inquire with our Lahore showroom to review panel profiles.
            </p>
          </div>

          <div className="mt-8 md:mt-0 text-right">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest hover:bg-[#252525] transition-colors"
            >
              <span>Inquire on Panel Sets</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vertical Section by Section Storytelling */}
      <div className="divide-y divide-[#E7E7E5]">
        {panelSections.map((sec, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <section
              key={sec.id}
              id={sec.id}
              className="py-24 px-6 sm:px-8 relative overflow-hidden"
            >
              <div className="max-w-7xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual column */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[16/10] bg-[#FAF9F7] overflow-hidden border border-[#E7E7E5] shadow-sm">
                      <img
                        src={sec.image}
                        alt={sec.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Floating Texture preview note */}
                      <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#FFFFFF]/90 backdrop-blur-md p-4 border border-[#E7E7E5] text-xs max-w-md">
                        <span className="text-[10px] uppercase font-mono text-[#8A8A86] block">
                          SURFACE STUDY
                        </span>
                        <p className="text-[#111111] font-medium mt-0.5">{sec.textureNote}</p>
                      </div>

                      <div className="absolute top-4 right-4 bg-[#111111] text-[#FFFFFF] px-3 py-1 text-[11px] font-mono tracking-widest">
                        SEC / {sec.number}
                      </div>
                    </div>
                  </div>

                  {/* Editorial specification column */}
                  <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-mono text-[#8A8A86]">{sec.number}</span>
                      <span className="w-8 h-[1px] bg-[#8A8A86]"></span>
                      <span className="text-[10px] uppercase tracking-widest font-mono text-[#8A8A86]">
                        {sec.categoryTag}
                      </span>
                    </div>

                    <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111]">
                      {sec.title}
                    </h2>

                    <p className="text-sm text-[#252525] font-light leading-relaxed">
                      {sec.description}
                    </p>

                    <div className="pt-4 border-t border-[#E7E7E5] space-y-3">
                      <h4 className="text-[11px] uppercase tracking-widest text-[#8A8A86] font-medium">
                        Architectural Principles
                      </h4>
                      <ul className="space-y-2">
                        {sec.technicalSpecs.map((spec, sIdx) => (
                          <li key={sIdx} className="text-xs text-[#252525] flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0"></span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6">
                      <Link
                        to="/contact"
                        className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-medium text-[#111111] hover:underline underline-offset-4"
                      >
                        <span>Discuss {sec.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom Showroom Action */}
      <section className="py-20 px-6 sm:px-8 bg-[#FAF9F7] border-t border-[#E7E7E5]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block">
            Lahore Showroom Display
          </span>
          <h3 className="font-serif-display text-3xl sm:text-4xl text-[#111111]">
            Experience Dimensional Panel Finishes at Beadon Road
          </h3>
          <p className="text-sm text-[#8A8A86] max-w-xl mx-auto leading-relaxed">
            Our physical showroom presents wall panel mockups demonstrating illumination channels, edge returns, and wallpaper junction techniques.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest hover:bg-[#252525] transition-colors"
            >
              Contact Design Desk
            </Link>
            <a
              href={BUSINESS_INFO.phoneRaw}
              className="px-8 py-3.5 border border-[#111111] text-[#111111] text-xs uppercase tracking-widest hover:bg-[#FFFFFF] transition-colors"
            >
              Call {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
