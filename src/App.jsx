import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from './layout/layout.jsx';
import { HomePage } from './pages/homePage';
import { getAccountBalance } from './services/firebaseService.js';
import { EditCampaignPage } from './pages/editPage.jsx';
import { AddCampaignPage } from './pages/AddPage.jsx';

function App() {
  const [balance, setBalance] = useState(0);

useEffect(() => {
    const unsubscribe = getAccountBalance((data) => {
      if (data && data.balance !== undefined) {
        setBalance(data.balance);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
      <Routes>
        <Route path="/" element={<Layout balance={balance} />}>
          <Route index element={<HomePage />} />
          <Route path="edit/:id" element={<EditCampaignPage />} />
          <Route path="add" element={<AddCampaignPage />} />
        </Route>
      </Routes>
  );
}

export default App;