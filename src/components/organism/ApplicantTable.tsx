'use client';

import React from 'react';
import Image from 'next/image';
import { Applicant } from '@/types/misi';
import { FiFileText } from 'react-icons/fi';

interface ApplicantTableProps {
  applicants: Applicant[];
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
  isProcessing?: boolean;
}

export default function ApplicantTable({ applicants, onApprove, onDecline, isProcessing }: ApplicantTableProps) {
  if (!applicants || applicants.length === 0) {
    return (
      <div className="bg-white rounded-[10px] p-[24px] shadow-sm min-h-[200px] flex items-center justify-center">
        <p className="text-gray-500 font-medium">Belum ada pelamar</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[10px] p-[24px] shadow-sm overflow-x-auto">
      <h2 className="font-semibold text-[20px] text-black mb-[24px]">Member</h2>
      <table className="w-full min-w-[1000px] text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b border-[rgba(0,0,0,0.5)] p-[10px] font-medium text-[16px] text-black w-[20%]">Name</th>
            <th className="border-b border-[rgba(0,0,0,0.5)] p-[10px] font-medium text-[16px] text-black w-[15%]">Date of Birth</th>
            <th className="border-b border-[rgba(0,0,0,0.5)] p-[10px] font-medium text-[16px] text-black w-[20%]">Phone Number</th>
            <th className="border-b border-[rgba(0,0,0,0.5)] p-[10px] font-medium text-[16px] text-black w-[15%]">Skill</th>
            <th className="border-b border-[rgba(0,0,0,0.5)] p-[10px] font-medium text-[16px] text-black w-[30%]">Domicile</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.apply_id}>
              <td className="border-b border-[rgba(0,0,0,0.12)] p-[10px]">
                <div className="flex items-center gap-[10px]">
                  <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden bg-gray-200 shrink-0">
                    {/* Placeholder avatar */}
                    <Image src="https://via.placeholder.com/48" alt={applicant.nama} fill className="object-cover" />
                  </div>
                  <p className="font-medium text-[16px] text-black">{applicant.nama}</p>
                </div>
              </td>
              <td className="border-b border-[rgba(0,0,0,0.12)] p-[10px]">
                <p className="font-medium text-[16px] text-black">{applicant.tanggal_lahir || '-'}</p>
              </td>
              <td className="border-b border-[rgba(0,0,0,0.12)] p-[10px]">
                <p className="font-medium text-[16px] text-black">{applicant.phone || '-'}</p>
              </td>
              <td className="border-b border-[rgba(0,0,0,0.12)] p-[10px]">
                <div className="flex items-center gap-[8px]">
                  <FiFileText className="text-[20px]" />
                  <p className="font-medium text-[16px] text-black">{applicant.skill || '-'}</p>
                </div>
              </td>
              <td className="border-b border-[rgba(0,0,0,0.12)] p-[10px]">
                <div className="flex items-center justify-between gap-[16px]">
                  <p className="font-medium text-[16px] text-black">{applicant.domisili || '-'}</p>
                  
                  {applicant.status === 'pending' ? (
                    <div className="flex gap-[8px]">
                      <button
                        onClick={() => onDecline(applicant.apply_id)}
                        disabled={isProcessing}
                        className="bg-[#BCD1EF] text-[#1E4F98] hover:bg-blue-200 font-medium text-[16px] px-[24px] py-[6px] rounded-[10px] w-[110px] transition-colors disabled:opacity-50"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => onApprove(applicant.apply_id)}
                        disabled={isProcessing}
                        className="bg-[#2869CA] text-white hover:bg-blue-700 font-medium text-[16px] px-[24px] py-[6px] rounded-[10px] w-[110px] transition-colors disabled:opacity-50"
                      >
                        Approve
                      </button>
                    </div>
                  ) : (
                    <span className={`font-medium px-3 py-1 rounded-full text-sm ${applicant.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
