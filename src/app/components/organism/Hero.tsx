"use client";
import Image from "next/image";

export default function Hero() {
  const handleScroll = () => {
    document
      .getElementById("mission-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-primary-light flex items-center px-16 pt-20">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text */}
        <div className="flex-1 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            <span className="text-primary-normal">Online Volunteer</span>
            <br />
            <span className="text-gray-900">Deployment Center</span>
          </h1>
          <p className="text-gray-600 text-base leading-relaxed mb-10">
            Platform terpusat untuk memetakan laporan darurat dan mencocokkannya
            dengan relawan yang tepat secara real-time, dengan sistem seleksi
            terverifikasi yang memastikan setiap bantuan tersalurkan secara
            efektif.
          </p>
          <button
            onClick={handleScroll}
            className="flex items-center gap-3 bg-primary-normal text-white px-7 py-4 rounded-full font-semibold text-base hover:bg-primary-normalHover transition-colors shadow-md"
          >
            Start Volunteering
            <span className="bg-white text-primary-normal rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg">
              →
            </span>
          </button>
        </div>

        {/* Image */}
        <div>
          <Image
            src="/images/hero_image.png"
            alt="Volunteers"
            width={500}
            height={500}
            className="rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
