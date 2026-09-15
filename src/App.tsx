import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WallpaperPage } from './pages/WallpaperPage';
import { WallpaperPanelsPage } from './pages/WallpaperPanelsPage';
import { InteriorDesignPage } from './pages/InteriorDesignPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#FFFFFF] text-[#111111] antialiased selection:bg-[#111111] selection:text-[#FFFFFF]">
        <ScrollToTop />
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/wallpaper" element={<WallpaperPage />} />
            <Route path="/wallpaper-panels" element={<WallpaperPanelsPage />} />
            <Route path="/interior-design" element={<InteriorDesignPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
