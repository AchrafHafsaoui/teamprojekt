import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Dashboard/Overview';

const App: React.FC = () => (
  <div className="flex flex-col min-h-screen"style={{
                backgroundImage: `url('/src/assets/blue_background_abstract.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light overlay
                backgroundBlendMode: 'overlay', // Overlay to soften the image
            }}>
    <Header />
    <div className="flex">
      <Sidebar />
      <Overview />
    </div>
  </div>
);

export default App;
