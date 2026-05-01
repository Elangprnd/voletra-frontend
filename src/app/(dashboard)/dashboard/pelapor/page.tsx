'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import Sidebar from '@/components/organism/Sidebar';

export default function PelaporDashboard() {
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

        <div className="bg-white rounded-[10px] shadow-sm p-12 min-h-[500px] flex flex-col items-center justify-center text-center">
          <div className="bg-blue-50 p-6 rounded-full mb-6">
            <svg className="w-16 h-16 text-[#2869CA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Belum ada tiket misi</h3>
          <p className="text-gray-500 max-w-sm mt-3 text-lg">
            Anda belum membuat tiket misi. Klik tombol "Buat Tiket Misi" untuk mulai meminta bantuan relawan.
          </p>
        </div>
      </main>
    </div>
  );
}