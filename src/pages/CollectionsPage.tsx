import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, FolderPlus } from 'lucide-react';
import { fetchCollections } from '../services/api';
import { Collection } from '../types';
import { LoadingState, EmptyState, ErrorState } from '../components/StateViews';

export const CollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCollections = () => {
    setLoading(true);
    setError(null);
    fetchCollections()
      .then((data) => setCollections(data))
      .catch((err) => setError(err.message || 'Failed to retrieve collections'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCollections();
  }, []);

  return (
    <div id="collections-page" className="min-h-screen pt-[72px] bg-[#FFFFFF]">
      {/* Editorial Header */}
      <section className="border-b border-[#E7E7E5] py-20 px-6 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between">
          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block mb-2 font-mono">
              CURATED SUITES • DISCIPLINE 04
            </span>
            <h1 className="font-serif-display text-4xl sm:text-6xl text-[#111111] font-light">
              Material Collections
            </h1>
            <p className="text-sm text-[#8A8A86] mt-4 leading-relaxed max-w-2xl">
              Coordinated material series harmonizing bedroom wallpapers with architectural relief panels. Explore individual suites or inquire with our showroom team in Lahore.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              to="/wallpaper"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#111111] hover:underline underline-offset-4"
            >
              <span>View All Wallpapers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Large Vertical List with Image Previews */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingState message="Connecting to showroom collection archive..." />
          ) : error ? (
            <ErrorState message={error} onRetry={loadCollections} />
          ) : collections.length === 0 ? (
            <EmptyState
              title="No collections have been added yet."
              description="Curated collections configured through the showroom admin manager will appear in this vertical index."
              actionText="Reload Collections"
              onAction={loadCollections}
            />
          ) : (
            <div className="divide-y divide-[#E7E7E5] border-y border-[#E7E7E5]">
              {collections.map((col, idx) => (
                <div
                  key={col._id}
                  className="py-12 group transition-all duration-300 hover:bg-[#FAF9F7]/60"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left: Number indicator and details */}
                    <div className="lg:col-span-6 space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl sm:text-3xl font-serif-display font-light text-[#8A8A86] group-hover:text-[#111111] transition-colors">
                          {idx < 9 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <span className="w-8 h-[1px] bg-[#E7E7E5]"></span>
                        <span className="text-[10px] tracking-widest uppercase font-mono text-[#8A8A86]">
                          {col.category}
                        </span>
                      </div>

                      <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] group-hover:translate-x-1 transition-transform">
                        {col.name}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#8A8A86] leading-relaxed max-w-lg">
                        {col.description}
                      </p>

                      <div className="pt-4">
                        <Link
                          to={`/contact?inquiryType=Wallpaper&collection=${encodeURIComponent(col.name)}`}
                          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-medium text-[#111111] group-hover:underline underline-offset-4"
                        >
                          <span>Inquire on Collection Suite</span>
                          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Right: Generous horizontal/widescreen image preview */}
                    <div className="lg:col-span-6">
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#FAF9F7] border border-[#E7E7E5]">
                        <img
                          src={col.image}
                          alt={col.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase text-[#111111]">
                          Curated Spec
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
