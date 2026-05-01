import React from 'react';
import Link from 'next/link';
import { Misi } from '@/types/misi';
import StatusBadge from '../atoms/StatusBadge';
import Button from '../atoms/Button';

interface MissionCardProps {
  misi: Misi;
}

const MissionCard: React.FC<MissionCardProps> = ({ misi }) => {
  // Use first photo or a placeholder
  const thumbnail = misi.foto && misi.foto.length > 0 
    ? (misi.foto[0].startsWith('http') ? misi.foto[0] : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${misi.foto[0]}`)
    : 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="h-48 relative">
        <img 
          src={thumbnail} 
          alt={misi.judul} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <StatusBadge status={misi.status} />
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#122F5B] mb-2 line-clamp-1">{misi.judul}</h3>
          <div className="flex items-start text-gray-500 mb-3">
            <svg className="w-5 h-5 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm line-clamp-2 leading-relaxed">{misi.alamat}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
             <svg className="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
             </svg>
             <span>{misi.jumlah_relawan} Relawan dibutuhkan</span>
          </div>
        </div>
        
        <div className="mt-auto flex justify-end">
          <Link href={`/dashboard/pelapor/misi/${misi.id}`} className="w-full">
            <button className="w-full bg-[#2869CA] text-white py-2.5 rounded-[10px] font-medium hover:bg-blue-700 transition-all text-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
