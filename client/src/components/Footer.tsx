
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">📚</span>
              </div>
              <span className="text-xl font-bold">BookMart</span>
            </div>
            <p className="text-gray-300 mb-4">
              Indonesia's leading online book marketplace connecting readers with trusted vendors nationwide.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-orange-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-orange-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-orange-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Vendors</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Track Order</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">support@bookmart.id</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 BookMart. All rights reserved. | Made with ❤️ for book lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;