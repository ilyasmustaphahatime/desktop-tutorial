import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const featured = products.slice(0, 4);
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Elevate Your Everyday</h1>
          <p className="text-lg md:text-xl mb-8">Discover the perfect blend of style and performance.</p>
          <Link to="/products" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">Shop Now</Link>
        </div>
      </section>
      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}