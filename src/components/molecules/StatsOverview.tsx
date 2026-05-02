import React from 'react';
import StatCard from '../atoms/StatCard';
import { Misi } from '@/types/misi';

interface StatsOverviewProps {
  missions: Misi[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ missions }) => {
  const totalMissions = missions.length;
  const activeMissions = missions.filter(m => m.status === 'Ongoing').length;
  const completedMissions = missions.filter(m => m.status === 'Completed').length;
  const openMissions = missions.filter(m => m.status === 'Open').length; // Assuming Open = Pending Review or similar context
  
  // Total volunteers is a sum of 'jumlah_relawan' for all missions
  const totalVolunteers = missions.reduce((acc, curr) => acc + curr.jumlah_relawan, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      <StatCard 
        label="Total Missions" 
        value={totalMissions} 
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
      />
      <StatCard 
        label="Active Missions" 
        value={activeMissions} 
        color="text-blue-500"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />
      <StatCard 
        label="Completed" 
        value={completedMissions} 
        color="text-green-500"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        }
      />
      <StatCard 
        label="Total Volunteers" 
        value={totalVolunteers} 
        color="text-purple-500"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        }
      />
      <StatCard 
        label="Pending Review" 
        value={openMissions} 
        color="text-orange-500"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  );
};

export default StatsOverview;
