import React from 'react';

const OverviewSection: React.FC = () => {
 return (
  <div className=" min-h-screen flex flex-col">
    <div className="flex flex-wrap gap-4 justify-center ">
      <div className="bg-white shadow-md rounded-lg h-96 min-w-[500px] flex-grow p-4">
        {/* Placeholder for Status of charging stations */}
      </div>
      <div className="bg-white shadow-md rounded-lg h-96 min-w-[500px] flex-grow p-4">
        {/* Placeholder for Status of the fleet */}
      </div>
      <div className="bg-white shadow-md rounded-lg h-96 min-w-[500px] flex-grow p-4">
        {/* Placeholder for Driving schedule */}
      </div>
      <div className="bg-white shadow-md rounded-lg h-96 min-w-[500px] flex-grow p-4">
        {/* Placeholder for Charging schedule */}
      </div>
    </div>
 </div>
  );
};

export default OverviewSection;
