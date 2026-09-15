import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] pt-[140px] pb-24 px-6 flex flex-col items-center justify-center text-center bg-[#FFFFFF]">
      <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A8A86] block mb-2 font-mono">
        STATUS 404 • UNRESOLVED PATH
      </span>
      <h1 className="font-serif-display text-4xl sm:text-6xl text-[#111111] mb-4">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-[#8A8A86] max-w-md mx-auto mb-8 leading-relaxed">
        The showroom destination you navigated to does not exist or has been relocated.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest hover:bg-[#252525] transition-colors"
        >
          Return to Showroom Home
        </Link>
        <Link
          to="/wallpaper"
          className="px-6 py-3 border border-[#E7E7E5] text-[#111111] text-xs uppercase tracking-widest hover:bg-[#FAF9F7] transition-colors"
        >
          Explore Wallpaper Catalog
        </Link>
      </div>
    </div>
  );
};
