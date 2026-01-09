import React from 'react';

export const CitySelect = ({ value, onChange, cities, loading }) => {
  const selectStyles = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all hover:border-gray-400 bg-white";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Miasto {loading && <span className="text-xs text-gray-400 ml-2">(Ładowanie...)</span>}
      </label>
      <select
        name="town"
        required
        value={value}
        onChange={onChange}
        disabled={loading}
        className={`${selectStyles} ${loading ? 'bg-gray-100 cursor-wait' : ''}`}
      >
        {loading ? (
          <option>Pobieranie listy...</option>
        ) : (
          cities.length > 0 ? (
            cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))
          ) : (
            <option value="">Brak miast w bazie</option>
          )
        )}
      </select>
    </div>
  );
};