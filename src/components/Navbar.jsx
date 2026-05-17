import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { getCartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          NovaStore
        </Link>

        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-semibold border-b-2 border-black dark:border-white' : 'hover:text-gray-600 dark:hover:text-gray-300'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'font-semibold border-b-2 border-black dark:border-white' : 'hover:text-gray-600 dark:hover:text-gray-300'
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'font-semibold border-b-2 border-black dark:border-white' : 'hover:text-gray-600 dark:hover:text-gray-300'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? 'font-semibold border-b-2 border-black dark:border-white' : 'hover:text-gray-600 dark:hover:text-gray-300'
            }
          >
            Admin
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/wishlist" className="relative">
            <FaHeart size={20} />
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart size={20} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 py-4 px-4 flex flex-col space-y-3 animate-fade-in">
          <Link to="/" onClick={() => setIsOpen(false)} className="py-2">
            Home
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="py-2">
            Products
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="py-2">
            About
          </Link>
          <Link to="/admin" onClick={() => setIsOpen(false)} className="py-2">
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}