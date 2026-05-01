'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import FormTicketMisi from '@/components/organism/FormTicketMisi';
import Sidebar from '@/components/organism/Sidebar';

const BuatLaporanPage = () => {
  const { role, token } = useAuthStore();
  const router = useRouter();

  /* 
  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else if (role !== 'pelapor') {
      router.push('/dashboard'); 
    }
  }, [token, role, router]);

  if (!token || role !== 'pelapor') {
    return null; 
  }
  */

  return (
    <div className="flex min-h-screen bg-[#EAF0FA]">
      <Sidebar activeTab="mission" />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <FormTicketMisi />
        </div>
      </main>
    </div>
  );
};

export default BuatLaporanPage;
