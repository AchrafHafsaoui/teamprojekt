import React from 'react';

const Header: React.FC = () => {
  const headerItems = [
    { label: "Settings" },
    { label: "Account" },
    { label: "Support" },
  ];

  return (
    <div 
      className="flex justify-end items-center bg-gradient-to-r from-white via-gray-50 to-gray-100 p-2 border-b border-gray-200 fixed left-0 right-0 z-0 h-16 shadow-md"
      style={{ paddingLeft: '250px' }} 
    >
      <div className="flex space-x-6 mr-10 text-base items-center">
        {headerItems.map((item) => (
          <a
          key={item.label}
          href={`/${item.label.toLowerCase()}`} // Links to another page based on label
          className="flex items-center px-3 py-1 rounded transition-all duration-300 relative text-gray-700 hover:text-[rgb(7, 142, 205)]"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(7, 142, 205, 0.15)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span
            className="tracking-wide whitespace-nowrap text-gray-800"
            style={{
              textShadow: '0px 0px 2px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s ease', // Apply smooth transform
            }}
          >
            {item.label}
          </span>
        </a>
        
        ))}
      </div>
    </div>
  );
};

export default Header;
