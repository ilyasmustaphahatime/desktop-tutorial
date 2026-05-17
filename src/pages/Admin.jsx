import { useState, useRef } from 'react';
import { useProducts } from '../contexts/ProductsContext';
import { useToast } from '../contexts/ToastContext';

export default function Admin() {
  const { products, categories, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory, toggleFeatured } = useProducts();
  const { addToast } = useToast();
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    rating: '',
    image: '',        // will hold base64 string
    description: '',
  });
  const [newCategory, setNewCategory] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file selection and convert to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 500KB to stay within localStorage limits)
    if (file.size > 500 * 1024) {
      addToast('Image too large. Please use an image under 500KB.', 'error');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      addToast('Please select an image file (jpg, png, etc.)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData(prev => ({ ...prev, image: base64String }));
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', category: '', rating: '', image: '', description: '' });
    setImagePreview('');
    setEditingProduct(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      addToast('Please fill required fields (name, price, category)', 'error');
      return;
    }

    // For editing, if no new image is uploaded, keep the existing one
    let imageToSave = formData.image;
    if (editingProduct && !imageToSave && editingProduct.image) {
      imageToSave = editingProduct.image;
    }
    if (!imageToSave) {
      addToast('Please upload an image', 'error');
      return;
    }

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      rating: parseFloat(formData.rating) || 4.0,
      image: imageToSave,
      description: formData.description || 'No description provided.',
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      addToast('Product updated successfully', 'success');
    } else {
      addProduct(productData);
      addToast('Product added successfully', 'success');
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      rating: product.rating,
      image: product.image,
      description: product.description,
    });
    setImagePreview(product.image);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      deleteProduct(id);
      addToast(`Product "${name}" deleted`, 'info');
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
      addToast(`Category "${newCategory}" added`, 'success');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Product Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name *"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 dark:bg-gray-700"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price *"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 dark:bg-gray-700"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 dark:bg-gray-700"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="number"
              name="rating"
              placeholder="Rating (0-5)"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 dark:bg-gray-700"
            />

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="w-full border rounded-lg p-2 dark:bg-gray-700"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Max 500KB. JPG, PNG, GIF.</p>
            </div>

            <textarea
              name="description"
              placeholder="Description"
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 dark:bg-gray-700"
            ></textarea>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              {editingProduct && (
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right: Category Management (same as before) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 border rounded-lg p-2 dark:bg-gray-700"
            />
            <button onClick={handleAddCategory} className="btn-primary">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <div key={cat} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center gap-2">
                <span>{cat}</span>
                <button onClick={() => deleteCategory(cat)} className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product List with Featured Toggle */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Featured</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-t dark:border-gray-700">
                  <td className="p-3">{product.id}</td>
                  <td className="p-3">
                    <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">${product.price.toFixed(2)}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      className={`text-2xl ${product.featured ? 'text-yellow-500' : 'text-gray-400'} hover:scale-110 transition`}
                      title={product.featured ? 'Remove from featured' : 'Mark as featured'}
                    >
                      ★
                    </button>
                  </td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => handleEdit(product)} className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id, product.name)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}