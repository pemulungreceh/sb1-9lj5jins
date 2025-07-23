import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'wouter';

const Header: React.FC = () => {
  const { state } = useCart();
  const { settings } = useSettings();
  const { state: authState, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">📚</span>
            </div>
            <span className="text-xl font-bold text-gray-800">{settings.site_name}</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari buku, penulis, penerbit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <button className="absolute right-2 top-1.5 btn-primary px-4 py-1 rounded-md text-sm transition-colors">
                Cari
              </button>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* User */}
            {authState.isAuthenticated ? (
              <div className="relative group">
                <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                  <User className="h-6 w-6" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {authState.user?.full_name}
                  </div>
                  {authState.user?.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-gray-600 hover:text-primary transition-colors">
                <User className="h-6 w-6" />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3 border-t">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-20 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <button className="absolute right-2 top-1.5 btn-primary px-3 py-1 rounded-md text-sm">
              Cari
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="space-y-2">
              <Link to="/" className="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
                Beranda
              </Link>
              <Link to="/categories" className="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
                Kategori
              </Link>
              <Link to="/vendors" className="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
                Penjual
              </Link>
              <Link to="/deals" className="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
                Promo
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;