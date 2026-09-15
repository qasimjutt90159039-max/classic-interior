export interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  specifications?: string;
  availability?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Collection {
  _id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItem {
  _id: string;
  image: string;
  title: string;
  category: string;
  description?: string;
  createdAt?: string;
}

export interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  inquiryType: 'Wallpaper' | 'Wallpaper Panels' | 'Interior Design' | 'General Inquiry';
  productId?: string;
  productName?: string;
  subject: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface BusinessInfo {
  name: string;
  category: string;
  phone: string;
  phoneRaw: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  mapQuery: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: 'CLASSIC INTERIOR | BEDROOM WALLPAPER | INTERIOR DESIGN | WALLPAPER PANELS',
  category: 'Interior Designer',
  phone: '+92 320 5555899',
  phoneRaw: 'tel:+923205555899',
  address: '15 MAIN Beadon Rd, RODE, Lahore, 42000, Pakistan',
  city: 'Lahore',
  country: 'Pakistan',
  postalCode: '42000',
  mapQuery: '15+MAIN+Beadon+Rd+RODE+Lahore+42000+Pakistan'
};
