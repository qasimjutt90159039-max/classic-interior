import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Phone, MapPin, Layers, Compass, Sparkles } from 'lucide-react';
import { fetchProducts } from '../services/api';
import { Product, BUSINESS_INFO } from '../types';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setFeaturedProducts(data.slice(0, 3));
      })
      .catch(() => setFeaturedProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const materialStoryPanels = [
    {
      title: 'Wallpaper',
      category: 'Surface Architecture',
      description: 'Tactile textured wall coverings, minimalist grains, and tailored roll patterns for ambient residential walls.',
      link: '/wallpaper',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
      tag: '01 / SURFACE'
    },
    {
      title: 'Bedroom Walls',
      category: 'Quiet Sanctuary',
      description: 'Neutral matte gradients and acoustic-softened textile surfaces designed exclusively for private suites.',
      link: '/wallpaper',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
      tag: '02 / BEDROOM'
    },
    {
      title: 'Wallpaper Panels',
      category: 'Architectural Relief',
      description: 'Dimensional geometric relief, fluted vertical profiles, and modular panel configurations for feature surfaces.',
      link: '/wallpaper-panels',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
      tag: '03 / PANELS'
    },
    {
      title: 'Interior Design',
      category: 'Space Composition',
      description: 'Spatial layout choreography combining lighting angles, wall finishes, and bespoke room proportions.',
      link: '/interior-design',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      tag: '04 / DESIGN'
    },
  ];

  return (
    <div id="home-page" className="min-h-screen pt-[72px] bg-[#FFFFFF]">
      {/* 1. Split Editorial Hero */}
      <section id="hero-section" className="border-b border-[#E7E7E5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(88vh-72px)]">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#E7E7E5]">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] font-medium">
                  INTERIOR DESIGNER
                </span>
              </div>

              <div>
                <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#111111] leading-[0.95]">
                  CLASSIC<br />
                  <span className="italic font-normal">INTERIOR</span>
                </h1>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A86] mt-3">
                  Beadon Rd, Lahore • Showroom & Design Studio
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#252525] font-light leading-relaxed max-w-lg pt-2">
                Transforming interior walls and spatial atmospheres through curated wallpaper collections, architectural wall panels, and bespoke bedroom surface concepts.
              </p>
            </div>

            <div className="pt-10 sm:pt-14 space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/wallpaper"
                  id="hero-explore-wallpaper-btn"
                  className="px-7 py-3.5 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium hover:bg-[#252525] transition-all duration-200 inline-flex items-center space-x-2 shadow-sm"
                >
                  <span>Explore Wallpaper</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  id="hero-contact-btn"
                  className="px-7 py-3.5 border border-[#111111] text-[#111111] text-xs uppercase tracking-widest font-medium hover:bg-[#FAF9F7] transition-all duration-200 inline-flex items-center space-x-2"
                >
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-6 border-t border-[#E7E7E5] flex items-center justify-between text-xs text-[#8A8A86]">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#111111]" />
                  <span>15 MAIN Beadon Rd, Lahore</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#111111]" />
                  <a href={BUSINESS_INFO.phoneRaw} className="text-[#111111] hover:underline">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Panel with Technical Markers */}
          <div className="lg:col-span-6 relative bg-[#FAF9F7] min-h-[420px] sm:min-h-[500px] lg:min-h-full overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
              alt="Architectural Bedroom Wallpaper and Surface Study"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Dark gradient overlay for typography readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 via-transparent to-[#111111]/10"></div>

            {/* Decorative technical labels requested by user */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 bg-[#FFFFFF]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#E7E7E5] text-[10px] tracking-widest uppercase font-mono text-[#111111]">
              01 / WALL
            </div>
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-[#FFFFFF]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#E7E7E5] text-[10px] tracking-widest uppercase font-mono text-[#111111]">
              02 / TEXTURE
            </div>
            <div className="absolute bottom-8 right-8 bg-[#FFFFFF]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#E7E7E5] text-[10px] tracking-widest uppercase font-mono text-[#111111]">
              03 / SPACE
            </div>

            {/* Editorial Caption Tag */}
            <div className="absolute bottom-8 left-8 max-w-xs text-[#FFFFFF]">
              <span className="text-[10px] uppercase tracking-widest text-[#FAF9F7]/80 block">
                Visual Concept
              </span>
              <p className="font-serif-display text-lg sm:text-xl text-[#FFFFFF] mt-0.5 leading-snug">
                Textured Surface Architecture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE MATERIAL STORY (Horizontal Storytelling Section) */}
      <section id="material-story" className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#E7E7E5]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#E7E7E5]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] font-medium block mb-2">
                Showroom Pillars
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#111111] font-light tracking-tight">
                THE MATERIAL STORY
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8A8A86] max-w-md mt-4 md:mt-0 leading-relaxed">
              Explore our core focus disciplines: refined wallpapers, dedicated bedroom wall materials, decorative relief panels, and architectural interior spaces.
            </p>
          </div>

          {/* 4 Story Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materialStoryPanels.map((panel, idx) => (
              <div
                key={panel.title}
                className="group border border-[#E7E7E5] bg-[#FAF9F7] flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#111111]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E9E5DF]">
                  <img
                    src={panel.image}
                    alt={panel.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-wider uppercase font-mono text-[#111111]">
                    {panel.tag}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 bg-[#FFFFFF]">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8A8A86] block mb-1">
                      {panel.category}
                    </span>
                    <h3 className="font-serif-display text-2xl text-[#111111] mb-2">
                      {panel.title}
                    </h3>
                    <p className="text-xs text-[#8A8A86] leading-relaxed mb-6">
                      {panel.description}
                    </p>
                  </div>

                  <Link
                    to={panel.link}
                    className="inline-flex items-center justify-between text-xs tracking-widest uppercase font-medium text-[#111111] group-hover:underline underline-offset-4 pt-4 border-t border-[#FAF9F7]"
                  >
                    <span>Explore Material</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WALLPAPER EXPERIENCE SECTION */}
      <section id="wallpaper-experience" className="py-20 sm:py-28 px-6 sm:px-8 bg-[#FAF9F7] border-b border-[#E7E7E5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left large visual composition with floating card */}
            <div className="lg:col-span-7 relative">
              <div className="aspect-[16/10] bg-[#E7E7E5] overflow-hidden border border-[#E7E7E5]">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80"
                  alt="Wallpaper Experience Studio Atmosphere"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Material Card */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 md:right-8 bg-[#FFFFFF] p-6 border border-[#E7E7E5] shadow-lg max-w-xs">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#8A8A86] mb-1">
                  <Sparkles className="w-3 h-3 text-[#111111]" />
                  <span>Pattern Preview</span>
                </div>
                <h4 className="font-serif-display text-lg text-[#111111]">Linen Tactility</h4>
                <p className="text-[11px] text-[#8A8A86] leading-relaxed mt-1">
                  Non-woven substrate engineered for seamless wall alignment and subtle diffuse light dispersion.
                </p>
                <div className="mt-3 pt-3 border-t border-[#FAF9F7] text-[10px] font-mono text-[#111111]">
                  REF: WP-LA-049
                </div>
              </div>

              {/* Vertical section text */}
              <div className="absolute top-1/2 -left-10 -translate-y-1/2 -rotate-90 origin-center text-[10px] tracking-[0.3em] uppercase text-[#8A8A86] hidden xl:block font-mono">
                SEC 02 / WALLPAPER EXPERIENCE
              </div>
            </div>

            {/* Right text & CTA */}
            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="inline-block text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] font-medium">
                WALLPAPER EXPERIENCE
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#111111] font-light leading-tight">
                Surfaces that breathe warmth into private spaces.
              </h2>
              <p className="text-sm text-[#252525] font-light leading-relaxed">
                Wallpaper transforms bare plaster into an architectural plane. From serene neutral woven textures for master bedrooms to patterned feature statements, our showroom assists clients across Lahore in selecting the appropriate substrate.
              </p>

              <div className="pt-4 space-y-4">
                <div className="flex items-start space-x-3 text-xs text-[#252525]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0"></span>
                  <span><strong>Bedroom Suites:</strong> Acoustic softening, gentle tactile weaves, and low-sheen finishes.</span>
                </div>
                <div className="flex items-start space-x-3 text-xs text-[#252525]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0"></span>
                  <span><strong>Living Feature Walls:</strong> Distinctive botanical, modern geometric, and faux-plaster motifs.</span>
                </div>
                <div className="flex items-start space-x-3 text-xs text-[#252525]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0"></span>
                  <span><strong>Panel Applications:</strong> Relief coordination and fluted accents for recessed wall bays.</span>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/wallpaper"
                  id="wallpaper-exp-explore-btn"
                  className="px-8 py-3.5 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest hover:bg-[#252525] transition-colors inline-flex items-center space-x-2"
                >
                  <span>Explore Wallpaper Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Asymmetric Split: Wall Panels & Design Studio */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#E7E7E5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Card A: Wallpaper Panels */}
            <div className="lg:col-span-6 border border-[#E7E7E5] p-8 sm:p-12 flex flex-col justify-between bg-[#FFFFFF]">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#8A8A86] block mb-2">
                  DISCIPLINE 03
                </span>
                <h3 className="font-serif-display text-3xl sm:text-4xl text-[#111111] mb-4">
                  Wallpaper Panels
                </h3>
                <p className="text-sm text-[#8A8A86] leading-relaxed mb-8">
                  Fluted relief profiles and dimensional wall coverings that give structural depth to headboard walls and interior foyers.
                </p>
                <div className="aspect-[16/9] overflow-hidden bg-[#FAF9F7] mb-8 border border-[#E7E7E5]">
                  <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
                    alt="Decorative Wall Panels Showcase"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <Link
                to="/wallpaper-panels"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-medium text-[#111111] hover:underline underline-offset-4"
              >
                <span>View Panel Applications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card B: Interior Design */}
            <div className="lg:col-span-6 border border-[#E7E7E5] p-8 sm:p-12 flex flex-col justify-between bg-[#FAF9F7]">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#8A8A86] block mb-2">
                  DISCIPLINE 04
                </span>
                <h3 className="font-serif-display text-3xl sm:text-4xl text-[#111111] mb-4">
                  Interior Design
                </h3>
                <p className="text-sm text-[#8A8A86] leading-relaxed mb-8">
                  Harmonizing wall finishes, lighting angles, and room proportions to achieve an understated, calm residential environment.
                </p>
                <div className="aspect-[16/9] overflow-hidden bg-[#FFFFFF] mb-8 border border-[#E7E7E5]">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                    alt="Interior Design Studio Surface Philosophy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <Link
                to="/interior-design"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-medium text-[#111111] hover:underline underline-offset-4"
              >
                <span>Discover Spatial Design</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Showroom Visit & Physical Presence Callout */}
      <section className="py-20 px-6 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-5xl mx-auto border border-[#E7E7E5] bg-[#FFFFFF] p-8 sm:p-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] font-medium">
                Lahore Showroom Consultation
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111]">
                Examine Wallpaper Swatches & Panel Samples in Person
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8A86] leading-relaxed">
                Visit our physical showroom at 15 MAIN Beadon Rd, Lahore. Experience the weight of wallpapers, explore surface reflections under studio lighting, and discuss wall configurations with our interior designer desk.
              </p>
              <div className="pt-2 text-xs font-medium text-[#111111] flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#8A8A86]" />
                  <a href={BUSINESS_INFO.phoneRaw} className="hover:underline">{BUSINESS_INFO.phone}</a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#8A8A86]" />
                  <span>Beadon Rd, Lahore, 42000</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col space-y-3">
              <Link
                to="/contact"
                className="w-full py-3.5 text-center bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium hover:bg-[#252525] transition-colors"
              >
                Send Showroom Inquiry
              </Link>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 text-center border border-[#111111] text-[#111111] text-xs uppercase tracking-widest font-medium hover:bg-[#FAF9F7] transition-colors inline-flex items-center justify-center space-x-1"
              >
                <span>Open Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
