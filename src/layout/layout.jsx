import { Outlet } from 'react-router-dom';
import { Header } from './header'; 
import { Footer } from './footer';


export const Layout = ({ balance }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Header balance={balance || 0} /> 

      <main className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

        <Outlet />
      </main>
      <Footer />
    </div>
  );
};