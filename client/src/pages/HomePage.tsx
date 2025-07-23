
import HeroSection from '../components/HeroSection';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedBooks from '../components/FeaturedBooks';
import DealsSection from '../components/DealsSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <FeaturedBooks />
      <DealsSection />
    </div>
  );
};

export default HomePage;