'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Applicant, Misi } from '@/types/misi';
import MissionDetailCard from '@/components/organism/MissionDetailCard';
import ApplicantTable from '@/components/organism/ApplicantTable';
import Sidebar from '@/components/organism/Sidebar';
import { FiArrowLeft } from 'react-icons/fi';

// Dummy Data
const DUMMY_MISI: Misi = {
  id: 'dummy-1',
  judul: 'Digital Mengajar',
  deskripsi: 'Program ini untuk meningkatkan literasi dan keterampilan teknologi masyarakat, khususnya dalam membantu mereka memahami penggunaan perangkat digital secara efektif. Kegiatan ini difokuskan pada wilayah yang kurang memiliki pemahaman teknologi, dengan mempertimbangkan kondisi infrastruktur, serta potensi pengembangan keterampilan digital di lingkungan tersebut.',
  kategori: 'Technology',
  alamat: 'Lombok Timur, Nusa Tenggara Barat',
  longitude: -8.8896977,
  latitude: 116.4618397,
  link_contact: 'https://chat.whatsapp.com/bismilahirahmanirahim',
  jumlah_relawan: 20,
  tanggal_mulai: '12 April 2026',
  tanggal_selesai: '20 April 2026',
  foto: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400',
  ],
  status: 'Open',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const DUMMY_APPLICANTS: Applicant[] = [
  {
    apply_id: 'app-1',
    user_id: 'u-1',
    nama: 'Adit Jarwo',
    tanggal_lahir: '05/04/2000',
    phone: '08123456789',
    skill: 'Skill Budi',
    domisili: 'Lombok',
    status: 'pending',
  },
  {
    apply_id: 'app-2',
    user_id: 'u-2',
    nama: 'Sopo Jarwo',
    tanggal_lahir: '10/08/1998',
    phone: '08198765432',
    skill: 'Management',
    domisili: 'Mataram',
    status: 'pending',
  },
];

export default function DummyMissionDetailPage() {
  const router = useRouter();
  const [applicants, setApplicants] = useState<Applicant[]>(DUMMY_APPLICANTS);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = (applyId: string) => {
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setApplicants((prev) =>
        prev.map((app) => (app.apply_id === applyId ? { ...app, status: 'approved' } : app))
      );
      setIsProcessing(false);
    }, 1000);
  };

  const handleDecline = (applyId: string) => {
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setApplicants((prev) =>
        prev.map((app) => (app.apply_id === applyId ? { ...app, status: 'rejected' } : app))
      );
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#EAF0FA]">
      <Sidebar activeTab="mission" />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-[24px] flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-[8px] text-gray-600 hover:text-black transition-colors font-medium"
          >
            <FiArrowLeft className="text-[20px]" />
            Kembali
          </button>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
            DUMMY MODE
          </span>
        </div>

        <div className="flex flex-col gap-[24px]">
          {/* Mission Detail Card */}
          <MissionDetailCard 
            misi={DUMMY_MISI} 
            onEdit={() => alert('Edit clicked (Dummy Mode)')} 
          />

          {/* Applicants Table */}
          <ApplicantTable 
            applicants={applicants}
            onApprove={handleApprove}
            onDecline={handleDecline}
            isProcessing={isProcessing}
          />
        </div>
      </main>
    </div>
  );
}
