"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Mission {
  id: string;
  title: string;
  location: string;
  volunteers: string;
  status: string;
  image?: string;
}

export default function MissionSection() {
  const { setRedirectTo, token, openModal } = useAuthStore();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Nanti ganti URL dengan API backend
    // fetch('https://api.voletra.com/missions')
    //   .then(res => res.json())
    //   .then(data => { setMissions(data); setLoading(false) })

    // Simulasi sementara
    setMissions([
      {
        id: "ms-1",
        title: "Distribusi Bantuan Bencana",
        location: "Torniang, Aceh Timur",
        volunteers: "80 / 100",
        status: "Open",
      },
      {
        id: "ms-2",
        title: "Tanggap Banjir",
        location: "Tapanuli Utara, Sumatra Utara",
        volunteers: "75 / 100",
        status: "Open",
      },
      {
        id: "ms-3",
        title: "Peduli Lansia",
        location: "Jakarta Barat, DKI Jakarta",
        volunteers: "15 / 20",
        status: "Open",
      },
      {
        id: "ms-4",
        title: "Green Action",
        location: "Cisarua, Jawa Barat",
        volunteers: "25 / 50",
        status: "Open",
      },
      {
        id: "ms-5",
        title: "Gerakan Papua Mengajar",
        location: "Nabire, Papua Tengah",
        volunteers: "30 / 50",
        status: "Open",
      },
      {
        id: "ms-6",
        title: "Sehat Setara",
        location: "Yogyakarta",
        volunteers: "25 / 50",
        status: "Open",
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {missions.map((mission) => (
        <div
          key={mission.id}
          className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="h-40 bg-gray-200" />
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-gray-800">
                {mission.title}
              </h3>
              <span className="text-xs bg-primary-normal text-white px-2 py-1 rounded-full font-medium">
                Open
              </span>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1 mb-1">
              <Image src="/icons/map-pin.svg" width={17} height={18} alt="📍" style={{ width: 'auto' }} />
              {mission.location}
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
              <Image src="/icons/users.svg" width={17} height={18} alt="👥" style={{ width: 'auto' }} />
              {mission.volunteers} Volunteers
            </p>
            <button
              className="w-full bg-primary-normal text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-normalHover transition-colors"
              onClick={() => {
                if (!token) {
                  setRedirectTo("/peta-misi");
                  openModal();
                } else {
                  router.push(`/misi/${mission.id}`);
                }
              }}
            >
              Apply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
