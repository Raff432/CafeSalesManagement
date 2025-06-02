import React from 'react';
import { CupSodaIcon, UtensilsIcon } from 'lucide-react';
export const CategoryTabs = ({
  activeCategory,
  setActiveCategory
}) => {
  return <div className="flex space-x-2 mb-4">
      <button onClick={() => setActiveCategory('drinks')} className={`flex items-center px-6 py-3 rounded-lg font-medium ${activeCategory === 'drinks' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
        <CupSodaIcon className="mr-2" size={20} />
        Drinks
      </button>
      <button onClick={() => setActiveCategory('food')} className={`flex items-center px-6 py-3 rounded-lg font-medium ${activeCategory === 'food' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
        <UtensilsIcon className="mr-2" size={20} />
        Food Items
      </button>
    </div>;
};