import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { products } from '../data/products';

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    let result = products;
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category) result = result.filter(p => p.category === category);
    setFiltered(result);
  }, [search, category]);

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="border rounded-full px-4 py-2 dark:bg-gray-800 dark:border-gray-700" />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded-full px-4 py-2 dark:bg-gray-800">
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? Array(8).fill().map((_,i) => <SkeletonCard key={i} />) : filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {!loading && filtered.length === 0 && <p className="text-center py-12">No products found.</p>}
    </div>
  );
}