import React from 'react';
import { Star, MapPin, ShoppingCart } from 'lucide-react';
import { Book } from '../types';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { dispatch } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: book });
  };

  return (
    <Link to={`/book/${book.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
        {/* Book Image */}
        <div className="relative overflow-hidden">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {book.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              -{book.discount}%
            </div>
          )}
          {book.isFeatured && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-gray-600 text-xs mb-2">by {book.author}</p>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600 ml-1">{book.rating}</span>
            </div>
            <span className="text-xs text-gray-400 ml-2">({book.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-orange-600 font-bold text-sm">
                {formatPrice(book.price)}
              </span>
              {book.originalPrice && (
                <span className="text-gray-400 text-xs line-through ml-2">
                  {formatPrice(book.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Vendor Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{book.vendorLocation}</span>
            </div>
            <span>{book.stockCount} left</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;