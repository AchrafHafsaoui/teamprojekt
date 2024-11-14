import React, { useState } from 'react';
import userIcon from '../assets/icons/menuLogo.svg';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex justify-end items-center fixed top-0 left-0 right-0 z-50">
      {/* Expandable Button with Embedded Menu Items */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`transition-all duration-500 ease-in-out border border-gray-300 shadow-md p-3 flex items-center ${
          isMenuOpen ? 'w-full py-4 bg-white bg-opacity-70 backdrop-blur-sm' : 'w-14 bg-white bg-opacity-60'
        }`}
        style={{
          borderRadius: isMenuOpen ? '0px' : '0px 0px 0px 15px', // Rounded only on the bottom-left corner when closed
        }}
      >
        {/* Menu Text & Options (Visible only when expanded, aligned from right to left) */}
        {isMenuOpen && (
          <div className="flex items-center space-x-14 text-gray-800 font-semibold text-lg ml-auto">
            {['support', 'account', 'settings'].map((label) => (
              <p
                key={label}
                className="relative group cursor-pointer text-lg"
              >
                <span>{label}</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </p>
            ))}
          </div>
        )}

        {/* User Icon (stays on the far right) */}
        <img
          src={userIcon}
          alt="User Icon"
          className={`transition-transform duration-300 ${
            isMenuOpen ? 'w-6 h-6 ml-14' : 'w-8 h-8'
          }`}
        />
      </button>
    </div>
  );
};

export default Header;
