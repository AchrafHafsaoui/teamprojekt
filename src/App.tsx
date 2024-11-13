import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Dashboard/Overview';

const App: React.FC = () => (
  <div
    className="flex flex-col min-h-screen h-full w-full"
  >
    <div className="fixed min-h-screen min-w-full" style={{
      backgroundImage: `url('/src/assets/blue_background_abstract.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light overlay
      backgroundBlendMode: 'overlay', // Overlay to soften the image
    }} />
    <div className='z-10'>
      <Header />
      <div className="flex flex-grow h-full">
        <Sidebar />
        <Overview />
      </div>
    </div>
  </div>
);

export default App;
