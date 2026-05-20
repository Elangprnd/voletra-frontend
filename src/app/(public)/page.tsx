"use client";

import Hero from "@/components/organism/Hero";
import AuthModal from "../../components/organism/AuthModal";
import MissionSection from "@/components/organism/PublicMissionSection";
import dynamic from "next/dynamic";

const MapWrapper = dynamic(
  () => import("@/components/molecules/MapWrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-normal border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export default function Home() {
  return (
    <>
      <Hero />

      <section id="mission-section" className="py-16 px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-normal text-center mb-10">
            Find Your Next Volunteer Opportunity
          </h2>

          {/* Peta */}
          <div className="w-full h-72 bg-gray-100 rounded-2xl mb-10 overflow-hidden border border-gray-200">
            <MapWrapper />
          </div>

          {/* Filter + List Misi */}
          <MissionSection />
        </div>
      </section>

      <AuthModal />
    </>
  );
}
