import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    addToast(`${product.name} moved to cart`, 'success');
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
        <Link to="/products" className="btn-primary">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
            </Link>
            <div className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-lg font-bold mt-1">${product.price.toFixed(2)}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleMoveToCart(product)} className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1">
                  <FaShoppingCart size={14} /> Add to Cart
                </button>
                <button onClick={() => removeFromWishlist(product.id)} className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}