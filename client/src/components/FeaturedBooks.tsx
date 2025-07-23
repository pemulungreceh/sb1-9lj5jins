
import { books } from '../data/mockData';
import BookCard from './BookCard';

const FeaturedBooks: React.FC = () => {
  const featuredBooks = books.filter(book => book.isFeatured);

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Books</h2>
          <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;