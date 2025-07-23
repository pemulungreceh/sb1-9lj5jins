export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  genre: string;
  isbn: string;
  description: string;
  pages: number;
  language: string;
  publishedDate: string;
  inStock: boolean;
  stockCount: number;
  vendorId: string;
  vendorName: string;
  vendorLocation: string;
  isFeatured?: boolean;
  isOnSale?: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  description: string;
  totalProducts: number;
  joinedDate: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  bookCount: number;
}