'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MisiService } from '@/services/MisiService';
import { CreateMisiRequest } from '@/types/misi';
import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import Select from '../atoms/Select';
import Button from '../atoms/Button';
import FileUpload from '../atoms/FileUpload';
import FormField from '../molecules/FormField';

const CATEGORY_OPTIONS = [
  { label: 'Bencana Alam', value: 'Bencana Alam' },
  { label: 'Kesehatan', value: 'Kesehatan' },
  { label: 'Edukasi', value: 'Edukasi' },
  { label: 'Lingkungan', value: 'Lingkungan' },
  { label: 'Lainnya', value: 'Lainnya' },
];

const FormTicketMisi: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<CreateMisiRequest, 'foto'>>({
    judul: '',
    deskripsi: '',
    kategori: '',
    alamat: '',
    jumlah_relawan: 1,
  });
  const [fotos, setFotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'jumlah_relawan' ? parseInt(value) || 0 : value,
    }));
    // Clear error when user typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (files: File[]) => {
    setFotos(files);
    if (errors.foto) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.foto;
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.judul) newErrors.judul = 'Judul misi wajib diisi';
    if (!formData.deskripsi) newErrors.deskripsi = 'Deskripsi wajib diisi';
    if (!formData.kategori) newErrors.kategori = 'Kategori wajib diisi';
    if (!formData.alamat) newErrors.alamat = 'Alamat wajib diisi';
    if (formData.jumlah_relawan <= 0) newErrors.jumlah_relawan = 'Jumlah relawan harus lebih dari 0';
    if (fotos.length === 0) newErrors.foto = 'Foto minimal 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setIsLoading(true);
    try {
      await MisiService.create({
        ...formData,
        foto: fotos,
      });
      router.push('/dashboard/pelapor');
    } catch (error: any) {
      setApiError(error.response?.data?.error || 'Gagal membuat misi. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-white p-10 rounded-[10px] shadow-sm">
      <div className="absolute right-6 top-6 cursor-pointer text-gray-400 hover:text-gray-600" onClick={() => router.back()}>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>

      <h2 className="text-2xl font-semibold mb-10 text-black">Add New Mission</h2>
      
      {apiError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
          {apiError}
        </div>
      )}

      <div className="space-y-6">
        <FormField label="Title" error={errors.judul} required>
          <Input
            name="judul"
            placeholder=""
            value={formData.judul}
            onChange={handleChange}
            error={errors.judul}
          />
        </FormField>

        <FormField label="Description" error={errors.deskripsi} required>
          <TextArea
            name="deskripsi"
            rows={4}
            placeholder=""
            value={formData.deskripsi}
            onChange={handleChange}
            error={errors.deskripsi}
          />
        </FormField>

        <FormField label="Category" error={errors.kategori} required>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, kategori: opt.value }))}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm transition-all ${
                  formData.kategori === opt.value
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className={`w-3 h-3 rounded-full border ${formData.kategori === opt.value ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-400'}`} />
                {opt.label}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Number of Volunteers" error={errors.jumlah_relawan} required>
          <Input
            name="jumlah_relawan"
            type="number"
            min="1"
            value={formData.jumlah_relawan}
            onChange={handleChange}
            error={errors.jumlah_relawan}
          />
        </FormField>

        <FormField label="Location" error={errors.alamat} required>
          <Input
            name="alamat"
            placeholder=""
            value={formData.alamat}
            onChange={handleChange}
            error={errors.alamat}
          />
        </FormField>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <FormField label="Longitude">
              <Input placeholder="" />
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Latitude">
              <Input placeholder="" />
            </FormField>
          </div>
        </div>

        <FormField label="Date Range">
          <Input placeholder="" />
        </FormField>

        <FormField label="Link Contact">
          <Input placeholder="" />
        </FormField>

        <FormField label="Image" error={errors.foto} required>
          <FileUpload onChange={handleFileChange} error={errors.foto} />
        </FormField>
      </div>

      <div className="mt-12 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#2869CA] text-[#EAF0FA] px-16 py-3 rounded-[10px] font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default FormTicketMisi;
