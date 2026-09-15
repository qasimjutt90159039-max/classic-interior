import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';
import { GalleryItem } from '../types';
import { LoadingState, EmptyState, ErrorState } from '../components/StateViews';
import { Lightbox } from '../components/Lightbox';

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Bedroom Walls',
    'Decorative Wall Panels',
    'Textures & Surfaces',
    'Feature Walls',
  ];

  const loadGallery = () => {
    setLoading(true);
    setError(null);
    fetchGallery(selectedCategory)
      .then((data) => setItems(data))
      .catch((err) => setError(err.message || 'Failed to retrieve gallery'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadGallery();
  }, [selectedCategory]);

  return (
    <div id="gallery-page" className="min-h-screen pt-[72px] bg-[#FFFFFF]">
      {/* Editorial Header */}
      <section className="border-b border-[#E7E7E5] py-20 px-6 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between">
          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block mb-2 font-mono">
              VISUAL MATERIAL ARCHIVE • DISCIPLINE 05
            </span>
            <h1 className="font-serif-display text-4xl sm:text-6xl text-[#111111] font-light">
              Material & Space Gallery
            </h1>
            <p className="text-sm text-[#8A8A86] mt-4 leading-relaxed max-w-2xl">
              An editorial survey of wallpaper finishes, bedroom wall paneling studies, and tactile surface grains. Click on any composition to open the full-scale material lightbox.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8A8A86] block">
              Editorial Notice
            </span>
            <span className="text-xs text-[#252525]">
              Showing curated showroom materials & studio records
            </span>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="border-b border-[#E7E7E5] bg-[#FFFFFF] sticky top-[60px] sm:top-[68px] z-20 backdrop-blur-md bg-[#FFFFFF]/95">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'bg-[#FAF9F7] text-[#8A8A86] hover:text-[#111111] border border-[#E7E7E5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Non-Uniform Masonry Layout */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingState message="Fetching gallery archive..." />
          ) : error ? (
            <ErrorState message={error} onRetry={loadGallery} />
          ) : items.length === 0 ? (
            <EmptyState
              title="Gallery images will appear here once they are added."
              description="No gallery items currently exist in the showroom archive. Real business photographs added via the admin dashboard will display here."
              actionText="Reload Gallery"
              onAction={loadGallery}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
              {items.map((item, idx) => {
                // Architectural varied masonry spans
                const isFeatured = idx % 5 === 0;
                const isTall = idx % 5 === 2;
                const isWide = idx % 5 === 4;

                const colSpanClass = isWide
                  ? 'sm:col-span-2 row-span-1'
                  : isTall
                  ? 'row-span-2'
                  : isFeatured
                  ? 'sm:col-span-2 row-span-2'
                  : 'col-span-1 row-span-1';

                return (
                  <div
                    key={item._id}
                    onClick={() => setLightboxIndex(idx)}
                    className={`group relative overflow-hidden bg-[#FAF9F7] border border-[#E7E7E5] cursor-pointer ${colSpanClass} transition-all duration-300 hover:shadow-lg`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#E9E5DF]">
                        {item.category}
                      </span>
                      <h4 className="font-serif-display text-xl text-[#FFFFFF] mt-1">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-[#E7E7E5]/90 line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      )}
                      <span className="text-[10px] text-[#FAF9F7] uppercase tracking-widest mt-2 underline underline-offset-4">
                        Click to Expand Study
                      </span>
                    </div>

                    <div className="absolute top-3 left-3 bg-[#FFFFFF]/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-mono uppercase text-[#111111] border border-[#E7E7E5]">
                      {item.category}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && items.length > 0 && (
        <Lightbox
          items={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : items.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : 0))}
        />
      )}
    </div>
  );
};
