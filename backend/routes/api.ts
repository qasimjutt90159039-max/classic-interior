import { Router, Request, Response, NextFunction } from 'express';
import { connectDB, getIsMongoConnected, localStore } from '../db';
import { ProductModel } from '../models/Product';
import { CollectionModel } from '../models/Collection';
import { GalleryModel } from '../models/Gallery';
import { InquiryModel } from '../models/Inquiry';

export const apiRouter = Router();

// Middleware: Admin auth check
const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'classic_admin_2026';

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const queryToken = req.query.token as string;

  if ((token && token === ADMIN_SECRET) || (queryToken && queryToken === ADMIN_SECRET)) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Admin secret key required' });
}

// ----------------------------------------------------
// STATUS & AUTH
// ----------------------------------------------------
apiRouter.get('/status', async (_req: Request, res: Response) => {
  const isMongo = getIsMongoConnected();
  res.json({
    status: 'operational',
    storageMode: isMongo ? 'MongoDB' : 'Persistent Storage Engine',
    business: 'CLASSIC INTERIOR | BEDROOM WALLPAPER | INTERIOR DESIGN | WALLPAPER PANELS',
    location: '15 MAIN Beadon Rd, RODE, Lahore, 42000, Pakistan',
    phone: '+92 320 5555899',
  });
});

apiRouter.post('/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  if (password === ADMIN_SECRET) {
    return res.json({ success: true, token: ADMIN_SECRET, message: 'Authentication successful' });
  }
  return res.status(401).json({ error: 'Invalid password' });
});

apiRouter.post('/admin/seed-sample', requireAdmin, async (_req: Request, res: Response) => {
  if (getIsMongoConnected()) {
    // Seed MongoDB
    const sample = localStore.seedSamples();
    for (const p of sample.products) {
      await (ProductModel as any).findOneAndUpdate({ name: p.name }, p, { upsert: true });
    }
    for (const c of sample.collections) {
      await (CollectionModel as any).findOneAndUpdate({ name: c.name }, c, { upsert: true });
    }
    for (const g of sample.gallery) {
      await (GalleryModel as any).findOneAndUpdate({ title: g.title }, g, { upsert: true });
    }
    return res.json({ success: true, message: 'Sample showroom items initialized in MongoDB' });
  } else {
    const data = localStore.seedSamples();
    return res.json({ success: true, message: 'Sample showroom items initialized in database', counts: { products: data.products.length, collections: data.collections.length, gallery: data.gallery.length } });
  }
});

apiRouter.post('/admin/reset', requireAdmin, async (_req: Request, res: Response) => {
  if (getIsMongoConnected()) {
    await ProductModel.deleteMany({});
    await CollectionModel.deleteMany({});
    await GalleryModel.deleteMany({});
  } else {
    localStore.resetData();
  }
  return res.json({ success: true, message: 'All products, collections, and gallery items cleared to verify empty state' });
});

// ----------------------------------------------------
// PRODUCTS API
// ----------------------------------------------------
apiRouter.get('/products', async (req: Request, res: Response) => {
  try {
    const { category, search, sort } = req.query;

    if (getIsMongoConnected()) {
      const filter: any = {};
      if (category && category !== 'All') {
        filter.category = category;
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }
      let query = ProductModel.find(filter);
      if (sort === 'name-asc') query = query.sort({ name: 1 });
      else if (sort === 'name-desc') query = query.sort({ name: -1 });
      else query = query.sort({ createdAt: -1 });

      const products = await query.exec();
      return res.json({ success: true, data: products });
    }

    // Local persistent engine
    let products = [...localStore.getProducts()];
    if (category && category !== 'All') {
      products = products.filter(p => p.category === category);
    }
    if (search) {
      const s = String(search).toLowerCase();
      products = products.filter(p =>
        (p.name && p.name.toLowerCase().includes(s)) ||
        (p.description && p.description.toLowerCase().includes(s))
      );
    }
    if (sort === 'name-asc') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      products.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      products.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }

    return res.json({ success: true, data: products });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve products', details: err.message });
  }
});

apiRouter.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (getIsMongoConnected()) {
      const product = await (ProductModel as any).findById(id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      return res.json({ success: true, data: product });
    }

    const product = localStore.getProductById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.json({ success: true, data: product });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve product', details: err.message });
  }
});

apiRouter.post('/products', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, category, description, images, specifications, availability } = req.body;
    if (!name || !category || !description) {
      return res.status(400).json({ error: 'Name, category, and description are required' });
    }

    const payload = {
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      images: Array.isArray(images) ? images : images ? [images] : [],
      specifications: specifications || '',
      availability: availability || 'Available on Request',
    };

    if (getIsMongoConnected()) {
      const newProd = await (ProductModel as any).create(payload);
      return res.status(201).json({ success: true, data: newProd });
    }

    const newProd = localStore.saveProduct(payload);
    return res.status(201).json({ success: true, data: newProd });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
});

apiRouter.put('/products/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (getIsMongoConnected()) {
      const updated = await (ProductModel as any).findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) return res.status(404).json({ error: 'Product not found' });
      return res.json({ success: true, data: updated });
    }

    const existing = localStore.getProductById(id);
    if (!existing) return res.status(404).json({ error: 'Product not found' });
    const saved = localStore.saveProduct({ ...existing, ...updateData, _id: id });
    return res.json({ success: true, data: saved });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

apiRouter.delete('/products/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (getIsMongoConnected()) {
      const deleted = await (ProductModel as any).findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Product not found' });
      return res.json({ success: true, message: 'Product deleted successfully' });
    }

    const deleted = localStore.deleteProduct(id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});

// ----------------------------------------------------
// COLLECTIONS API
// ----------------------------------------------------
apiRouter.get('/collections', async (_req: Request, res: Response) => {
  try {
    if (getIsMongoConnected()) {
      const collections = await CollectionModel.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: collections });
    }
    const collections = localStore.getCollections();
    return res.json({ success: true, data: collections });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve collections', details: err.message });
  }
});

apiRouter.post('/collections', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, category, description, image } = req.body;
    if (!name || !category || !description || !image) {
      return res.status(400).json({ error: 'Name, category, description, and image URL are required' });
    }
    const payload = { name: name.trim(), category: category.trim(), description: description.trim(), image: image.trim() };

    if (getIsMongoConnected()) {
      const newCol = await CollectionModel.create(payload);
      return res.status(201).json({ success: true, data: newCol });
    }
    const newCol = localStore.saveCollection(payload);
    return res.status(201).json({ success: true, data: newCol });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to create collection', details: err.message });
  }
});

apiRouter.put('/collections/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (getIsMongoConnected()) {
      const updated = await (CollectionModel as any).findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ error: 'Collection not found' });
      return res.json({ success: true, data: updated });
    }
    const existing = localStore.getCollectionById(id);
    if (!existing) return res.status(404).json({ error: 'Collection not found' });
    const saved = localStore.saveCollection({ ...existing, ...req.body, _id: id });
    return res.json({ success: true, data: saved });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update collection', details: err.message });
  }
});

apiRouter.delete('/collections/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (getIsMongoConnected()) {
      const deleted = await (CollectionModel as any).findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Collection not found' });
      return res.json({ success: true, message: 'Collection deleted successfully' });
    }
    const deleted = localStore.deleteCollection(id);
    if (!deleted) return res.status(404).json({ error: 'Collection not found' });
    return res.json({ success: true, message: 'Collection deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete collection', details: err.message });
  }
});

// ----------------------------------------------------
// GALLERY API
// ----------------------------------------------------
apiRouter.get('/gallery', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    if (getIsMongoConnected()) {
      const filter: any = {};
      if (category && category !== 'All') filter.category = category;
      const items = await GalleryModel.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data: items });
    }

    let items = localStore.getGallery();
    if (category && category !== 'All') {
      items = items.filter(i => i.category === category);
    }
    return res.json({ success: true, data: items });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve gallery', details: err.message });
  }
});

apiRouter.post('/gallery', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { image, title, category, description } = req.body;
    if (!image || !title || !category) {
      return res.status(400).json({ error: 'Image URL, title, and category are required' });
    }
    const payload = { image: image.trim(), title: title.trim(), category: category.trim(), description: (description || '').trim() };

    if (getIsMongoConnected()) {
      const newItem = await GalleryModel.create(payload);
      return res.status(201).json({ success: true, data: newItem });
    }
    const newItem = localStore.saveGalleryItem(payload);
    return res.status(201).json({ success: true, data: newItem });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to create gallery item', details: err.message });
  }
});

apiRouter.put('/gallery/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (getIsMongoConnected()) {
      const updated = await (GalleryModel as any).findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ error: 'Gallery item not found' });
      return res.json({ success: true, data: updated });
    }
    const items = localStore.getGallery();
    const existing = items.find(i => i._id === id);
    if (!existing) return res.status(404).json({ error: 'Gallery item not found' });
    const saved = localStore.saveGalleryItem({ ...existing, ...req.body, _id: id });
    return res.json({ success: true, data: saved });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update gallery item', details: err.message });
  }
});

apiRouter.delete('/gallery/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (getIsMongoConnected()) {
      const deleted = await (GalleryModel as any).findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Gallery item not found' });
      return res.json({ success: true, message: 'Gallery item deleted successfully' });
    }
    const deleted = localStore.deleteGalleryItem(id);
    if (!deleted) return res.status(404).json({ error: 'Gallery item not found' });
    return res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete gallery item', details: err.message });
  }
});

// ----------------------------------------------------
// INQUIRIES API
// ----------------------------------------------------
apiRouter.post('/inquiries', async (req: Request, res: Response) => {
  try {
    const { name, phone, email, inquiryType, productId, productName, subject, message } = req.body;

    // Server-side validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ error: 'Subject is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const validTypes = ['Wallpaper', 'Wallpaper Panels', 'Interior Design', 'General Inquiry'];
    const sanitizedType = validTypes.includes(inquiryType) ? inquiryType : 'General Inquiry';

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      inquiryType: sanitizedType,
      productId: productId || '',
      productName: productName || '',
      subject: subject.trim(),
      message: message.trim(),
      isRead: false,
    };

    if (getIsMongoConnected()) {
      const newInq = await InquiryModel.create(payload);
      return res.status(201).json({
        success: true,
        data: newInq,
        message: 'Inquiry received. Our showroom team in Lahore will review your request.'
      });
    }

    const saved = localStore.saveInquiry(payload);
    return res.status(201).json({
      success: true,
      data: saved,
      message: 'Inquiry received. Our showroom team in Lahore will review your request.'
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to submit inquiry', details: err.message });
  }
});

apiRouter.get('/inquiries', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { search, inquiryType, status } = req.query;

    if (getIsMongoConnected()) {
      const filter: any = {};
      if (inquiryType && inquiryType !== 'All') {
        filter.inquiryType = inquiryType;
      }
      if (status === 'unread') {
        filter.isRead = false;
      } else if (status === 'read') {
        filter.isRead = true;
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { subject: { $regex: search, $options: 'i' } },
          { message: { $regex: search, $options: 'i' } },
        ];
      }
      const list = await InquiryModel.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data: list });
    }

    let list = [...localStore.getInquiries()];
    if (inquiryType && inquiryType !== 'All') {
      list = list.filter(i => i.inquiryType === inquiryType);
    }
    if (status === 'unread') {
      list = list.filter(i => !i.isRead);
    } else if (status === 'read') {
      list = list.filter(i => i.isRead);
    }
    if (search) {
      const s = String(search).toLowerCase();
      list = list.filter(i =>
        i.name?.toLowerCase().includes(s) ||
        i.phone?.toLowerCase().includes(s) ||
        i.subject?.toLowerCase().includes(s) ||
        i.message?.toLowerCase().includes(s)
      );
    }
    return res.json({ success: true, data: list });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve inquiries', details: err.message });
  }
});

apiRouter.put('/inquiries/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (getIsMongoConnected()) {
      const updated = await (InquiryModel as any).findByIdAndUpdate(id, { isRead: true }, { new: true });
      if (!updated) return res.status(404).json({ error: 'Inquiry not found' });
      return res.json({ success: true, data: updated });
    }
    const updated = localStore.markInquiryRead(id);
    if (!updated) return res.status(404).json({ error: 'Inquiry not found' });
    return res.json({ success: true, data: updated });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update inquiry', details: err.message });
  }
});

// Fallback for unmatched API routes
apiRouter.use('*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

