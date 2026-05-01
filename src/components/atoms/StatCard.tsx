import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color = 'text-blue-600' }) => {
  return (
    <div className="bg-white p-6 rounded-[10px] shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-3 rounded-full bg-opacity-10 bg-current ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-[#122F5B]">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
