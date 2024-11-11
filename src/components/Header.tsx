import React from 'react';
import userIcon from '../assets/icons/menuLogo.svg'; 

const Header: React.FC = () => (
  <div className="flex justify-end items-center bg-white p-1 border-none fixed left-0 right-0 z-0  h-20">
    <button className="flex justify-between mx-8 text-2xl items-center">
      <p className='mx-10 hover:underline'>settings</p>
      <p className='mx-10 hover:underline'>account</p>
      <p className='mx-10 hover:underline'>support</p>
    </button>
    <button>
      <img 
        src={userIcon} 
        alt="User Icon" 
        className="bg-white mx-10 w-8 h-8" 
      />
    </button>
  </div>
);

export default Header;