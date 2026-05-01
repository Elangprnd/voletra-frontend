'use client';

import React from 'react';
import Image from 'next/image';
import { Misi } from '@/types/misi';

interface MissionDetailCardProps {
  misi: Misi;
  onEdit?: () => void;
}

export default function MissionDetailCard({ misi, onEdit }: MissionDetailCardProps) {
  // Taking the first image as main, and the rest as gallery
  const mainImage = misi.foto?.[0] || 'https://via.placeholder.com/600x400';
  const galleryImages = misi.foto?.slice(1, 4) || [];

  return (
    <div className="bg-white rounded-[10px] p-[24px] relative shadow-sm">
      {/* Status Badge */}
      <div className="absolute top-[24px] left-[24px] z-10 bg-[#BCD1EF] px-[10px] py-[4px] rounded-tl-[6px] rounded-tr-[6px]">
        <p className="font-semibold text-[#0E2547] text-[14px]">
          {misi.status || 'Open'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-[24px] mt-[16px]">
        {/* Main Image */}
        <div className="relative w-full lg:w-[423px] h-[387px] rounded-[8px] overflow-hidden">
          <Image src={mainImage} alt={misi.judul} fill className="object-cover" />
        </div>

        {/* Info Content */}
        <div className="flex-1 flex flex-col">
          <h1 className="font-semibold text-[36px] text-black leading-tight mb-[16px]">
            {misi.judul}
          </h1>

          <p className="font-light text-[14px] text-black mb-[24px] leading-relaxed">
            {misi.deskripsi}
          </p>

          {/* Gallery - 3 images */}
          {galleryImages.length > 0 && (
            <div className="flex gap-[16px] mb-[24px]">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative w-[152px] h-[152px] rounded-[8px] overflow-hidden">
                  <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-[24px] gap-x-[16px] mt-auto">
            <div>
              <p className="text-[rgba(0,0,0,0.51)] text-[16px] mb-[4px]">Category</p>
              <p className="font-semibold text-black text-[16px]">{misi.kategori}</p>
            </div>
            <div>
              <p className="text-[rgba(0,0,0,0.51)] text-[16px] mb-[4px]">Number of Volunteers</p>
              <p className="font-semibold text-black text-[16px]">{misi.jumlah_relawan}</p>
            </div>
            <div>
              <p className="text-[rgba(0,0,0,0.51)] text-[16px] mb-[4px]">Link Contact</p>
              {misi.link_contact ? (
                <a href={misi.link_contact} target="_blank" rel="noreferrer" className="font-semibold text-black text-[16px] hover:underline break-all">
                  {misi.link_contact}
                </a>
              ) : (
                <p className="font-semibold text-black text-[16px]">-</p>
              )}
            </div>
            <div>
              <p className="text-[rgba(0,0,0,0.51)] text-[16px] mb-[4px]">Date Range</p>
              <p className="font-semibold text-black text-[16px]">
                {misi.tanggal_mulai && misi.tanggal_selesai
                  ? `${misi.tanggal_mulai} - ${misi.tanggal_selesai}`
                  : '-'}
              </p>
            </div>

            <div>
              <p className="text-[rgba(0,0,0,0.51)] text-[16px] mb-[4px]">Longitude</p>
              <p className="font-semibold text-black text-[16px]">{misi.longitude || '-'}</p>
            </div>
            <div>
              <p className="text-[rgba(0,0,0,0.51)] text-[16px] mb-[4px]">Latitude</p>
              <p className="font-semibold text-black text-[16px]">{misi.latitude || '-'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[rgba(0,0,0,0.51)] text-[16px] mb-[4px]">Location</p>
              <p className="font-semibold text-black text-[16px]">{misi.alamat}</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end mt-[32px]">
            <button
              onClick={onEdit}
              className="bg-[#3349C6] hover:bg-blue-800 text-[#EAF0FA] font-medium text-[16px] px-[24px] py-[10px] rounded-[10px] min-w-[293px] transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
