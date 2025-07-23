
import { books } from '../data/mockData';
import BookCard from './BookCard';
import { Clock } from 'lucide-react';

const DealsSection: React.FC = () => {
  const dealsBooks = books.filter(book => book.isOnSale);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-2xl font-bold mb-2">Flash Sale</h2>
              <p className="text-red-100">Limited time offers - grab them before they're gone!</p>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg p-3">
              <Clock className="h-5 w-5 mr-2" />
              <div className="text-center">
                <div className="font-bold text-xl">23:45:12</div>
                <div className="text-xs text-red-100">Time Left</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dealsBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;