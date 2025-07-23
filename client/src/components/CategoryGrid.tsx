import { categories } from '../data/mockData';
import { Link } from 'wouter';

const CategoryGrid = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:shadow-md hover:border-orange-300 transition-all duration-300 group-hover:scale-105">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-gray-800 text-sm mb-1 group-hover:text-orange-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">{category.bookCount} books</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;