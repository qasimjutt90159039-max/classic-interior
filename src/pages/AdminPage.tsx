import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Database,
  Search,
  Check,
  RefreshCw,
  FolderPlus,
  Image as ImageIcon,
  MessageSquare,
  Package
} from 'lucide-react';
import {
  adminLoginApi,
  fetchProducts,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  fetchCollections,
  createCollectionApi,
  updateCollectionApi,
  deleteCollectionApi,
  fetchGallery,
  createGalleryApi,
  updateGalleryApi,
  deleteGalleryApi,
  fetchInquiriesApi,
  markInquiryReadApi,
  seedSampleApi,
  resetDataApi,
  fetchStatusApi,
} from '../services/api';
import { Product, Collection, GalleryItem, Inquiry } from '../types';

export const AdminPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('classic_admin_token'));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Tab: 'products' | 'collections' | 'gallery' | 'inquiries' | 'database'
  const [activeTab, setActiveTab] = useState<'products' | 'collections' | 'gallery' | 'inquiries' | 'database'>('products');

  // Status Info
  const [serverStatus, setServerStatus] = useState<any>(null);

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState('All');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');

  // Action status feedback
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Modal / Form states for creation/editing
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Bedroom Wallpaper',
    description: '',
    imagesText: '',
    specifications: '',
    availability: 'Available on Request',
  });

  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [collectionForm, setCollectionForm] = useState({
    name: '',
    category: 'Bedroom Wallpaper',
    description: '',
    image: '',
  });

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Bedroom Walls',
    description: '',
    image: '',
  });

  const clearMessages = () => {
    setActionSuccess(null);
    setActionError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await adminLoginApi(password);
      setToken(res.token);
      localStorage.setItem('classic_admin_token', res.token);
      setPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid administrator password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('classic_admin_token');
  };

  const loadAllData = () => {
    if (!token) return;
    fetchStatusApi().then(setServerStatus).catch(() => {});
    fetchProducts().then(setProducts).catch(() => {});
    fetchCollections().then(setCollections).catch(() => {});
    fetchGallery().then(setGallery).catch(() => {});
    fetchInquiriesApi({ search: inquirySearch, inquiryType: inquiryTypeFilter, status: inquiryStatusFilter }, token)
      .then(setInquiries)
      .catch(() => {});
  };

  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token, inquiryTypeFilter, inquiryStatusFilter]);

  // Product CRUD
  const openNewProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Bedroom Wallpaper',
      description: '',
      imagesText: '',
      specifications: '',
      availability: 'Available on Request',
    });
    setShowProductModal(true);
    clearMessages();
  };

  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      category: p.category,
      description: p.description,
      imagesText: (p.images || []).join('\n'),
      specifications: p.specifications || '',
      availability: p.availability || 'Available on Request',
    });
    setShowProductModal(true);
    clearMessages();
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    clearMessages();

    const imageUrls = productForm.imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name: productForm.name,
      category: productForm.category,
      description: productForm.description,
      images: imageUrls,
      specifications: productForm.specifications,
      availability: productForm.availability,
    };

    try {
      if (editingProduct) {
        await updateProductApi(editingProduct._id, payload, token);
        setActionSuccess(`Updated product "${productForm.name}"`);
      } else {
        await createProductApi(payload, token);
        setActionSuccess(`Created product "${productForm.name}"`);
      }
      setShowProductModal(false);
      fetchProducts().then(setProducts);
    } catch (err: any) {
      setActionError(err.message || 'Error saving product');
    }
  };

  const deleteProduct = async (id: string, name: string) => {
    if (!token) return;
    if (!window.confirm(`Delete product "${name}"?`)) return;
    clearMessages();
    try {
      await deleteProductApi(id, token);
      setActionSuccess(`Deleted "${name}"`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err: any) {
      setActionError(err.message || 'Error deleting product');
    }
  };

  // Collection CRUD
  const openNewCollection = () => {
    setEditingCollection(null);
    setCollectionForm({ name: '', category: 'Bedroom Wallpaper', description: '', image: '' });
    setShowCollectionModal(true);
    clearMessages();
  };

  const openEditCollection = (c: Collection) => {
    setEditingCollection(c);
    setCollectionForm({ name: c.name, category: c.category, description: c.description, image: c.image });
    setShowCollectionModal(true);
    clearMessages();
  };

  const saveCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    clearMessages();

    try {
      if (editingCollection) {
        await updateCollectionApi(editingCollection._id, collectionForm, token);
        setActionSuccess(`Updated collection "${collectionForm.name}"`);
      } else {
        await createCollectionApi(collectionForm, token);
        setActionSuccess(`Created collection "${collectionForm.name}"`);
      }
      setShowCollectionModal(false);
      fetchCollections().then(setCollections);
    } catch (err: any) {
      setActionError(err.message || 'Error saving collection');
    }
  };

  const deleteCollection = async (id: string, name: string) => {
    if (!token) return;
    if (!window.confirm(`Delete collection "${name}"?`)) return;
    clearMessages();
    try {
      await deleteCollectionApi(id, token);
      setActionSuccess(`Deleted collection "${name}"`);
      setCollections(collections.filter((c) => c._id !== id));
    } catch (err: any) {
      setActionError(err.message || 'Error deleting collection');
    }
  };

  // Gallery CRUD
  const openNewGallery = () => {
    setEditingGallery(null);
    setGalleryForm({ title: '', category: 'Bedroom Walls', description: '', image: '' });
    setShowGalleryModal(true);
    clearMessages();
  };

  const openEditGallery = (g: GalleryItem) => {
    setEditingGallery(g);
    setGalleryForm({ title: g.title, category: g.category, description: g.description || '', image: g.image });
    setShowGalleryModal(true);
    clearMessages();
  };

  const saveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    clearMessages();

    try {
      if (editingGallery) {
        await updateGalleryApi(editingGallery._id, galleryForm, token);
        setActionSuccess(`Updated gallery study "${galleryForm.title}"`);
      } else {
        await createGalleryApi(galleryForm, token);
        setActionSuccess(`Created gallery study "${galleryForm.title}"`);
      }
      setShowGalleryModal(false);
      fetchGallery().then(setGallery);
    } catch (err: any) {
      setActionError(err.message || 'Error saving gallery item');
    }
  };

  const deleteGallery = async (id: string, title: string) => {
    if (!token) return;
    if (!window.confirm(`Delete gallery item "${title}"?`)) return;
    clearMessages();
    try {
      await deleteGalleryApi(id, token);
      setActionSuccess(`Deleted "${title}"`);
      setGallery(gallery.filter((g) => g._id !== id));
    } catch (err: any) {
      setActionError(err.message || 'Error deleting gallery item');
    }
  };

  // Inquiries
  const handleMarkInquiryRead = async (id: string) => {
    if (!token) return;
    try {
      const updated = await markInquiryReadApi(id, token);
      setInquiries(inquiries.map((i) => (i._id === id ? { ...i, isRead: true } : i)));
      setActionSuccess('Inquiry status updated to Read');
    } catch (err: any) {
      setActionError(err.message || 'Error updating inquiry');
    }
  };

  // Seed & Reset
  const handleSeedSamples = async () => {
    if (!token) return;
    clearMessages();
    try {
      await seedSampleApi(token);
      setActionSuccess('Sample showroom catalog items initialized.');
      loadAllData();
    } catch (err: any) {
      setActionError(err.message || 'Failed to seed sample items');
    }
  };

  const handleResetData = async () => {
    if (!token) return;
    if (!window.confirm('Reset/Clear showroom items? This verifies empty state behavior.')) return;
    clearMessages();
    try {
      await resetDataApi(token);
      setActionSuccess('Showroom records reset. Empty states can now be verified on public pages.');
      loadAllData();
    } catch (err: any) {
      setActionError(err.message || 'Failed to reset records');
    }
  };

  // Login Screen if not authenticated
  if (!token) {
    return (
      <div id="admin-login-screen" className="min-h-screen pt-[100px] pb-24 px-6 flex items-center justify-center bg-[#FAF9F7]">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E7E7E5] p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-10 h-10 bg-[#111111] text-[#FFFFFF] rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A8A86]">
              AUTHENTICATION GATEWAY
            </span>
            <h1 className="font-serif-display text-2xl text-[#111111] mt-1">
              Showroom Admin Portal
            </h1>
            <p className="text-xs text-[#8A8A86] mt-1">
              Enter the administrator secret key to manage products, collections, gallery imagery, and inquiries.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-xs text-red-800 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-[#8A8A86] mb-1">
                Admin Secret Key
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password (default: classic_admin_2026)"
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E7E7E5] text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              />
              <span className="text-[10px] text-[#8A8A86] mt-1 block font-mono">
                Key configured in .env (classic_admin_2026)
              </span>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium hover:bg-[#252525] transition-colors cursor-pointer"
            >
              {loginLoading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-dashboard-page" className="min-h-screen pt-[72px] bg-[#FAF9F7] text-[#111111]">
      {/* Top Admin Navigation Header */}
      <section className="bg-[#FFFFFF] border-b border-[#E7E7E5] py-6 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-mono text-[11px] text-[#8A8A86] uppercase tracking-wider">
                Authorized Session Active
              </span>
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl text-[#111111] mt-0.5">
              Classic Interior Management
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-4 py-2 border border-[#E7E7E5] text-xs uppercase tracking-wider text-[#8A8A86] hover:text-[#111111] hover:bg-[#FAF9F7] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Action Notifications */}
      {actionSuccess && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-6">
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess(null)} className="text-emerald-700 hover:text-emerald-900 font-bold">✕</button>
          </div>
        </div>
      )}

      {actionError && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-6">
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{actionError}</span>
            </div>
            <button onClick={() => setActionError(null)} className="text-red-700 hover:text-red-900 font-bold">✕</button>
          </div>
        </div>
      )}

      {/* Dashboard Tabs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8">
        <div className="flex space-x-2 border-b border-[#E7E7E5] overflow-x-auto pb-px">
          {[
            { key: 'products', label: 'Products', count: products.length, icon: Package },
            { key: 'collections', label: 'Collections', count: collections.length, icon: FolderPlus },
            { key: 'gallery', label: 'Gallery Studies', count: gallery.length, icon: ImageIcon },
            { key: 'inquiries', label: 'Inquiries', count: inquiries.length, icon: MessageSquare },
            { key: 'database', label: 'System & Seeding', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any);
                  clearMessages();
                }}
                className={`flex items-center space-x-2 px-5 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'border-[#111111] text-[#111111] bg-[#FFFFFF]'
                    : 'border-transparent text-[#8A8A86] hover:text-[#111111]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.2 bg-[#FAF9F7] text-[10px] font-mono border border-[#E7E7E5]">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        {/* TAB 1: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-display text-xl text-[#111111]">Wallpaper & Material Catalog</h2>
                <p className="text-xs text-[#8A8A86]">Manage products displayed on the Wallpaper and Product Details pages.</p>
              </div>
              <button
                onClick={openNewProduct}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-wider hover:bg-[#252525] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {products.length === 0 ? (
              <div className="p-12 border border-dashed border-[#E7E7E5] bg-[#FFFFFF] text-center text-xs text-[#8A8A86]">
                No products in the database. Use "Add Product" or initialize sample showroom items in the System tab.
              </div>
            ) : (
              <div className="bg-[#FFFFFF] border border-[#E7E7E5] overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF9F7] border-b border-[#E7E7E5] text-[10px] uppercase font-mono tracking-wider text-[#8A8A86]">
                      <th className="p-3.5">Image</th>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Availability</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E7E5]">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-[#FAF9F7]/50">
                        <td className="p-3.5">
                          <div className="w-12 h-12 bg-[#E7E7E5] overflow-hidden border border-[#E7E7E5]">
                            {p.images && p.images[0] ? (
                              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                            ) : null}
                          </div>
                        </td>
                        <td className="p-3.5 font-medium text-[#111111] max-w-xs">{p.name}</td>
                        <td className="p-3.5 font-mono text-[#8A8A86] text-[11px]">{p.category}</td>
                        <td className="p-3.5 text-[#252525]">{p.availability || 'Available on Request'}</td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => openEditProduct(p)}
                            className="p-1.5 text-[#8A8A86] hover:text-[#111111]"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p._id, p.name)}
                            className="p-1.5 text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COLLECTIONS */}
        {activeTab === 'collections' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-display text-xl text-[#111111]">Material Collections</h2>
                <p className="text-xs text-[#8A8A86]">Curated suites displayed on the Collections page.</p>
              </div>
              <button
                onClick={openNewCollection}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-wider hover:bg-[#252525] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Collection</span>
              </button>
            </div>

            {collections.length === 0 ? (
              <div className="p-12 border border-dashed border-[#E7E7E5] bg-[#FFFFFF] text-center text-xs text-[#8A8A86]">
                No collections registered.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collections.map((c) => (
                  <div key={c._id} className="p-6 bg-[#FFFFFF] border border-[#E7E7E5] flex space-x-4">
                    <div className="w-24 h-24 bg-[#FAF9F7] overflow-hidden border border-[#E7E7E5] shrink-0">
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#8A8A86]">{c.category}</span>
                        <h3 className="font-serif-display text-lg text-[#111111] mt-0.5">{c.name}</h3>
                        <p className="text-xs text-[#8A8A86] line-clamp-2 mt-1">{c.description}</p>
                      </div>
                      <div className="flex space-x-3 pt-3 border-t border-[#FAF9F7] text-xs">
                        <button onClick={() => openEditCollection(c)} className="text-[#111111] hover:underline">
                          Edit
                        </button>
                        <button onClick={() => deleteCollection(c._id, c.name)} className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-display text-xl text-[#111111]">Gallery Studies</h2>
                <p className="text-xs text-[#8A8A86]">High-resolution imagery displayed on the Gallery page.</p>
              </div>
              <button
                onClick={openNewGallery}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-wider hover:bg-[#252525] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Study</span>
              </button>
            </div>

            {gallery.length === 0 ? (
              <div className="p-12 border border-dashed border-[#E7E7E5] bg-[#FFFFFF] text-center text-xs text-[#8A8A86]">
                No gallery imagery.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {gallery.map((g) => (
                  <div key={g._id} className="bg-[#FFFFFF] border border-[#E7E7E5] overflow-hidden">
                    <div className="aspect-[4/3] bg-[#FAF9F7] overflow-hidden">
                      <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-mono text-[#8A8A86] uppercase block">{g.category}</span>
                      <h4 className="font-serif-display text-base text-[#111111] mt-0.5">{g.title}</h4>
                      <div className="mt-3 pt-2 border-t border-[#FAF9F7] flex justify-between text-xs">
                        <button onClick={() => openEditGallery(g)} className="text-[#111111] hover:underline">
                          Edit
                        </button>
                        <button onClick={() => deleteGallery(g._id, g.title)} className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-display text-xl text-[#111111]">Client & Showroom Inquiries</h2>
                <p className="text-xs text-[#8A8A86]">Inquiries received through the Contact & Product detail pages.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={inquiryTypeFilter}
                  onChange={(e) => setInquiryTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-[#FFFFFF] border border-[#E7E7E5] text-xs text-[#111111]"
                >
                  <option value="All">All Types</option>
                  <option value="Wallpaper">Wallpaper</option>
                  <option value="Wallpaper Panels">Wallpaper Panels</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>

                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#FFFFFF] border border-[#E7E7E5] text-xs text-[#111111]"
                >
                  <option value="All">All Statuses</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read Only</option>
                </select>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 border border-dashed border-[#E7E7E5] bg-[#FFFFFF] text-center text-xs text-[#8A8A86]">
                No inquiries matching the selected filters.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq._id}
                    className={`p-6 bg-[#FFFFFF] border transition-all ${
                      inq.isRead ? 'border-[#E7E7E5] opacity-80' : 'border-[#111111] shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-[#FAF9F7]">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${inq.isRead ? 'bg-[#8A8A86]' : 'bg-blue-600'}`}></span>
                          <span className="text-sm font-semibold text-[#111111]">{inq.name}</span>
                          <span className="text-xs text-[#8A8A86] font-mono">({inq.phone})</span>
                          {inq.email && <span className="text-xs text-[#8A8A86]">[{inq.email}]</span>}
                        </div>
                        <h4 className="font-serif-display text-base text-[#111111] mt-1">{inq.subject}</h4>
                      </div>

                      <div className="flex items-center space-x-3 text-xs">
                        <span className="px-2.5 py-0.5 bg-[#FAF9F7] border border-[#E7E7E5] font-mono text-[10px] uppercase">
                          {inq.inquiryType}
                        </span>
                        {!inq.isRead && (
                          <button
                            onClick={() => handleMarkInquiryRead(inq._id)}
                            className="text-xs font-medium text-blue-600 hover:underline flex items-center space-x-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Read</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 text-xs text-[#252525] leading-relaxed">
                      <p className="whitespace-pre-wrap">{inq.message}</p>
                    </div>

                    {inq.productId && (
                      <div className="mt-3 pt-2 border-t border-[#FAF9F7] text-[11px] text-[#8A8A86] font-mono">
                        Referenced Item ID: {inq.productId} {inq.productName ? `(${inq.productName})` : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: DATABASE & SYSTEM */}
        {activeTab === 'database' && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-[#FFFFFF] border border-[#E7E7E5] p-6 space-y-4">
              <h3 className="font-serif-display text-xl text-[#111111]">Database Status & Operations</h3>
              <div className="p-4 bg-[#FAF9F7] border border-[#E7E7E5] text-xs font-mono space-y-1">
                <p>Status: {serverStatus?.status || 'Active'}</p>
                <p>Engine: {serverStatus?.storageMode || 'Persistent Local Engine'}</p>
                <p>Location: 15 MAIN Beadon Rd, Lahore</p>
                <p>Telephone: +92 320 5555899</p>
              </div>

              <div className="pt-4 border-t border-[#E7E7E5] space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                  Showroom Verification Tools
                </h4>
                <p className="text-xs text-[#8A8A86]">
                  Use these controls to initialize standard showroom material records, or wipe the catalog clean to verify the required empty state handling across all pages.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleSeedSamples}
                    className="px-4 py-2.5 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-wider hover:bg-[#252525] transition-colors"
                  >
                    Seed Sample Showroom Items
                  </button>

                  <button
                    onClick={handleResetData}
                    className="px-4 py-2.5 border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 text-xs uppercase tracking-wider transition-colors"
                  >
                    Reset & Test Empty States
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E7E7E5] max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif-display text-xl text-[#111111] mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Wallpaper Product'}
            </h3>
            <form onSubmit={saveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Product Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Category *</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                >
                  <option value="Bedroom Wallpaper">Bedroom Wallpaper</option>
                  <option value="Decorative Wallpaper">Decorative Wallpaper</option>
                  <option value="Patterned Wallpaper">Patterned Wallpaper</option>
                  <option value="Modern Wallpaper">Modern Wallpaper</option>
                  <option value="Other Wallpaper">Other Wallpaper</option>
                  <option value="Wallpaper Panels">Wallpaper Panels</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">
                  Image URLs (One URL per line)
                </label>
                <textarea
                  rows={3}
                  value={productForm.imagesText}
                  onChange={(e) => setProductForm({ ...productForm, imagesText: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-[#E7E7E5] font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Specifications</label>
                <input
                  type="text"
                  value={productForm.specifications}
                  onChange={(e) => setProductForm({ ...productForm, specifications: e.target.value })}
                  placeholder="e.g. Washable vinyl, non-woven fleece"
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Availability</label>
                <input
                  type="text"
                  value={productForm.availability}
                  onChange={(e) => setProductForm({ ...productForm, availability: e.target.value })}
                  placeholder="e.g. Available on Request"
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 border border-[#E7E7E5] uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#111111] text-[#FFFFFF] uppercase tracking-wider hover:bg-[#252525]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Collection Modal */}
      {showCollectionModal && (
        <div className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E7E7E5] max-w-md w-full p-6">
            <h3 className="font-serif-display text-xl text-[#111111] mb-4">
              {editingCollection ? 'Edit Collection' : 'Add New Collection'}
            </h3>
            <form onSubmit={saveCollection} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Collection Name *</label>
                <input
                  type="text"
                  required
                  value={collectionForm.name}
                  onChange={(e) => setCollectionForm({ ...collectionForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Category *</label>
                <input
                  type="text"
                  required
                  value={collectionForm.category}
                  onChange={(e) => setCollectionForm({ ...collectionForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={collectionForm.description}
                  onChange={(e) => setCollectionForm({ ...collectionForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={collectionForm.image}
                  onChange={(e) => setCollectionForm({ ...collectionForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5] font-mono text-[11px]"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCollectionModal(false)}
                  className="px-4 py-2 border border-[#E7E7E5] uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#111111] text-[#FFFFFF] uppercase tracking-wider hover:bg-[#252525]"
                >
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E7E7E5] max-w-md w-full p-6">
            <h3 className="font-serif-display text-xl text-[#111111] mb-4">
              {editingGallery ? 'Edit Gallery Study' : 'Add Gallery Study'}
            </h3>
            <form onSubmit={saveGallery} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Title *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Category *</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                >
                  <option value="Bedroom Walls">Bedroom Walls</option>
                  <option value="Decorative Wall Panels">Decorative Wall Panels</option>
                  <option value="Textures & Surfaces">Textures & Surfaces</option>
                  <option value="Feature Walls">Feature Walls</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Image URL *</label>
                <input
                  type="url"
                  required
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5] font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">Description</label>
                <textarea
                  rows={2}
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E7E5]"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="px-4 py-2 border border-[#E7E7E5] uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#111111] text-[#FFFFFF] uppercase tracking-wider hover:bg-[#252525]"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
