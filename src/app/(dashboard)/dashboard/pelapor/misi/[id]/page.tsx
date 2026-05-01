'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MisiService } from '@/services/MisiService';
import { Applicant, Misi } from '@/types/misi';
import MissionDetailCard from '@/components/organism/MissionDetailCard';
import ApplicantTable from '@/components/organism/ApplicantTable';
import Sidebar from '@/components/organism/Sidebar';
import { FiArrowLeft } from 'react-icons/fi';

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [misi, setMisi] = useState<Misi | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const [misiData, applicantsData] = await Promise.all([
          MisiService.getById(id),
          MisiService.getApplicants(id),
        ]);
        setMisi(misiData);
        setApplicants(applicantsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleApprove = async (applyId: string) => {
    try {
      setIsProcessing(true);
      await MisiService.approveApplicant(applyId);
      // Update local state
      setApplicants((prev) =>
        prev.map((app) =>
          app.apply_id === applyId ? { ...app, status: 'approved' } : app
        )
      );
    } catch (error) {
      console.error('Failed to approve applicant:', error);
      alert('Gagal menyetujui relawan.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecline = async (applyId: string) => {
    try {
      setIsProcessing(true);
      await MisiService.rejectApplicant(applyId);
      // Update local state
      setApplicants((prev) =>
        prev.map((app) =>
          app.apply_id === applyId ? { ...app, status: 'rejected' } : app
        )
      );
    } catch (error) {
      console.error('Failed to reject applicant:', error);
      alert('Gagal menolak relawan.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#EAF0FA]">
        <Sidebar activeTab="mission" />
        <main className="flex-1 ml-64 p-8">
          <div className="animate-pulse flex flex-col gap-6">
            <div className="h-[400px] bg-gray-200 rounded-[10px]"></div>
            <div className="h-[300px] bg-gray-200 rounded-[10px]"></div>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !misi) {
    return (
      <div className="flex min-h-screen bg-[#EAF0FA]">
        <Sidebar activeTab="mission" />
        <main className="flex-1 ml-64 p-8 flex flex-col items-center justify-center">
          <p className="text-red-500 font-medium text-lg mb-4">Gagal memuat data misi.</p>
          <button onClick={() => router.back()} className="text-blue-600 hover:underline">
            Kembali ke Dashboard
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#EAF0FA]">
      <Sidebar activeTab="mission" />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header / Back Button */}
        <div className="mb-[24px]">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-[8px] text-gray-600 hover:text-black transition-colors font-medium"
          >
            <FiArrowLeft className="text-[20px]" />
            Kembali
          </button>
        </div>

        <div className="flex flex-col gap-[24px]">
          {/* Mission Detail Card */}
          <MissionDetailCard 
            misi={misi} 
            onEdit={() => router.push(`/dashboard/pelapor/misi/${misi.id}/edit`)} 
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
