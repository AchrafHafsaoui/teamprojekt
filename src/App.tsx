import React from 'react';

// Importing the components we’ll create below
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Dashboard/Overview';

const App: React.FC = () => (
  <div className="h-screen flex flex-col bg-[#D9D9D9]">
    <Header /> 
    <div className="flex flex-1">
      <div className="w-48"> {/* Container for Sidebar with fixed width */}
        <Sidebar />
      </div>
      <div className="flex-1 p-4"> {/* Main content area takes the remaining width */}
        <Overview /> 
      </div>
    </div>
  </div>
);

export default App;