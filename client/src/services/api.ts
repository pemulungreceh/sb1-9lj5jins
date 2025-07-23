import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (username: string, password: string) => 
    api.post('/auth/login.php', { username, password }),
  register: (userData: any) => 
    api.post('/auth/register.php', userData),
};

export const productsAPI = {
  getAll: (params?: any) => 
    api.get('/products/list.php', { params }),
  getById: (id: string) => 
    api.get(`/products/detail.php?id=${id}`),
  getFeatured: () => 
    api.get('/products/featured.php'),
  getSale: () => 
    api.get('/products/sale.php'),
};

export const adminAPI = {
  getDashboard: () => 
    api.get('/admin/dashboard.php'),
  getUsers: (params?: any) => 
    api.get('/admin/users.php', { params }),
  createUser: (userData: any) => 
    api.post('/admin/users.php', userData),
  updateUser: (id: string, userData: any) => 
    api.put(`/admin/users.php?id=${id}`, userData),
  deleteUser: (id: string) => 
    api.delete(`/admin/users.php?id=${id}`),
  getProducts: (params?: any) => 
    api.get('/admin/products.php', { params }),
  createProduct: (productData: any) => 
    api.post('/admin/products.php', productData),
  updateProduct: (id: string, productData: any) => 
    api.put(`/admin/products.php?id=${id}`, productData),
  deleteProduct: (id: string) => 
    api.delete(`/admin/products.php?id=${id}`),
  getSettings: () => 
    api.get('/admin/settings.php'),
  updateSettings: (settings: any) => 
    api.post('/admin/settings.php', settings),
  getFlashSales: () => 
    api.get('/admin/flash-sales.php'),
  createFlashSale: (data: any) => 
    api.post('/admin/flash-sales.php', data),
  sendNotification: (data: any) => 
    api.post('/admin/notifications.php', data),
};

export const sellerAPI = {
  getDashboard: () => 
    api.get('/seller/dashboard.php'),
  getProducts: (params?: any) => 
    api.get('/seller/products.php', { params }),
  createProduct: (productData: any) => 
    api.post('/seller/products.php', productData),
  updateProduct: (id: string, productData: any) => 
    api.put(`/seller/products.php?id=${id}`, productData),
  getOrders: (params?: any) => 
    api.get('/seller/orders.php', { params }),
  updateOrderStatus: (id: string, status: string) => 
    api.put(`/seller/orders.php?id=${id}`, { status }),
};

export const customerAPI = {
  getProfile: () => 
    api.get('/customer/profile.php'),
  updateProfile: (profileData: any) => 
    api.put('/customer/profile.php', profileData),
  getOrders: (params?: any) => 
    api.get('/customer/orders.php', { params }),
  getWishlist: () => 
    api.get('/customer/wishlist.php'),
  addToWishlist: (productId: string) => 
    api.post('/customer/wishlist.php', { product_id: productId }),
  removeFromWishlist: (productId: string) => 
    api.delete(`/customer/wishlist.php?product_id=${productId}`),
};

export default api;