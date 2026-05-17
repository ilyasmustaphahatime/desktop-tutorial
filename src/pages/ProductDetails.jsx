import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProducts } from '../contexts/ProductsContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import RatingStars from '../components/RatingStars';

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`Added ${quantity} × ${product.name} to cart`, 'success');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:underline">
        ← Back
      </button>
      <div className="grid md:grid-cols-2 gap-12">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-2xl shadow-lg w-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-2">{product.category}</p>
          <RatingStars rating={product.rating} />
          <p className="text-2xl font-bold mt-4">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{product.description}</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex border rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                -
              </button>
              <span className="px-4 py-1 min-w-[48px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary px-8">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}