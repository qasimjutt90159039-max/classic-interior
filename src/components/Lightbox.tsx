import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!currentItem) return null;

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between text-[#FAF9F7] text-xs max-w-7xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3">
          <span className="uppercase tracking-widest text-[10px] text-[#8A8A86]">
            {currentItem.category}
          </span>
          <span className="text-[#8A8A86]">•</span>
          <span className="tracking-widest">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          id="lightbox-close-btn"
          className="p-2 text-[#FAF9F7] hover:text-[#FFFFFF] transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onPrev}
          id="lightbox-prev-btn"
          className="absolute left-2 sm:-left-12 p-3 text-[#FAF9F7]/70 hover:text-[#FFFFFF] bg-[#111111]/40 sm:bg-transparent rounded-full transition-all focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="max-h-[75vh] overflow-hidden flex items-center justify-center">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-[75vh] max-w-full object-contain select-none"
          />
        </div>

        <button
          onClick={onNext}
          id="lightbox-next-btn"
          className="absolute right-2 sm:-right-12 p-3 text-[#FAF9F7]/70 hover:text-[#FFFFFF] bg-[#111111]/40 sm:bg-transparent rounded-full transition-all focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Caption footer */}
      <div
        className="max-w-7xl w-full mx-auto text-center sm:text-left flex flex-col sm:flex-row items-center justify-between text-[#FAF9F7] pt-3 border-t border-[#FAF9F7]/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h4 className="font-serif-display text-lg text-[#FFFFFF]">{currentItem.title}</h4>
          {currentItem.description && (
            <p className="text-xs text-[#8A8A86] mt-0.5 max-w-xl">{currentItem.description}</p>
          )}
        </div>
        <span className="text-[10px] text-[#8A8A86] uppercase tracking-wider mt-2 sm:mt-0">
          Studio Material Study • Lahore
        </span>
      </div>
    </div>
  );
};
