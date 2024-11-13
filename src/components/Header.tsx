import React, { useState } from 'react';
import userIcon from '../assets/icons/menuLogo.svg';


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex justify-end items-center bg-white bg-opacity-0 p-1 border-none fixed left-0 right-0 mt-5">
      <div className={`transition-all transform duration-500  ${isMenuOpen ? ' translate-x-0 opacity-100' : ' translate-x-20 opacity-0'}`} style={{ visibility: isMenuOpen ? 'visible' : 'hidden' }}>
        <div className="flex justify-between mx-8 text-2xl items-center">
          <p className="mx-5 mb-2 text-xl relative group">
            <span className=" hover:cursor-pointer">settings</span>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all group-hover:w-full duration-300"></span>
          </p>
          <p className="mx-5 mb-2 text-xl relative group">
            <span className=" hover:cursor-pointer">account</span>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all group-hover:w-full duration-300"></span>
          </p>
          <p className="mx-5 mb-2 text-xl relative group">
            <span className=" hover:cursor-pointer">support</span>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all group-hover:w-full duration-300"></span>
          </p>
        </div>
      </div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`mr-5 border border-[#D3D3D3] shadow-md rounded-full p-3 bg-opacity-50 ${isMenuOpen ? ' bg-[#d6d6d682] backdrop-blur-sm' : ' bg-white bg-opacity-60'}`} >
        <img
          src={userIcon}
          alt="User Icon"
          className=' w-8 h-8 '
        />
      </button>
    </div>
  )
};

export default Header;