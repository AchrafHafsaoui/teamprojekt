import React from 'react';
import logo from '../images/logo.png';
import userIcon from '../images/icons/user_icon.svg'; 

const Header: React.FC = () => (
  <div className="flex justify-between items-center bg-gray-800 p-1 border-b border-gray-700 fixed top-0 left-0 right-0 z-10">
    <img src={logo} alt="Logo" className="h-8" /> {/* Logo */}
    <div className="flex space-x-2">
      <button className="text-gray-400">
        <img src={userIcon} alt="User Icon" style={{width: '40px', height:'40px'}} className='bg-white' /> {/* SVG Icon */}
      </button>
    </div>
  </div>
);

export default Header;
