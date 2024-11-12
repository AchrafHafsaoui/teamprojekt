import React, { useState } from 'react';
import userIcon from '../assets/icons/menuLogo.svg'; 


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return(
  <div className="flex justify-end items-center bg-white p-1 border-none fixed left-0 right-0 z-0  h-20">
    <div className={`transition-transform duration-500 ease-in-out ${isMenuOpen ? ' translate-x-0 opacity-100' : ' translate-x-1/4 opacity-0'}`}>
  {
    isMenuOpen&&(
      <div className="flex justify-between mx-8 text-2xl items-center">
      <p className='mx-10 hover:underline hover:cursor-pointer'>settings</p>
      <p className='mx-10 hover:underline hover:cursor-pointer'>account</p>
      <p className='mx-10 hover:underline hover:cursor-pointer'>support</p>
    </div> 
    )
  }
  </div>
    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}>
      <img 
        src={userIcon} 
        alt="User Icon" 
        className="bg-white mx-10 w-8 h-8" 
      />
    </button>
  </div>
)};

export default Header;