import { Link } from 'wouter';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any books to your cart yet.</p>
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {state.items.map((item, index) => (
                <div key={item.book.id} className={`p-6 ${index > 0 ? 'border-t' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.book.image}
                      alt={item.book.title}
                      className="w-20 h-28 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <Link
                        to={`/book/${item.book.id}`}
                        className="font-semibold text-gray-800 hover:text-orange-600 transition-colors"
                      >
                        {item.book.title}
                      </Link>
                      <p className="text-gray-600 text-sm">by {item.book.author}</p>
                      <p className="text-gray-500 text-sm">{item.book.vendorName}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-lg font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-orange-600">
                            {formatPrice(item.book.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(item.book.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.itemCount} items)</span>
                  <span className="font-medium">{formatPrice(state.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">{formatPrice(state.total)}</span>
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors mb-4">
                Proceed to Checkout
              </button>
              
              <Link
                to="/"
                className="block text-center text-orange-600 hover:text-orange-700 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;