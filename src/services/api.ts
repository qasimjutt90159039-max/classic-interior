import { Product, Collection, GalleryItem, Inquiry } from '../types';

const BASE_URL = '/api';

export async function fetchProducts(params?: { category?: string; search?: string; sort?: string }): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.category && params.category !== 'All') query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.sort) query.append('sort', params.sort);

  const res = await fetch(`${BASE_URL}/products?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  return json.data || [];
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  const json = await res.json();
  return json.data;
}

export async function createProductApi(data: Partial<Product>, token: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to create product');
  return json.data;
}

export async function updateProductApi(id: string, data: Partial<Product>, token: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to update product');
  return json.data;
}

export async function deleteProductApi(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error || 'Failed to delete product');
  }
}

export async function fetchCollections(): Promise<Collection[]> {
  const res = await fetch(`${BASE_URL}/collections`);
  if (!res.ok) throw new Error('Failed to fetch collections');
  const json = await res.json();
  return json.data || [];
}

export async function createCollectionApi(data: Partial<Collection>, token: string): Promise<Collection> {
  const res = await fetch(`${BASE_URL}/collections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to create collection');
  return json.data;
}

export async function updateCollectionApi(id: string, data: Partial<Collection>, token: string): Promise<Collection> {
  const res = await fetch(`${BASE_URL}/collections/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to update collection');
  return json.data;
}

export async function deleteCollectionApi(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/collections/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error || 'Failed to delete collection');
  }
}

export async function fetchGallery(category?: string): Promise<GalleryItem[]> {
  const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
  const res = await fetch(`${BASE_URL}/gallery${query}`);
  if (!res.ok) throw new Error('Failed to fetch gallery');
  const json = await res.json();
  return json.data || [];
}

export async function createGalleryApi(data: Partial<GalleryItem>, token: string): Promise<GalleryItem> {
  const res = await fetch(`${BASE_URL}/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to create gallery item');
  return json.data;
}

export async function updateGalleryApi(id: string, data: Partial<GalleryItem>, token: string): Promise<GalleryItem> {
  const res = await fetch(`${BASE_URL}/gallery/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to update gallery item');
  return json.data;
}

export async function deleteGalleryApi(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/gallery/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error || 'Failed to delete gallery item');
  }
}

export async function submitInquiryApi(data: Partial<Inquiry>): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${BASE_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to submit inquiry');
  return json;
}

export async function fetchInquiriesApi(params: { search?: string; inquiryType?: string; status?: string }, token: string): Promise<Inquiry[]> {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.inquiryType && params.inquiryType !== 'All') query.append('inquiryType', params.inquiryType);
  if (params.status && params.status !== 'All') query.append('status', params.status);

  const res = await fetch(`${BASE_URL}/inquiries?${query.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to fetch inquiries');
  return json.data || [];
}

export async function markInquiryReadApi(id: string, token: string): Promise<Inquiry> {
  const res = await fetch(`${BASE_URL}/inquiries/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to mark as read');
  return json.data;
}

export async function adminLoginApi(password: string): Promise<{ token: string }> {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Login failed');
  return { token: json.token };
}

export async function seedSampleApi(token: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/admin/seed-sample`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to seed sample items');
  return json;
}

export async function resetDataApi(token: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/admin/reset`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to reset data');
  return json;
}

export async function fetchStatusApi(): Promise<any> {
  const res = await fetch(`${BASE_URL}/status`);
  if (!res.ok) return null;
  return res.json();
}
