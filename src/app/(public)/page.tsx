"use client";
<<<<<<< HEAD:src/app/page.tsx
import Hero from "./components/organism/Hero";
import AuthModal from "./components/organism/AuthModal";
import MissionSection from "./components/MissionSection";
import dynamic from "next/dynamic";
import { useAuthStore } from "./store/authStore";
=======
import Hero from "@/app/components/organism/Hero";
import AuthModal from "@/app/components/organism/AuthModal";
import MissionSection from "@/app/components/MissionSection";
>>>>>>> 2d53d400d9f3a11cf262147eb3ad33cd37275960:src/app/(public)/page.tsx

const MapWrapper = dynamic(() => import('@/app/components/organism/MapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary-normal border-t-transparent rounded-full animate-spin" />
    </div>
  )
})

export default function Home() {
  return (
    <>
      <Hero />

      {/* Mission Section - target scroll dari CTA */}
      <section id="mission-section" className="py-16 px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-normal text-center mb-10">
            Find Your Next Volunteer Opportunity
          </h2>

          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary-normal"
            />
            <select className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none text-gray-500">
              <option>Your Location</option>
              <option>Jakarta</option>
              <option>Bandung</option>
              <option>Surabaya</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              "Emergency Response",
              "Education",
              "Logistics",
              "Technology",
              "Healthcare",
              "Music",
              "Elderly Care",
              "Environment",
            ].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  className="accent-primary-normal"
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-72 bg-gray-100 rounded-2xl mb-40 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
            <MapWrapper />
          </div>

          {/* Mission Cards */}
          <MissionSection />
        </div>
      </section>

      <AuthModal />
    </>
  );
}
