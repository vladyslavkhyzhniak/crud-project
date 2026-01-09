import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from './layout/layout.jsx';
import { HomePage } from './pages/homePage';
import { getAccountBalance } from './services/firebaseService.js';

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const data = await getAccountBalance();
        setBalance(data);
      } catch (err) {
        console.error("Błąd pobierania salda:", err);
      }
    };
    fetchBalance();
  }, []);

  return (
      <Routes>
        <Route path="/" element={<Layout balance={balance} />}>
          <Route index element={<HomePage />} />

        </Route>
      </Routes>
  );
}

export default App;