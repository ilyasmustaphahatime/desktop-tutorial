import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load from localStorage or seed with initialProducts
  useEffect(() => {
    const storedProducts = localStorage.getItem('ecommerce_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Ensure all initial products have a 'featured' property
      const seededProducts = initialProducts.map(p => ({
        ...p,
        featured: p.featured !== undefined ? p.featured : false,
      }));
      setProducts(seededProducts);
      localStorage.setItem('ecommerce_products', JSON.stringify(seededProducts));
    }
  }, []);

  // Update categories whenever products change
  useEffect(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    setCategories(uniqueCategories);
    localStorage.setItem('ecommerce_products', JSON.stringify(products));
  }, [products]);

  // Product CRUD
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      featured: product.featured !== undefined ? product.featured : false,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...updatedProduct, id } : p
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleFeatured = (productId) => {
    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, featured: !p.featured } : p
    ));
  };

  // Category CRUD
  const addCategory = (categoryName) => {
    if (!categories.includes(categoryName)) {
      setCategories(prev => [...prev, categoryName]);
    }
  };

  const deleteCategory = (categoryName) => {
    const productsUsing = products.some(p => p.category === categoryName);
    if (!productsUsing) {
      setCategories(prev => prev.filter(c => c !== categoryName));
    } else {
      alert(`Cannot delete category "${categoryName}" – products still use it.`);
    }
  };

  return (
    <ProductsContext.Provider value={{
      products,
      categories,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleFeatured,
      addCategory,
      deleteCategory,
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within ProductsProvider');
  return context;
}