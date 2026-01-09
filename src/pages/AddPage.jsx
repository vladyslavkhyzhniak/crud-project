import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignForm } from '../components/campaignForm'; 
import { addCampaign } from '../services/firebaseService'; 

export const AddCampaignPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleAddSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await addCampaign(formData);

      navigate('/');
    } catch (error) {
      console.error("Błąd dodawania:", error);
      
      alert(typeof error === 'string' ? error : "Wystąpił błąd podczas tworzenia kampanii.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Nowa Kampania</h1>

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