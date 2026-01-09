import React, { useState, useEffect } from 'react';
import { getCities } from '../services/firebaseService';
import { FormInput } from './campingFormComponents/formInput.jsx';
import { CitySelect } from './campingFormComponents/citySelect.jsx';
import { KeywordManager } from './campingFormComponents/keywordManager.jsx';

export const CampaignForm = ({ initialData = {}, onSubmit, isSubmitting }) => {
  const [availableCities, setAvailableCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    town: '',
    radius: 10,
    bidAmount: 1,
    fund: 1000,
    status: true,
    keywords: [], 
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesFromDb = await getCities();
        setAvailableCities(citiesFromDb);
        if (!initialData.town && citiesFromDb.length > 0) {
           setFormData(prev => ({ ...prev, town: citiesFromDb[0] }));
        }
      } catch (error) {
        console.error("Błąd miast:", error);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [initialData.town]);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prev => ({ ...prev, ...initialData, keywords: initialData.keywords || [] }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      town: formData.town || (availableCities.length > 0 ? availableCities[0] : ''),
      radius: Number(formData.radius),
      bidAmount: Number(formData.bidAmount),
      fund: Number(formData.fund),
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-300 p-8 rounded-2xl shadow-lg space-y-8 font-sans">
      
      <FormInput 
        label="Nazwa kampanii" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="np. Wyprzedaż Lato" 
        required 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CitySelect 
          value={formData.town}
          onChange={handleChange}
          cities={availableCities}
          loading={loadingCities}
        />
        <FormInput 
          label="Promień (km)" 
          type="number" 
          name="radius" 
          value={formData.radius} 
          onChange={handleChange} 
          min="1" required 
        />
      </div>

      <KeywordManager 
        keywords={formData.keywords}
        onChange={(newKeywords) => setFormData(prev => ({ ...prev, keywords: newKeywords }))}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput 
          label="Stawka za klik (Bid)" 
          type="number" 
          name="bidAmount" 
          value={formData.bidAmount} 
          onChange={handleChange} 
          step="0.1" min="0.1" required 
        />
        <FormInput 
          label={<>Budżet całkowity</>}
          type="number" 
          name="fund" 
          value={formData.fund} 
          onChange={handleChange} 
          min="100" required 
          readOnly={!!initialData.id}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300 group-hover:border-emerald-500 transition-colors"
          />
          <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Kampania aktywna</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto px-8 py-3 rounded-lg text-white font-bold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 ${
            isSubmitting ? 'bg-gray-400 cursor-wait' : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {isSubmitting ? 'Zapisywanie...' : (initialData.id ? 'Zapisz zmiany' : 'Dodaj kampanię')}
        </button>
      </div>
    </form>
  );
};