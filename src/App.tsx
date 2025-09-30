import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import WeatherMap from './components/WeatherMap';
import WeatherConditions from './components/WeatherConditions';
import WeatherAlerts from './components/WeatherAlerts';
import { CropSelector } from './components/CropSelector';
import FarmDetails, { FarmDetails as FarmDetailsType } from './components/FarmDetails';
import SoilAnalysis, { SoilAnalysis as SoilAnalysisType } from './components/SoilAnalysis';
import CropPrediction from './components/CropPrediction';

interface MarkedLocation {
  lat: number;
  lng: number;
  name: string;
}

interface SelectedCrop {
  category: string;
  name: string;
}

function App() {
  const [selectedLocation, setSelectedLocation] = useState<MarkedLocation | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<SelectedCrop | null>(null);
  const [farmDetails, setFarmDetails] = useState<FarmDetailsType | null>(null);
  const [soilAnalysis, setSoilAnalysis] = useState<SoilAnalysisType | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Sprout className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Smart Crop Predictor</h1>
              <p className="text-gray-600">AI-Powered Agricultural Intelligence Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Weather & Cloud Map */}
          <WeatherMap
            onLocationSelect={setSelectedLocation}
            selectedLocation={selectedLocation}
          />

          {/* Weather Conditions */}
          <WeatherConditions selectedLocation={selectedLocation} />

          {/* Weather Alerts */}
          <WeatherAlerts selectedLocation={selectedLocation} />

          {/* Crop Selector */}
          <CropSelector
            onCropSelect={setSelectedCrop}
            selectedCrop={selectedCrop}
          />

          {/* Farm Details */}
          <FarmDetails
            onDetailsUpdate={setFarmDetails}
            farmDetails={farmDetails}
          />

          {/* Soil Analysis */}
          <SoilAnalysis
            onAnalysisUpdate={setSoilAnalysis}
            soilAnalysis={soilAnalysis}
          />

          {/* Crop Prediction Results */}
          <CropPrediction
            selectedLocation={selectedLocation}
            selectedCrop={selectedCrop}
            farmDetails={farmDetails}
            soilAnalysis={soilAnalysis}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Sprout className="w-6 h-6 mr-2" />
              <span className="text-lg font-semibold">Smart Crop Predictor</span>
            </div>
            <p className="text-gray-400">
              Empowering farmers with AI-driven insights for better crop management and sustainable agriculture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;