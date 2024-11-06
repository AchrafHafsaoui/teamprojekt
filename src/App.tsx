import React from 'react';

// Importing the components we’ll create below
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => (
  <div className="h-screen flex flex-col bg-black">
    <Header /> {/* Header at the top taking full width */}
    <div className="flex flex-1">
      <Sidebar /> {/* Sidebar under the header */}
    </div>
  </div>
);

export default App;
