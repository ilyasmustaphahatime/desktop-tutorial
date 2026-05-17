import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">About NovaStore</h1>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <p>NovaStore is a demo eCommerce platform built with React, Tailwind CSS, and modern frontend practices. It showcases a fully responsive, production‑ready shopping experience.</p>
        <p>Features include:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Product listing with search &amp; category filters</li>
          <li>Shopping cart with localStorage persistence</li>
          <li>Wishlist functionality</li>
          <li>Dark/light mode toggle</li>
          <li>Smooth animations and skeleton loading</li>
          <li>Fake checkout flow</li>
          <li>Toast notifications</li>
          <li>Fully responsive for all devices</li>
        </ul>
        <p className="pt-4">This project is inspired by Amazon, Nike, and Apple design styles.</p>
        <Link to="/products" className="inline-block mt-4 btn-primary">Start Shopping →</Link>
      </div>
    </div>
  );
}