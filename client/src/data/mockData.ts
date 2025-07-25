import { Book, Vendor, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Fiction', icon: '📚', bookCount: 125 },
  { id: '2', name: 'Non-Fiction', icon: '📖', bookCount: 89 },
  { id: '3', name: 'Technology', icon: '💻', bookCount: 76 },
  { id: '4', name: 'Business', icon: '💼', bookCount: 52 },
  { id: '5', name: 'Science', icon: '🔬', bookCount: 43 },
  { id: '6', name: 'History', icon: '🏛️', bookCount: 38 },
  { id: '7', name: 'Biography', icon: '👤', bookCount: 29 },
  { id: '8', name: 'Self-Help', icon: '🌟', bookCount: 67 }
];

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Gramedia Bookstore',
    location: 'Jakarta Pusat',
    rating: 4.8,
    reviewCount: 1523,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    description: 'Toko buku terpercaya dengan koleksi lengkap',
    totalProducts: 2847,
    joinedDate: '2020-01-15'
  },
  {
    id: '2', 
    name: 'Mizan Publishing',
    location: 'Bandung',
    rating: 4.6,
    reviewCount: 892,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    description: 'Penerbit dan distributor buku berkualitas',
    totalProducts: 1456,
    joinedDate: '2021-03-22'
  }
];

export const books: Book[] = [
  {
    id: '1',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    publisher: 'Bentang Pustaka',
    price: 85000,
    originalPrice: 95000,
    discount: 10,
    rating: 4.7,
    reviewCount: 324,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    category: 'Fiction',
    genre: 'Novel',
    isbn: '978-979-062-171-3',
    description: 'Novel tentang perjuangan anak-anak Belitong dalam menuntut ilmu',
    pages: 529,
    language: 'Bahasa Indonesia',
    publishedDate: '2005-08-01',
    inStock: true,
    stockCount: 45,
    vendorId: '1',
    vendorName: 'Gramedia Bookstore',
    vendorLocation: 'Jakarta Pusat',
    isFeatured: true,
    isOnSale: true
  },
  {
    id: '2',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    publisher: 'Hasta Mitra',
    price: 95000,
    rating: 4.8,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    category: 'Fiction',
    genre: 'Historical Fiction',
    isbn: '978-979-106-123-4',
    description: 'Novel sejarah tentang kehidupan di masa kolonial Belanda',
    pages: 535,
    language: 'Bahasa Indonesia',
    publishedDate: '1980-01-01',
    inStock: true,
    stockCount: 32,
    vendorId: '1',
    vendorName: 'Gramedia Bookstore',
    vendorLocation: 'Jakarta Pusat',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Ayat-Ayat Cinta',
    author: 'Habiburrahman El Shirazy',
    publisher: 'Republika',
    price: 78000,
    originalPrice: 88000,
    discount: 11,
    rating: 4.5,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    category: 'Fiction',
    genre: 'Romance',
    isbn: '978-979-065-234-7',
    description: 'Novel roman dengan latar belakang pendidikan di Mesir',
    pages: 419,
    language: 'Bahasa Indonesia',
    publishedDate: '2004-02-01',
    inStock: true,
    stockCount: 28,
    vendorId: '2',
    vendorName: 'Mizan Publishing',
    vendorLocation: 'Bandung',
    isFeatured: true,
    isOnSale: true
  },
  {
    id: '4',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    publisher: 'Pearson',
    price: 450000,
    rating: 4.9,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=400&fit=crop',
    category: 'Technology',
    genre: 'Programming',
    isbn: '978-0-13-235088-4',
    description: 'Panduan menulis kode yang bersih dan mudah dipelihara',
    pages: 464,
    language: 'English',
    publishedDate: '2008-08-01',
    inStock: true,
    stockCount: 15,
    vendorId: '1',
    vendorName: 'Gramedia Bookstore',
    vendorLocation: 'Jakarta Pusat',
    isFeatured: true
  },
  {
    id: '5',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    publisher: 'Crown Business',
    price: 325000,
    rating: 4.6,
    reviewCount: 445,
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop',
    category: 'Business',
    genre: 'Entrepreneurship',
    isbn: '978-0-307-88789-4',
    description: 'Metodologi untuk membangun startup yang berkelanjutan',
    pages: 336,
    language: 'English',
    publishedDate: '2011-09-13',
    inStock: true,
    stockCount: 22,
    vendorId: '2',
    vendorName: 'Mizan Publishing',
    vendorLocation: 'Bandung'
  }
];