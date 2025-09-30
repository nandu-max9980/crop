import React, { useState } from 'react';
import { MapPin, Satellite, Cloud } from 'lucide-react';

interface MarkedLocation {
  lat: number;
  lng: number;
  name: string;
}

interface WeatherMapProps {
  onLocationSelect: (location: MarkedLocation) => void;
  selectedLocation: MarkedLocation | null;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ onLocationSelect, selectedLocation }) => {
  const [mapView, setMapView] = useState<'satellite' | 'weather' | 'clouds'>('satellite');

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert pixel coordinates to lat/lng (simplified for demo)
    const lat = 20.5937 - (y / rect.height) * 20;
    const lng = 68.1773 + (x / rect.width) * 30;
    
    const location: MarkedLocation = {
      lat: parseFloat(lat.toFixed(4)),
      lng: parseFloat(lng.toFixed(4)),
      name: `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`
    };
    
    onLocationSelect(location);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Weather & Cloud Map</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setMapView('satellite')}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              mapView === 'satellite' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Satellite className="w-4 h-4 mr-1" />
            Satellite
          </button>
          <button
            onClick={() => setMapView('weather')}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              mapView === 'weather' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Cloud className="w-4 h-4 mr-1" />
            Weather
          </button>
          <button
            onClick={() => setMapView('clouds')}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              mapView === 'clouds' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Cloud className="w-4 h-4 mr-1" />
            Clouds
          </button>
        </div>
      </div>
      
      <div 
        className="relative w-full h-96 bg-gradient-to-br from-blue-400 via-green-400 to-green-600 rounded-lg cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
      >
        {/* Map overlay based on view */}
        {mapView === 'satellite' && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-yellow-700 to-brown-600 opacity-80"></div>
        )}
        {mapView === 'weather' && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-blue-300 opacity-60"></div>
            <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-12 right-8 w-24 h-12 bg-gray-300 rounded-full opacity-70"></div>
          </div>
        )}
        {mapView === 'clouds' && (
          <div className="absolute inset-0">
            <div className="absolute top-8 left-12 w-32 h-20 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-16 right-16 w-28 h-16 bg-gray-200 rounded-full opacity-70"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-24 bg-white rounded-full opacity-75"></div>
          </div>
        )}
        
        {/* India map outline (simplified) */}
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <path
              d="M100,50 Q150,40 200,60 Q250,45 300,70 L320,120 Q310,180 280,220 Q240,250 180,240 Q120,230 90,180 Q80,120 100,50"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        
        {/* Marked location */}
        {selectedLocation && (
          <div className="absolute transform -translate-x-1/2 -translate-y-full" 
               style={{ 
                 left: `${((selectedLocation.lng - 68.1773) / 30) * 100}%`, 
                 top: `${((20.5937 - selectedLocation.lat) / 20) * 100}%` 
               }}>
            <MapPin className="w-6 h-6 text-red-500 drop-shadow-lg" />
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded-lg">
          Click on the map to mark your location
        </div>
      </div>
      
      {selectedLocation && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Selected Location:</strong> {selectedLocation.name} 
            ({selectedLocation.lat}°, {selectedLocation.lng}°)
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherMap;