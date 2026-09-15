import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowRight, ArrowUpRight, RotateCw, Filter } from 'lucide-react';
import { fetchProducts } from '../services/api';
import { Product } from '../types';
import { LoadingState, EmptyState, ErrorState } from '../components/StateViews';

export const WallpaperPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    'All',
    'Bedroom Wallpaper',
    'Decorative Wallpaper',
    'Patterned Wallpaper',
    'Modern Wallpaper',
    'Other Wallpaper',
  ];

  const loadProducts = () => {
    setLoading(true);
    setError(null);
    fetchProducts({
      category: selectedCategory,
      search: searchQuery,
      sort: sortBy === 'name-asc' ? 'name-asc' : sortBy === 'name-desc' ? 'name-desc' : 'newest',
    })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message || 'Failed to retrieve wallpaper catalog'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadProducts();
  };

  return (
    <div id="wallpaper-page" className="min-h-screen pt-[72px] bg-[#FFFFFF]">
      {/* Editorial Header */}
      <section className="border-b border-[#E7E7E5] py-16 sm:py-20 px-6 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block mb-2 font-mono">
              CATALOG DISCIPLINE 01
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#111111] font-light">
              Wallpaper Catalog
            </h1>
            <p className="text-sm text-[#8A8A86] mt-4 leading-relaxed">
              Curated wall coverings spanning bedroom textures, decorative geometric motifs, and tactile mineral patterns. Inquire directly with our Lahore showroom for roll specifications and ordering.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="border-b border-[#E7E7E5] bg-[#FFFFFF] sticky top-[60px] sm:top-[68px] z-20 backdrop-blur-md bg-[#FFFFFF]/95">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#111111] text-[#FFFFFF]'
                      : 'bg-[#FAF9F7] text-[#8A8A86] hover:text-[#111111] border border-[#E7E7E5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search and Sort controls */}
            <div className="flex items-center space-x-3 w-full lg:w-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex-1 lg:w-64">
                <input
                  type="text"
                  placeholder="Search wallpaper..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#FAF9F7] border border-[#E7E7E5] text-xs text-[#111111] placeholder:text-[#8A8A86] focus:outline-none focus:border-[#111111]"
                />
                <Search className="w-3.5 h-3.5 text-[#8A8A86] absolute left-3 top-1/2 -translate-y-1/2" />
              </form>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-[#FAF9F7] border border-[#E7E7E5] text-xs text-[#111111] focus:outline-none focus:border-[#111111] cursor-pointer"
                aria-label="Sort wallpaper items"
              >
                <option value="newest">Latest Added</option>
                <option value="name-asc">Alphabetical (A - Z)</option>
                <option value="name-desc">Alphabetical (Z - A)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid View */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingState message="Querying showroom wallpaper database..." />
          ) : error ? (
            <ErrorState message={error} onRetry={loadProducts} />
          ) : products.length === 0 ? (
            <EmptyState
              title="No wallpaper products have been added yet."
              description="Catalog items registered through the showroom admin interface will appear here automatically with full specifications."
              actionText="Reload Showroom Catalog"
              onAction={loadProducts}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((item) => (
                <article
                  key={item._id}
                  className="group border border-[#E7E7E5] bg-[#FFFFFF] flex flex-col justify-between hover:border-[#111111] transition-all duration-300"
                >
                  <Link to={`/products/${item._id}`} className="block relative aspect-[4/3] bg-[#FAF9F7] overflow-hidden">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#8A8A86] uppercase tracking-widest">
                        Image Pending
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-[#FFFFFF]/90 backdrop-blur-sm px-2 py-0.5 text-[10px] tracking-widest uppercase font-mono text-[#111111]">
                      {item.category}
                    </span>
                  </Link>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif-display text-xl text-[#111111] group-hover:text-[#252525]">
                        <Link to={`/products/${item._id}`}>
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-[#8A8A86] line-clamp-2 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                      {item.specifications && (
                        <p className="text-[11px] text-[#252525] mt-3 font-mono">
                          Specs: {item.specifications}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#FAF9F7] flex items-center justify-between">
                      <span className="text-[11px] text-[#8A8A86] uppercase tracking-wider">
                        {item.availability || 'Available on Request'}
                      </span>
                      <Link
                        to={`/products/${item._id}`}
                        className="inline-flex items-center space-x-1 text-xs uppercase tracking-widest font-medium text-[#111111] group-hover:underline underline-offset-4"
                      >
                        <span>Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
