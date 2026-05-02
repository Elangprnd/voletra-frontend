"use client";
import Hero from "@/app/components/organism/Hero";
import AuthModal from "@/app/components/organism/AuthModal";
import MissionSection from "@/app/components/MissionSection";

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
          <div className="w-full h-72 bg-gray-100 rounded-2xl mb-8 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
            🗺️ Map akan ditampilkan di sini (CAP-71)
          </div>

          {/* Mission Cards */}
          <MissionSection />
        </div>
      </section>

      <AuthModal />
    </>
  );
}
