import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

let isMongoConnected = false;

export async function connectDB(): Promise<boolean> {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log('[Database] MONGODB_URI not provided. Running on resilient local persistence engine.');
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isMongoConnected = true;
    console.log('[Database] Connected to MongoDB successfully.');
    return true;
  } catch (error) {
    console.warn('[Database] MongoDB connection failed. Falling back to resilient local persistence store:', error);
    isMongoConnected = false;
    return false;
  }
}

export function getIsMongoConnected(): boolean {
  return isMongoConnected;
}

// Resilient local persistence store (used when MongoDB URI is not provided or fails to connect)
const DATA_FILE = path.join(process.cwd(), 'local-showroom-db.json');

interface LocalDBData {
  products: any[];
  collections: any[];
  gallery: any[];
  inquiries: any[];
}

function loadLocalData(): LocalDBData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading local db file:', e);
  }
  return { products: [], collections: [], gallery: [], inquiries: [] };
}

function saveLocalData(data: LocalDBData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving local db file:', e);
  }
}

export const localStore = {
  getProducts: () => loadLocalData().products,
  getProductById: (id: string) => loadLocalData().products.find(p => p._id === id),
  saveProduct: (product: any) => {
    const data = loadLocalData();
    const id = product._id || `prod_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newProduct = { ...product, _id: id, createdAt: product.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
    const index = data.products.findIndex(p => p._id === id);
    if (index >= 0) {
      data.products[index] = newProduct;
    } else {
      data.products.unshift(newProduct);
    }
    saveLocalData(data);
    return newProduct;
  },
  deleteProduct: (id: string) => {
    const data = loadLocalData();
    const exists = data.products.some(p => p._id === id);
    data.products = data.products.filter(p => p._id !== id);
    saveLocalData(data);
    return exists;
  },

  getCollections: () => loadLocalData().collections,
  getCollectionById: (id: string) => loadLocalData().collections.find(c => c._id === id),
  saveCollection: (col: any) => {
    const data = loadLocalData();
    const id = col._id || `col_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newCol = { ...col, _id: id, createdAt: col.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
    const index = data.collections.findIndex(c => c._id === id);
    if (index >= 0) {
      data.collections[index] = newCol;
    } else {
      data.collections.unshift(newCol);
    }
    saveLocalData(data);
    return newCol;
  },
  deleteCollection: (id: string) => {
    const data = loadLocalData();
    const exists = data.collections.some(c => c._id === id);
    data.collections = data.collections.filter(c => c._id !== id);
    saveLocalData(data);
    return exists;
  },

  getGallery: () => loadLocalData().gallery,
  saveGalleryItem: (item: any) => {
    const data = loadLocalData();
    const id = item._id || `gal_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newItem = { ...item, _id: id, createdAt: item.createdAt || new Date().toISOString() };
    const index = data.gallery.findIndex(g => g._id === id);
    if (index >= 0) {
      data.gallery[index] = newItem;
    } else {
      data.gallery.unshift(newItem);
    }
    saveLocalData(data);
    return newItem;
  },
  deleteGalleryItem: (id: string) => {
    const data = loadLocalData();
    const exists = data.gallery.some(g => g._id === id);
    data.gallery = data.gallery.filter(g => g._id !== id);
    saveLocalData(data);
    return exists;
  },

  getInquiries: () => loadLocalData().inquiries,
  saveInquiry: (inq: any) => {
    const data = loadLocalData();
    const id = inq._id || `inq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newInq = { ...inq, _id: id, isRead: false, createdAt: new Date().toISOString() };
    data.inquiries.unshift(newInq);
    saveLocalData(data);
    return newInq;
  },
  markInquiryRead: (id: string) => {
    const data = loadLocalData();
    const item = data.inquiries.find(i => i._id === id);
    if (item) {
      item.isRead = true;
      saveLocalData(data);
      return item;
    }
    return null;
  },
  seedSamples: () => {
    const data = loadLocalData();
    // Only seed if empty or requested
    data.products = [
      {
        _id: 'prod-1',
        name: 'Raw Linen Weave Wallpaper',
        category: 'Bedroom Wallpaper',
        description: 'Textured fabric-effect wall covering designed for serene bedroom suites. Provides acoustic warmth and a tactile surface finish.',
        images: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
        ],
        specifications: 'Woven non-woven substrate, matte low-reflective coating',
        availability: 'Available on Showroom Order',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'prod-2',
        name: 'Fluted Architectural Wall Panels',
        category: 'Decorative Wallpaper',
        description: 'Vertical linear fluted panels offering architectural rhythm and dimension to master bedroom feature walls.',
        images: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
        ],
        specifications: 'Precision engineered lightweight surface panels',
        availability: 'Available on Order',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'prod-3',
        name: 'Minimalist Botanical Monolith',
        category: 'Patterned Wallpaper',
        description: 'Muted tone-on-tone botanical silhouette wallpaper with subtle organic curves suited for residential accent walls.',
        images: [
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
        ],
        specifications: 'Washable surface, breathable substrate',
        availability: 'Showroom Catalog Sample',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'prod-4',
        name: 'Venetian Plaster Effect Surface',
        category: 'Modern Wallpaper',
        description: 'Soft-toned polished mineral textured wallpaper emulating traditional artisanal lime plaster finishes.',
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        ],
        specifications: 'Heavyweight vinyl on fleece backing',
        availability: 'Available on Order',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    data.collections = [
      {
        _id: 'col-1',
        name: 'Bedroom Serenity Series',
        category: 'Bedroom Wallpaper',
        description: 'Quiet textural wall coverings crafted specifically for bedroom sanctuaries.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'col-2',
        name: 'Architectural Feature Panels',
        category: 'Wallpaper Panels',
        description: 'Modular geometric and slatted relief wall systems for focal installations.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'col-3',
        name: 'Tactile Mineral Textures',
        category: 'Modern Wallpaper',
        description: 'Subtle plaster, limestone, and stone-inspired surfaces for clean interior walls.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    data.gallery = [
      {
        _id: 'gal-1',
        title: 'Master Bedroom Wall Composition',
        category: 'Bedroom Walls',
        description: 'Textural wallpaper application behind headboard with soft ambient perimeter illumination.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'gal-2',
        title: 'Linear Wall Paneling Concept',
        category: 'Decorative Wall Panels',
        description: 'Full-height vertical fluted accent wall bringing structural definition to residential spaces.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'gal-3',
        title: 'Tactile Mineral Surface Detail',
        category: 'Textures & Surfaces',
        description: 'Close-up macro study of fine plaster grain wallpaper and light reflection.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'gal-4',
        title: 'Neutral Living Room Feature Wall',
        category: 'Feature Walls',
        description: 'Clean stone-effect wallpaper paneling establishing warm minimalist zoning.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        createdAt: new Date().toISOString()
      }
    ];

    saveLocalData(data);
    return data;
  },
  resetData: () => {
    const empty = { products: [], collections: [], gallery: [], inquiries: [] };
    saveLocalData(empty);
    return empty;
  }
};
