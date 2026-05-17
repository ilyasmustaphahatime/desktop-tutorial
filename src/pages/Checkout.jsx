import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      addToast('Please fill all fields', 'error');
      return;
    }
    addToast('Order placed successfully! (Demo)', 'success');
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) return <div className="container mx-auto px-4 py-20 text-center">Cart is empty. <a href="/products" className="text-blue-600">Shop now</a></div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border rounded-lg p-2 dark:bg-gray-700" />
          <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border rounded-lg p-2 dark:bg-gray-700" />
          <input required placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full border rounded-lg p-2 dark:bg-gray-700" />
          <div className="border-t pt-4 mt-4">
            <p className="font-bold text-xl">Total: ${getCartTotal().toFixed(2)}</p>
            <button type="submit" className="btn-primary w-full mt-4">Place Order (Demo)</button>
          </div>
        </form>
      </div>
    </div>
  );
}