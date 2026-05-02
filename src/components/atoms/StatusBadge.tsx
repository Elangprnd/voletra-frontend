import React from 'react';
import { MisiStatus } from '@/types/misi';

interface StatusBadgeProps {
  status: MisiStatus | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case 'Open':
        return 'bg-[#E7F7EF] text-[#0D9488] border-[#B2E7D1]'; // Teal/Green
      case 'Ongoing':
        return 'bg-[#EAF0FA] text-[#2869CA] border-[#BCD1EF]'; // Primary Blue
      case 'Completed':
        return 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]'; // Gray
      default:
        return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  return (
    <span className={`px-4 py-1 rounded-full text-[12px] font-medium border ${getStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
