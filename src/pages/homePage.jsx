import React, { useEffect, useState } from 'react';
import { getCampaigns, deleteCampaign } from '../services/firebaseService.js';
import { CampaignCard } from '../components/campaignCard.jsx';
import { CampaignDetailModal } from '../components/campaignDetailModal.jsx';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCampaign, setSelectedCampaign] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCampaigns();
                setCampaigns(data);
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeleteCampaign = async (campaignId) => {
        try {
            await deleteCampaign(campaignId);
            setSelectedCampaign(null);
            setCampaigns((prevCampaigns) => prevCampaigns.filter(camp => camp.id !== campaignId));
        } catch (error) {
            alert("Wystąpił błąd podczas usuwania kampanii.");
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-5">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Twoje Kampanie</h1>
                </div>
                <a href="/add">
                <button className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20 flex items-center gap-2">
                    <span>+</span> Dodaj Kampanię
                </button>
                </a>
            </div>

            {campaigns.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {campaigns.map((camp) => (
                        <CampaignCard 
                        key={camp.id}
                        campaign={camp}
                        onDetailsClick={(campaign) => setSelectedCampaign(campaign)} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <span className="text-2xl">📭</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Brak aktywnych kampanii</h3>
                </div>
            )}
            <CampaignDetailModal 
                campaign={selectedCampaign} 
                onClose={() => setSelectedCampaign(null)} 
                onDelete={handleDeleteCampaign}
            />
        </div>
    );
};