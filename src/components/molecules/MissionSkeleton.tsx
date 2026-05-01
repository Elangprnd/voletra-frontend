import React from 'react';

const MissionSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[10px] shadow-sm border overflow-hidden flex flex-col sm:flex-row h-full animate-pulse">
      <div className="sm:w-1/3 h-48 sm:h-auto bg-gray-200"></div>
      
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>
        </div>
        
        <div className="flex justify-end mt-4">
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default MissionSkeleton;
