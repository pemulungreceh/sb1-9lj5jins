
import { ChevronRight } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const HeroSection: React.FC = () => {
  const { settings } = useSettings();

  return (
    <section className="hero-gradient text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {settings.hero_title}
              <span className="block text-yellow-300">di BUKUKU</span>
            </h1>
            <p className="text-xl mb-6 text-orange-100">
              {settings.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                Belanja Sekarang
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors">
                Jelajahi Kategori
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?w=500&h=600&fit=crop"
                alt="Books"
                className="rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
              />
              <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-orange-800 px-4 py-2 rounded-full font-bold shadow-lg">
                Gratis Ongkir!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;