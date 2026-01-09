import React, { useState } from 'react';

export const KeywordManager = ({ keywords = [], onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e) => {
    if (e) e.preventDefault(); 
    const trimmed = inputValue.trim();
    
    if (trimmed && !keywords.includes(trimmed)) {
      onChange([...keywords, trimmed]); 
      setInputValue('');
    }
  };

  const handleRemove = (wordToRemove) => {
    onChange(keywords.filter(k => k !== wordToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd(e);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Słowa kluczowe</label>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none hover:border-gray-400"
          placeholder="Wpisz słowo i naciśnij Enter lub +"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300 rounded-lg px-5 transition-colors flex items-center justify-center"
        >
          <span className="text-xl font-bold">+</span>
        </button>
      </div>


      <div className="flex flex-wrap gap-2 mt-3">
        {keywords.length > 0 ? (
          keywords.map((kw, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full border border-emerald-200">
              {kw}
              <button
                type="button"
                onClick={() => handleRemove(kw)}
                className="hover:text-emerald-900 focus:outline-none ml-1 rounded-full hover:bg-emerald-100 p-0.5"
              >
                &times;
              </button>
            </span>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">Brak dodanych słów kluczowych.</p>
        )}
      </div>
    </div>
  );
};