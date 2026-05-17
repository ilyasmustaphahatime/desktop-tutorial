import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load from localStorage or use initial data
  useEffect(() => {
    const storedProducts = localStorage.getItem('admin_products');
    const storedCategories = localStorage.getItem('admin_categories');

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('admin_products', JSON.stringify(initialProducts));
    }

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      const uniqueCategories = [...new Set(initialProducts.map(p => p.category))];
      setCategories(uniqueCategories);
      localStorage.setItem('admin_categories', JSON.stringify(uniqueCategories));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length) {
      localStorage.setItem('admin_products', JSON.stringify(products));
    }
  }, [products]);

  // Save categories to localStorage
  useEffect(() => {
    if (categories.length) {
      localStorage.setItem('admin_categories', JSON.stringify(categories));
    }
  }, [categories]);

  // Product CRUD
  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...updatedProduct, id } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Category CRUD
  const addCategory = (categoryName) => {
    if (!categories.includes(categoryName)) {
      setCategories(prev => [...prev, categoryName]);
    }
  };

  const deleteCategory = (categoryName) => {
    // Only delete if no product uses this category
    const productsUsing = products.some(p => p.category === categoryName);
    if (!productsUsing) {
      setCategories(prev => prev.filter(c => c !== categoryName));
    } else {
      alert(`Cannot delete category "${categoryName}" – products still use it.`);
    }
  };

  return (
    <AdminContext.Provider value={{
      products,
      categories,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      deleteCategory,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}