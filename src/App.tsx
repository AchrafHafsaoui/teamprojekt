import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Dashboard/Overview';

const App: React.FC = () => (
  <div className="flex flex-col">
    <Header />
    <div className="flex">
      <Sidebar />
      {/* <Overview /> */}
    </div>
  </div>
);

export default App;
