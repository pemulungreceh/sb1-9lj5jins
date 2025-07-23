import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Clock, Star, Package, Truck } from 'lucide-react';
import { customerAPI } from '../../services/api';
import { Link } from 'react-router-dom';

interface CustomerStats {
  totalOrders: number;
  wishlistCount: number;
  pendingOrders: number;
  completedOrders: number;
}

const CustomerDashboard: React.FC = () => {
  const [stats, setStats] = useState<CustomerStats>({
    totalOrders: 0,
    wishlistCount: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, wishlistRes] = await Promise.all([
        customerAPI.getOrders({ limit: 5 }),
        customerAPI.getWishlist()
      ]);

      const orders = ordersRes.data.orders || [];
      const wishlist = wishlistRes.data.wishlist || [];

      setStats({
        totalOrders: orders.length,
        wishlistCount: wishlist.length,
        pendingOrders: orders.filter((order: any) => order.status === 'pending').length,
        completedOrders: orders.filter((order: any) => order.status === 'completed').length
      });

      setRecentOrders(orders);
      setWishlistItems(wishlist);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Menunggu', icon: Clock },
      confirmed: { color: 'bg-blue-100 text-blue-800', label: 'Dikonfirmasi', icon: Package },
      shipped: { color: 'bg-purple-100 text-purple-800', label: 'Dikirim', icon: Truck },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Selesai', icon: Star },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Dibatalkan', icon: Clock }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <span className={`px-2 py-1 text-xs rounded-full flex items-center w-fit ${config.color}`}>
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Pelanggan</h1>
        <p className="text-gray-600">Selamat datang kembali di BUKUKU</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pesanan</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Wishlist</p>
              <p className="text-2xl font-bold text-gray-900">{stats.wishlistCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pesanan Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pesanan Selesai</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
          <div className="space-y-3">
            <Link
              to="/"
              className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 text-gray-600 mr-3" />
                <span>Belanja Sekarang</span>
              </div>
            </Link>
            <Link
              to="/customer/orders"
              className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Package className="h-5 w-5 text-gray-600 mr-3" />
                <span>Lihat Pesanan</span>
              </div>
            </Link>
            <Link
              to="/customer/wishlist"
              className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-gray-600 mr-3" />
                <span>Wishlist Saya</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pesanan Terbaru</h3>
          <div className="space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order: any) => (
                <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">#{order.order_number}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(order.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{formatCurrency(order.total_amount)}</p>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Belum ada pesanan</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wishlist</h3>
          <div className="space-y-3">
            {wishlistItems.length > 0 ? (
              wishlistItems.slice(0, 3).map((item: any) => (
                <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-16 bg-gray-200 rounded mr-3 flex-shrink-0">
                    {item.product.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.product.title}</p>
                    <p className="text-xs text-gray-600">oleh {item.product.author}</p>
                    <p className="text-xs font-medium text-primary">{formatCurrency(item.product.price)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Wishlist kosong</p>
            )}
            {wishlistItems.length > 3 && (
              <Link
                to="/customer/wishlist"
                className="block text-center text-primary text-sm hover:underline"
              >
                Lihat semua ({wishlistItems.length})
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rekomendasi untuk Anda</h3>
        <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Rekomendasi produk akan ditampilkan di sini</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;