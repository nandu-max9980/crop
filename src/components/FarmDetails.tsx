import React, { useState } from 'react';
import { Calendar, Mountain, Ruler, MapPin } from 'lucide-react';

interface FarmDetailsProps {
  onDetailsUpdate: (details: FarmDetails) => void;
  farmDetails: FarmDetails | null;
}

export interface FarmDetails {
  growingSeason: string;
  soilType: string;
  landArea: number;
  state: string;
  city: string;
}

const FarmDetails: React.FC<FarmDetailsProps> = ({ onDetailsUpdate, farmDetails }) => {
  const [details, setDetails] = useState<FarmDetails>({
    growingSeason: farmDetails?.growingSeason || '',
    soilType: farmDetails?.soilType || '',
    landArea: farmDetails?.landArea || 0,
    state: farmDetails?.state || '',
    city: farmDetails?.city || ''
  });

  const handleInputChange = (field: keyof FarmDetails, value: string | number) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsUpdate(updatedDetails);
  };

  const growingSeasons = [
    'Kharif (June - October)',
    'Rabi (November - April)',
    'Zaid (April - June)',
    'Year Round'
  ];

  const soilTypes = [
    'Alluvial Soil',
    'Black Cotton Soil',
    'Red Sandy Soil',
    'Laterite Soil',
    'Mountain Soil',
    'Desert Soil',
    'Clay Soil',
    'Loamy Soil'
  ];

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Farm Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Growing Season */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Growing Season
          </label>
          <select
            value={details.growingSeason}
            onChange={(e) => handleInputChange('growingSeason', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select Growing Season</option>
            {growingSeasons.map((season) => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>
        </div>
        
        {/* Soil Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mountain className="w-4 h-4 inline mr-2" />
            Soil Type
          </label>
          <select
            value={details.soilType}
            onChange={(e) => handleInputChange('soilType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select Soil Type</option>
            {soilTypes.map((soil) => (
              <option key={soil} value={soil}>{soil}</option>
            ))}
          </select>
        </div>
        
        {/* Land Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Ruler className="w-4 h-4 inline mr-2" />
            Land Area (Hectares)
          </label>
          <input
            type="number"
            value={details.landArea}
            onChange={(e) => handleInputChange('landArea', parseFloat(e.target.value) || 0)}
            placeholder="Enter area in hectares"
            min="0"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            State
          </label>
          <select
            value={details.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        
        {/* City */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            City
          </label>
          <input
            type="text"
            value={details.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Enter city name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>
      
      {/* Summary */}
      {Object.values(details).some(value => value) && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Farm Summary</h3>
          <div className="text-sm text-blue-700 space-y-1">
            {details.landArea > 0 && <p>Land Area: {details.landArea} hectares</p>}
            {details.soilType && <p>Soil Type: {details.soilType}</p>}
            {details.growingSeason && <p>Growing Season: {details.growingSeason}</p>}
            {details.state && details.city && <p>Location: {details.city}, {details.state}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmDetails;

export { FarmDetails }