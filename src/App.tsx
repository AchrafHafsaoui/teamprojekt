import React from 'react';

// Importing the components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Dashboard/Overview';

const App: React.FC = () => (
  <div className="flex flex-col bg-[#c6c6c6]">
    <Header />
    <div className="flex">
      <div className="w-20"> 
        <Sidebar />
      </div>
      <div className="flex-1 p-4"> 
      
      </div>
    </div>
  </div>
);

export default App;
