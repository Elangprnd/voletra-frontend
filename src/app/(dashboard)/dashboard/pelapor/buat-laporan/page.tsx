'use client';

import React from 'react';
import FormTicketMisi from '@/components/organism/FormTicketMisi';
import Sidebar from '@/components/organism/Sidebar';

const BuatLaporanPage = () => {
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
