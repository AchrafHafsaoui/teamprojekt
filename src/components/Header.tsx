import React from 'react';
import userIcon from '../assets/icons/menuLogo.svg'; 

const Header: React.FC = () => (
  <div className="flex justify-end items-center bg-white p-1 border-none fixed top-0 left-0 right-0 z-0">
    <div className="flex justify-between mx-15 text-lg items-center">
    <p className='mx-10 hover:underline'>settings</p>
    <p className='mx-10 hover:underline'>account</p>
    <p className='mx-10 hover:underline'>support</p>
    </div>
    <img 
      src={userIcon} 
      alt="User Icon" 
      className="bg-white mx-10 w-8 h-8" 
    />
  </div>
);

export default Header;
