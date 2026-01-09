import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignForm } from '../components/campaignForm'; 
import { addCampaign } from '../services/firebaseService'; 

export const AddCampaignPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError , setError] = useState(null);

  const handleAddSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await addCampaign(formData);

      navigate('/');
    } catch (error) {
      setError(error);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Nowa Kampania</h1>
      {isError && <p className="text-red-500 mb-4 bg-red-300 p-2 rounded w-1/2">{isError}</p>}

      <CampaignForm 
        onSubmit={handleAddSubmit} 
        isSubmitting={isSubmitting}
      />
      
      <button 
        onClick={() => navigate('/')}
        className="mt-6 text-gray-500 hover:text-gray-800 text-sm underline block"
      >
        Anuluj i wróć
      </button>
    </div>
  );
};