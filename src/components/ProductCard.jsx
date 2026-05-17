import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import RatingStars from './RatingStars';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useToast } from '../contexts/ToastContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const liked = isInWishlist(product.id);

  const handleWishlist = () => {
    if (liked) {
      removeFromWishlist(product.id);
      addToast('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      addToast('Added to wishlist', 'success');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    addToast(`${product.name} added to cart`, 'success');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden card-hover transition-all duration-300">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="h-48 w-full object-cover hover:scale-105 transition-transform duration-500" />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-blue-600 dark:hover:text-blue-400 transition">{product.name}</h3>
          </Link>
          <button onClick={handleWishlist} className="text-red-500 hover:scale-110 transition">
            {liked ? <FaHeart className="fill-red-500" /> : <FaRegHeart />}
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.category}</p>
        <div className="mt-2"><RatingStars rating={product.rating} /></div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button onClick={handleAddToCart} className="bg-black dark:bg-white text-white dark:text-black p-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition">
            <FaShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
