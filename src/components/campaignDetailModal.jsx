import { createPortal } from 'react-dom';

export const CampaignDetailModal = ({ campaign, onClose }) => {
  if (!campaign) return null;

  const formattedFund = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  }).format(campaign.fund);

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60  transition-opacity"
      onClick={onClose} 
    >  
      <div 
        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden transform transition-all animate-slide-down mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-900 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Szczegóły Kampanii
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{campaign.name}</h3>
              <p className="text-sm text-gray-500 mt-1">ID: {campaign.id}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${campaign.status ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
              {campaign.status ? 'AKTYWNA' : 'NIEAKTYWNA'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-xs text-gray-500 uppercase font-semibold">Budżet</span>
              <p className="text-2xl font-bold text-emerald-600">{formattedFund}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-xs text-gray-500 uppercase font-semibold">Lokalizacja</span>
              <div className="flex items-center gap-2 mt-1">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium text-gray-800">{campaign.town}</span>
                <span className="text-gray-400 text-sm">(+{campaign.radius} km)</span>
              </div>
            </div>

          </div>

          {campaign.keywords && (
            <div>
              <span className="text-xs text-gray-500 uppercase font-semibold block mb-2">Słowa kluczowe</span>
              <div className="flex flex-wrap gap-2">
                {campaign.keywords.map((kw, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
          >
            Zamknij
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};