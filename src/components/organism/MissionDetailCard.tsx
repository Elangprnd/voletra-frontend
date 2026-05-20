'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Misi } from '@/types/misi';
import StatusBadge from '@/components/atoms/StatusBadge';

interface MissionDetailCardProps {
  misi: Misi;
  onBack?: () => void;     // Diubah menjadi opsional agar halaman pelapor lama tidak error jika belum passing ini
  onRegister?: () => void; // Opsional
  onEdit?: () => void;     // Opsional
}

export default function MissionDetailCard({ 
  misi, 
  onBack, 
  onRegister, 
  onEdit 
}: MissionDetailCardProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Deteksi role secara aman berdasarkan segmentasi URL path
  const isPelapor = pathname?.includes('/dashboard/pelapor');
  const isRelawan = pathname?.includes('/dashboard/relawan');

  // fallback jika data foto kosong atau tidak terdefinisi
  const mainImage =
    misi?.foto && misi.foto.length > 0
      ? misi.foto[0].startsWith('http')
        ? misi.foto[0]
        : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${misi.foto[0]}`
      : null;

  const galleryImages = (misi?.foto || []).slice(1, 4).map((f) =>
    f.startsWith('http') ? f : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${f}`
  );

  // Navigasi tombol kembali dengan fallback jika onBack tidak di-passing dari parent
  const handleBackAction = () => {
    if (onBack) {
      onBack();
    } else {
      router.back(); // Jika tidak ada fungsi onBack, otomatis gunakan history back bawaan browser
    }
  };

  // Logika aksi tombol utama di bagian bawah
  const handlePrimaryAction = () => {
    if (isPelapor) {
      if (onEdit) {
        onEdit();
      } else {
        // Jika pelapor belum mengimplementasikan fungsi onEdit, arahkan ke rute edit standard
        alert(`Mengarahkan ke halaman edit misi: ${misi.judul}`);
        router.push(`/dashboard/pelapor/misi/${misi.id}/edit`); // Sesuaikan rute edit proyek Anda
      }
    } else if (isRelawan) {
      if (onRegister) {
        onRegister();
      } else {
        alert(`Berhasil mendaftar ke misi: ${misi.judul}`);
        router.push('/dashboard/relawan/misi');
      }
    }
  };

  // Antisipasi jika data `misi` belum masuk atau undefined (mencegah crash saat loading data async)
  if (!misi) {
    return <div className="p-6 text-center text-gray-500">Memuat data detail misi...</div>;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
      {/* Tombol Kembali & Status */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleBackAction}
          className="flex items-center gap-2 text-sm font-semibold text-[#2869CA] hover:text-[#1E4F98] transition-colors"
        >
          ← Kembali
        </button>
        <StatusBadge status={misi.status} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Image */}
        <div className="relative w-full lg:w-[320px] h-[260px] rounded-xl overflow-hidden bg-gray-200 shrink-0">
          {mainImage ? (
            <Image src={mainImage} alt={misi.judul} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Info Konten */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black mb-3">{misi.judul}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{misi.deskripsi}</p>

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div className="flex gap-3 mb-4">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="relative w-[90px] h-[90px] rounded-lg overflow-hidden">
                    <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm border-t border-gray-100 pt-4">
            <div>
              <p className="text-gray-400 mb-0.5">Category</p>
              <p className="font-semibold text-black">{misi.kategori}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-0.5">Number of Volunteers</p>
              <p className="font-semibold text-black">{misi.jumlah_relawan}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-400 mb-0.5">Location</p>
              <p className="font-semibold text-black">{misi.alamat}</p>
            </div>
            {misi.tanggal_mulai && (
              <div>
                <p className="text-gray-400 mb-0.5">Start Date</p>
                <p className="font-semibold text-black">{misi.tanggal_mulai}</p>
              </div>
            )}
            {misi.tanggal_selesai && (
              <div>
                <p className="text-gray-400 mb-0.5">End Date</p>
                <p className="font-semibold text-black">{misi.tanggal_selesai}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end mt-6 border-t border-gray-100 pt-4">
        <button
          onClick={handlePrimaryAction}
          className="bg-[#2869CA] hover:bg-[#1E4F98] text-white font-medium px-10 py-3 rounded-xl transition-colors w-full sm:w-auto"
        >
          {isPelapor ? 'Edit Misi' : 'Register'}
        </button>
      </div>
    </div>
  );
}