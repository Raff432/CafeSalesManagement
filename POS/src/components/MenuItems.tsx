import React from 'react';
import { PlusCircleIcon, PlusIcon, QrCodeIcon } from 'lucide-react';
export const MenuItems = ({
  items,
  addToCart,
  onAddItem,
  onScanQR
}) => {
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Menu Items</h3>
        <div className="flex space-x-3">
          <button onClick={onScanQR} className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            <QrCodeIcon size={20} className="mr-2" />
            Scan QR Code
          </button>
          <button onClick={onAddItem} className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200">
            <PlusIcon size={20} className="mr-2" />
            Add New Item
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => <div key={item.id} className="group bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">{item.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-pink-600 font-bold">
                  ₱{item.price.toFixed(2)}
                </p>
                <button onClick={() => addToCart({
              ...item,
              category: item.category
            })} className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transform hover:scale-110 transition-all duration-200">
                  <PlusCircleIcon size={20} />
                </button>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};