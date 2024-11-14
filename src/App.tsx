import React from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Dashboard/Overview';

const App: React.FC = () => (
  <div className="flex flex-col min-h-screen h-full w-full">
    {/* Background styling */}
    <div
      className="fixed min-h-screen min-w-full"
      style={{
        backgroundImage: `url('/src/assets/blue_background_abstract.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light overlay
        backgroundBlendMode: 'overlay', // Overlay to soften the image
      }}
    />
    {/* Content wrapper with higher z-index to sit above the background */}
    <div className="z-10 flex flex-grow h-full">
      <Sidebar />
      <div className="flex-grow">
        <Overview />
      </div>
    </div>
  </div>
);

export default App;
