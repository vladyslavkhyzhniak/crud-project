import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CampaignForm } from '../components/campaignForm'; 
import { getCampaignById, updateCampaign } from '../services/firebaseService';

export const EditCampaignPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaignById(id); 
        setCampaign(data);
      } catch (error) {
        console.error("Błąd:", error);
        alert("Nie udało się pobrać kampanii.");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id, navigate]);


  const handleEditSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await updateCampaign(id, formData);
      navigate('/'); 
    } catch (error) {
      console.error("Błąd zapisu:", error);
      alert("Wystąpił błąd podczas zapisywania.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edytuj Kampanię</h1>
      
      <CampaignForm 
        initialData={campaign} 
        onSubmit={handleEditSubmit} 
        isSubmitting={isSubmitting}
      />
      
      <button 
        onClick={() => navigate('/')}
        className="mt-6 text-gray-500 hover:text-gray-800 text-sm underline"
      >
        Anuluj i wróć
      </button>
    </div>
  );
};