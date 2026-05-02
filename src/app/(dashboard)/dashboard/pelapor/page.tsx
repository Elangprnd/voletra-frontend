'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import Sidebar from '@/components/organism/Sidebar';
import MissionCard from '@/components/molecules/MissionCard';
import MissionSkeleton from '@/components/molecules/MissionSkeleton';
import StatsOverview from '@/components/molecules/StatsOverview';
import { MisiService } from '@/services/MisiService';
import { Misi } from '@/types/misi';

const TABS = ['All', 'Open', 'Ongoing', 'Completed'];

export default function PelaporDashboard() {
  const [missions, setMissions] = useState<Misi[]>([]);
  const [allMissions, setAllMissions] = useState<Misi[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilteredMissions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await MisiService.getByPelapor(activeTab);
      setMissions(data);
    } catch (err: unknown) {
      setError('Gagal memuat data misi. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  const fetchAllMissions = useCallback(async () => {
    try {
      const data = await MisiService.getByPelapor('All');
      setAllMissions(data);
    } catch (err) {
      console.error('Failed to fetch global stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchAllMissions();
  }, [fetchAllMissions]);

  useEffect(() => {
    fetchFilteredMissions();
  }, [fetchFilteredMissions]);

  return (
    <div className="flex min-h-screen bg-[#EAF0FA]">
      <Sidebar activeTab="home" />

      <main className="flex-1 ml-64 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#122F5B]">Dashboard Pelapor</h1>
            <p className="mt-2 text-sm text-gray-600">
              Kelola permintaan bantuan dan tiket misi Anda.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/dashboard/pelapor/buat-laporan">
              <Button>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Buat Tiket Misi
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics Overview */}
        <StatsOverview missions={allMissions} />

        {/* Tabs Filter */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-[#2869CA] text-[#2869CA]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {error && (
          <div className="bg-red-50 text-red-600 p-8 rounded-[10px] border border-red-200 text-center">
            <p className="mb-4 text-lg font-medium">{error}</p>
            <Button variant="secondary" onClick={fetchFilteredMissions}>Coba Lagi</Button>
          </div>
        )}

        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <MissionSkeleton key={i} />
              ))
            ) : missions.length > 0 ? (
              // Mission Cards
              missions.map((misi) => (
                <MissionCard key={misi.id} misi={misi} />
              ))
            ) : (
              // Empty State
              <div className="col-span-full bg-white rounded-[10px] shadow-sm p-12 flex flex-col items-center justify-center text-center">
                <div className="bg-blue-50 p-6 rounded-full mb-6">
                  <svg className="w-16 h-16 text-[#2869CA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Belum ada misi</h3>
                <p className="text-gray-500 max-w-sm mt-3 text-lg">
                  {activeTab === 'All' 
                    ? 'Anda belum membuat misi apa pun.' 
                    : `Tidak ada misi dengan status "${activeTab}".`}
                </p>
                {activeTab === 'All' && (
                  <Link href="/dashboard/pelapor/buat-laporan" className="mt-6">
                    <Button variant="secondary">Buat Misi Pertama</Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
