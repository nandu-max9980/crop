import React from 'react';
import { Cloud, Droplets, Wind, Thermometer, Sun, Eye } from 'lucide-react';

interface WeatherConditionsProps {
  selectedLocation: { lat: number; lng: number; name: string } | null;
}

const WeatherConditions: React.FC<WeatherConditionsProps> = ({ selectedLocation }) => {
  // Mock weather data - in real app, this would come from weather API
  const weatherData = selectedLocation ? {
    condition: 'Partly Cloudy',
    temperature: 28,
    feelsLike: 32,
    humidity: 68,
    windSpeed: 12,
    rainfall: 2.5,
    visibility: 10,
    uvIndex: 6,
    forecast: [
      { day: 'Today', high: 32, low: 24, condition: 'Partly Cloudy', rainfall: 20 },
      { day: 'Tomorrow', high: 30, low: 22, condition: 'Sunny', rainfall: 0 },
      { day: 'Wednesday', high: 29, low: 21, condition: 'Cloudy', rainfall: 40 },
      { day: 'Thursday', high: 27, low: 20, condition: 'Rainy', rainfall: 80 },
      { day: 'Friday', high: 31, low: 23, condition: 'Sunny', rainfall: 10 }
    ]
  } : null;

  if (!selectedLocation) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Conditions</h2>
        <div className="text-center text-gray-500 py-8">
          Please select a location on the map to view weather conditions
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Weather Conditions</h2>
      
      {/* Current Weather */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Current Weather - {selectedLocation.name}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <Cloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Condition</p>
            <p className="font-bold text-gray-800">{weatherData?.condition}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-bold text-gray-800">{weatherData?.temperature}°C</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <Sun className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Feels Like</p>
            <p className="font-bold text-gray-800">{weatherData?.feelsLike}°C</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg text-center">
            <Droplets className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-bold text-gray-800">{weatherData?.humidity}%</p>
          </div>
        </div>
      </div>
      
      {/* Additional Conditions */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Wind className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-bold text-gray-800">{weatherData?.windSpeed} km/h</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Rainfall</p>
            <p className="font-bold text-gray-800">{weatherData?.rainfall} mm</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Visibility</p>
            <p className="font-bold text-gray-800">{weatherData?.visibility} km</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <Sun className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">UV Index</p>
            <p className="font-bold text-gray-800">{weatherData?.uvIndex}</p>
          </div>
        </div>
      </div>
      
      {/* 5-Day Forecast */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {weatherData?.forecast.map((day, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg text-center">
              <p className="font-medium text-gray-700 mb-2">{day.day}</p>
              <p className="text-sm text-gray-600 mb-2">{day.condition}</p>
              <p className="text-lg font-bold text-gray-800">{day.high}°/{day.low}°</p>
              <div className="flex items-center justify-center mt-2">
                <Droplets className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-gray-600">{day.rainfall}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherConditions;