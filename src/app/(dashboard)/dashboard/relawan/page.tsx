"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
// import Button from "@/components/atoms/Button";
import Sidebar from "@/components/organism/Sidebar";
// import MissionCard from "@/components/molecules/MissionCard"; 
// import MissionSkeleton from "@/components/molecules/MissionSkeleton";
// import MissionDetailCard from "@/components/organism/MissionDetailCard"; Kalo BE udah siap 
import { MisiService } from "@/services/MisiService";
import { Misi } from "@/types/misi";
import { useAuthStore } from "@/app/store/authStore";
import MapWrapper from "@/components/molecules/MapWrapper";
import MissionSection from "@/components/organism/PublicMissionSection";

export default function RelawanDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [missions, setMissions] = useState<Misi[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk in-place detail view
  const [selectedMisi, setSelectedMisi] = useState<Misi | null>(null);

  const fetchFilteredMissions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Mengambil daftar seluruh misi untuk relawan
      const data = await MisiService.getMisi();

      // Filter client-side berdasarkan tab status
      if (activeTab === "All") {
        setMissions(data);
      } else {
        setMissions(
          data.filter((m) => m.status.toLowerCase() === activeTab.toLowerCase())
        );
      }
    } catch (err: unknown) {
      setError("Gagal memuat data misi. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchFilteredMissions();
  }, [fetchFilteredMissions]);

  // Fungsi penanganan ketika relawan menekan tombol registrasi di dalam detail misi (BUAT KALO BE SIAP)
  const handleRegisterMisi = async () => {
    if (!selectedMisi) return;
    try {
      // Jalankan fungsi integrasi API register jika sudah tersedia di backend Anda:
      // await MisiService.applyMisi(selectedMisi.id);

      alert(`Berhasil mendaftar ke misi: ${selectedMisi.judul}`);
      setSelectedMisi(null);

      // Arahkan ke menu histori pendaftaran relawan
      router.push("/dashboard/relawan/misi");
    } catch (err) {
      console.error("Gagal mendaftar misi:", err);
      alert("Gagal mendaftar ke misi. Silakan coba lagi.");
    }
  };

  return (
    <div className="ml-64 flex flex-col min-h-screen bg-primary-light">
      <main className="m-25">
        {/* Mengeset sidebar aktif ke menu home */}
        <Sidebar />
        <div className="bg-gray-100 rounded-2xl mb-10 overflow-hidden border border-gray-200">
          <MapWrapper />
        </div>

        <MissionSection />
      </main>
    </div>
  );
}
