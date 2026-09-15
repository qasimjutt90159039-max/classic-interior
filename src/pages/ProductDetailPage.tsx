import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, CheckCircle, Share2, Layers, ArrowUpRight } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { Product, BUSINESS_INFO } from '../types';
import { LoadingState } from '../components/StateViews';
import { InquiryForm } from '../components/InquiryForm';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setSelectedImageIndex(0);
      })
      .catch((err) => {
        setError(err.message || 'Product not found in showroom inventory.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-[120px] bg-[#FFFFFF]">
        <LoadingState message="Retrieving material specifications..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-[120px] pb-24 px-6 flex flex-col items-center justify-center text-center bg-[#FFFFFF]">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block mb-2 font-mono">
          404 • RECORD UNRESOLVED
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl text-[#111111] mb-4">
          Material Record Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#8A8A86] max-w-md mx-auto mb-8 leading-relaxed">
          The requested wallpaper or wall panel identifier does not correspond to an active showroom record.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/wallpaper"
            className="px-6 py-3 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest hover:bg-[#252525] transition-colors"
          >
            Return to Wallpaper Catalog
          </Link>
          <Link
            to="/"
            className="px-6 py-3 border border-[#E7E7E5] text-[#111111] text-xs uppercase tracking-widest hover:bg-[#FAF9F7] transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [];
  const currentImage = images[selectedImageIndex] || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80';

  return (
    <div id="product-detail-page" className="min-h-screen pt-[72px] bg-[#FFFFFF]">
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-[#E7E7E5] py-4 px-6 sm:px-8 bg-[#FAF9F7]/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <Link
            to="/wallpaper"
            className="inline-flex items-center space-x-2 text-[#8A8A86] hover:text-[#111111] transition-colors uppercase tracking-wider text-[11px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Wallpaper Catalog</span>
          </Link>
          <span className="text-[11px] font-mono text-[#8A8A86] uppercase hidden sm:inline-block">
            Item ID: {product._id}
          </span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="py-12 sm:py-16 px-6 sm:px-8 border-b border-[#E7E7E5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Imagery Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Primary Image Stage */}
              <div className="relative aspect-[4/3] bg-[#FAF9F7] border border-[#E7E7E5] overflow-hidden">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-sm px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#111111] border border-[#E7E7E5]">
                  {product.category}
                </span>
              </div>

              {/* Thumbnails (if multiple images exist) */}
              {images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 shrink-0 border overflow-hidden transition-all ${
                        selectedImageIndex === idx ? 'border-[#111111] opacity-100' : 'border-[#E7E7E5] opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Select product image ${idx + 1}`}
                    >
                      <img src={imgUrl} alt={`${product.name} swatch ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Specifications & Inquiries */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block font-mono mb-2">
                    {product.category}
                  </span>
                  <h1 className="font-serif-display text-3xl sm:text-4xl text-[#111111] leading-tight">
                    {product.name}
                  </h1>
                </div>

                <div className="pt-2 pb-4 border-y border-[#E7E7E5]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-widest text-[#8A8A86]">Availability Status</span>
                    <span className="font-medium text-[#111111]">
                      {product.availability || 'Available on Request'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#8A8A86] mb-2 font-medium">
                    Material & Surface Overview
                  </h3>
                  <p className="text-sm text-[#252525] leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                {product.specifications && (
                  <div className="p-4 bg-[#FAF9F7] border border-[#E7E7E5] space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#8A8A86] block">
                      Supplied Specifications
                    </span>
                    <p className="text-xs text-[#111111] font-mono leading-relaxed">
                      {product.specifications}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3">
                <button
                  type="button"
                  id="ask-about-product-btn"
                  onClick={() => setShowInquiryForm(!showInquiryForm)}
                  className="w-full py-3.5 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium hover:bg-[#252525] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{showInquiryForm ? 'Hide Inquiry Form' : 'Ask About This Product'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={BUSINESS_INFO.phoneRaw}
                  className="w-full py-3.5 border border-[#111111] text-[#111111] text-xs uppercase tracking-widest font-medium hover:bg-[#FAF9F7] transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Showroom ({BUSINESS_INFO.phone})</span>
                </a>

                <p className="text-[11px] text-[#8A8A86] text-center pt-2">
                  Visit 15 MAIN Beadon Rd, Lahore to examine actual physical roll textures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Prefilled Inquiry Section */}
      {showInquiryForm && (
        <section id="product-inquiry-section" className="py-16 px-6 sm:px-8 bg-[#FAF9F7] border-b border-[#E7E7E5] animate-in fade-in duration-300">
          <div className="max-w-3xl mx-auto">
            <InquiryForm
              initialType="Wallpaper"
              initialProductId={product._id}
              initialProductName={product.name}
              onSuccess={() => {}}
            />
          </div>
        </section>
      )}
    </div>
  );
};
