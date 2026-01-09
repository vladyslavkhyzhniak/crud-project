import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CampaignCard = ({ campaign, onDetailsClick }) => {
  const navigate = useNavigate();
  const { id, name, fund, town } = campaign;

  const formattedFund = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  }).format(fund);

  return (
    <div className="bg-gray-300 rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-all duration-200 group">
      <div className="flex-1 min-w-0 mb-4 md:mb-0 md:mr-6">
        <h3 className="text-lg font-bold text-gray-900 truncate" title={name}>
          {name}
        </h3>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <svg className="w-4 h-4 mr-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {town}
        </div>
      </div>

      <div className="mb-4 md:mb-0 md:mx-6 flex items-center md:block">
        <span className="text-xl font-bold text-emerald-600 tabular-nums">
          {formattedFund}
        </span>
      </div>

      <div className="flex gap-3 md:w-auto w-full">
        <button 
          onClick={() => onDetailsClick(campaign)}
          className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          Szczegóły
        </button>
        
        <button 
          onClick={() => navigate(`/edit/${id}`)}
          className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
        >
          Edytuj
        </button>
      </div>
    </div>
  );
};