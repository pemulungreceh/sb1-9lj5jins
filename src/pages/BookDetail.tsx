import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShoppingCart, Heart, Share, ChevronRight, Minus, Plus } from 'lucide-react';
import { books, vendors } from '../data/mockData';
import { useCart } from '../contexts/CartContext';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  const book = books.find(b => b.id === id);
  const vendor = vendors.find(v => v.id === book?.vendorId);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h1>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: book });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to={`/category/${book.category}`} className="hover:text-orange-600">{book.category}</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-800">{book.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Book Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {book.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{book.discount}%
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
              <p className="text-gray-600 mb-4">by {book.author}</p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(book.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{book.rating}</span>
                </div>
                <span className="text-sm text-gray-400 ml-4">({book.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-orange-600">
                    {formatPrice(book.price)}
                  </span>
                  {book.originalPrice && (
                    <span className="text-gray-400 text-xl line-through ml-4">
                      {formatPrice(book.originalPrice)}
                    </span>
                  )}
                </div>
                {book.discount && (
                  <p className="text-green-600 text-sm mt-1">
                    You save {formatPrice((book.originalPrice || 0) - book.price)}
                  </p>
                )}
              </div>

              {/* Vendor Info */}
              {vendor && (
                <div className="border rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={vendor.avatar}
                        alt={vendor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-800">{vendor.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {vendor.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">{vendor.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">{vendor.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">{book.stockCount} available</span>
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="border border-gray-300 hover:border-orange-500 text-gray-700 py-3 px-6 rounded-lg transition-colors flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </button>
                <button className="border border-gray-300 hover:border-orange-500 text-gray-700 py-3 px-4 rounded-lg transition-colors">
                  <Share className="h-5 w-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="border-t pt-6">
                <div className="flex space-x-8 mb-4">
                  {['description', 'details', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`pb-2 border-b-2 transition-colors capitalize ${
                        selectedTab === tab
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-600 hover:text-orange-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {selectedTab === 'description' && (
                  <div className="text-gray-700 leading-relaxed">
                    {book.description}
                  </div>
                )}

                {selectedTab === 'details' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Book Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ISBN:</span>
                          <span>{book.isbn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Publisher:</span>
                          <span>{book.publisher}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pages:</span>
                          <span>{book.pages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Language:</span>
                          <span>{book.language}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Published:</span>
                          <span>{new Date(book.publishedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Category</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span>{book.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Genre:</span>
                          <span>{book.genre}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div>
                    <p className="text-gray-600">Reviews feature coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;