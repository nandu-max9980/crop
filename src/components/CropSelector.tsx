import React, { useState } from 'react';
import { Wheat, Apple, Carrot, Bean } from 'lucide-react';

interface CropSelectorProps {
  onCropSelect: (crop: { category: string; name: string }) => void;
  selectedCrop: { category: string; name: string } | null;
}

const CropSelector: React.FC<CropSelectorProps> = ({ onCropSelect, selectedCrop }) => {
  const [activeCategory, setActiveCategory] = useState<string>('fruits');

  const cropCategories = {
    fruits: {
      icon: Apple,
      color: 'bg-red-50 border-red-200 text-red-700',
      crops: ['Apple', 'Mango', 'Banana', 'Orange', 'Grapes', 'Pomegranate', 'Guava', 'Papaya']
    },
    vegetables: {
      icon: Carrot,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      crops: ['Tomato', 'Potato', 'Onion', 'Cabbage', 'Cauliflower', 'Brinjal', 'Okra', 'Carrot']
    },
    grains: {
      icon: Wheat,
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      crops: ['Rice', 'Wheat', 'Corn', 'Barley', 'Oats', 'Millet', 'Sorghum', 'Quinoa']
    },
    pulses: {
      icon: Bean,
      color: 'bg-green-50 border-green-200 text-green-700',
      crops: ['Chickpea', 'Lentils', 'Black Gram', 'Green Gram', 'Kidney Bean', 'Pigeon Pea', 'Field Pea', 'Soybean']
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Crop Type</h2>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(cropCategories).map(([category, config]) => {
          const IconComponent = config.icon;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          );
        })}
      </div>
      
      {/* Crop Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {cropCategories[activeCategory as keyof typeof cropCategories].crops.map((crop) => (
          <button
            key={crop}
            onClick={() => onCropSelect({ category: activeCategory, name: crop })}
            className={`p-4 rounded-lg border-2 text-center transition-all hover:shadow-md ${
              selectedCrop?.name === crop && selectedCrop?.category === activeCategory
                ? 'border-green-500 bg-green-50 shadow-md'
                : `border-gray-200 hover:${cropCategories[activeCategory as keyof typeof cropCategories].color}`
            }`}
          >
            <div className="font-medium text-gray-800">{crop}</div>
          </button>
        ))}
      </div>
      
      {selectedCrop && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Selected Crop:</strong> {selectedCrop.name} ({selectedCrop.category})
          </p>
        </div>
      )}
    </div>
  );
};

export default CropSelector;