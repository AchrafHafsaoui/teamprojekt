import React from 'react';
import ChargingStationsStatus from './CharginStationsStatus';

const OverviewSection: React.FC = () => {
 return (
  <div className=" min-h-screen flex flex-col">
    <div className="flex flex-wrap gap-4 justify-center ">
      <div className="bg-white shadow-md rounded-lg h-96 min-w-[500px] flex-grow">
      <ChargingStationsStatus />
      </div>
      <div className="bg-white shadow-md rounded-lg h-96 min-w-[500px] flex-grow">
      {/* Placeholder for  */}
      </div>
      <div className="bg-white shadow-md rounded-lg h-96 min-w-[500px] flex-grow">
        {/* Placeholder for Driving schedule */}
      </div>
      <div className="bg-white shadow-md rounded-lg h-96 min-w-[500px] flex-grow">
        {/* Placeholder for Charging schedule */}
      </div>
    </div>
 </div>
  );
};

export default OverviewSection;
