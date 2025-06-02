import React, { useState } from 'react';
import { XIcon, ImageIcon, AlertCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
export const AddItemModal = ({
  onClose,
  onAdd
}) => {
  const [item, setItem] = useState({
    name: '',
    price: '',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJpbmt8ZW58MHx8MHx8fDA%3D'
  });
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!item.name.trim()) newErrors.name = 'Name is required';
    if (!item.price) newErrors.price = 'Price is required';
    if (parseFloat(item.price) <= 0) newErrors.price = 'Price must be greater than 0';
    if (!item.image) newErrors.image = 'Image URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    try {
      onAdd({
        ...item,
        price: parseFloat(item.price)
      });
      toast.success('Menu item added successfully!');
    } catch (error) {
      toast.error('Failed to add menu item');
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Menu Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input type="text" value={item.name} onChange={e => setItem({
            ...item,
            name: e.target.value
          })} className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter item name" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Price (₱) <span className="text-red-500">*</span>
            </label>
            <input type="number" value={item.price} onChange={e => setItem({
            ...item,
            price: e.target.value
          })} className={`w-full p-3 border rounded-lg ${errors.price ? 'border-red-500' : 'border-gray-300'}`} min="0" step="0.01" placeholder="Enter price" />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select value={item.category} onChange={e => setItem({
            ...item,
            category: e.target.value
          })} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="drinks">Drinks</option>
              <option value="food">Food Items</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input type="url" value={item.image} onChange={e => setItem({
            ...item,
            image: e.target.value
          })} className={`w-full p-3 border rounded-lg ${errors.image ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter image URL" />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>
          {item.image && <div className="relative h-40 rounded-lg overflow-hidden">
              <img src={item.image} alt="Preview" className="w-full h-full object-cover" onError={e => {
            e.target.onerror = null;
            setErrors({
              ...errors,
              image: 'Invalid image URL'
            });
          }} />
            </div>}
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>;
};