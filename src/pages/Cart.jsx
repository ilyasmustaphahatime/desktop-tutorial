import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FaTrash } from 'react-icons/fa';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">+</button>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-4"><FaTrash /></button>
                </div>
              </div>
              <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-fit shadow">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2"><span>Subtotal</span><span>${getCartTotal().toFixed(2)}</span></div>
          <div className="flex justify-between mb-4"><span>Shipping</span><span>Free</span></div>
          <hr className="my-2 dark:border-gray-700" />
          <div className="flex justify-between font-bold text-lg mb-6"><span>Total</span><span>${getCartTotal().toFixed(2)}</span></div>
          <Link to="/checkout" className="btn-primary w-full text-center block">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
}