"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Mission {
  id: string;
  title: string;
  category: string;
  lat: number;
  lng: number;
}

const DEFAULT_CENTER = { lat: -2.5489, lng: 118.0149 };
const DEFAULT_ZOOM = 5;

export default function MapWrapper() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const router = useRouter();
  const { token, openModal, setRedirectTo } = useAuthStore();

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true);

        await new Promise((r) => setTimeout(r, 800));

        setMissions([
          {
            id: "1",
            title: "Distribusi Bantuan Bencana",
            category: "Emergency Response",
            lat: 4.695135,
            lng: 97.750397,
          },
          {
            id: "2",
            title: "Tanggap Banjir",
            category: "Emergency Response",
            lat: 1.748548,
            lng: 99.173393,
          },
          {
            id: "3",
            title: "Peduli Lansia",
            category: "Healthcare",
            lat: -6.19413,
            lng: 106.82254,
          },
          {
            id: "4",
            title: "Green Action",
            category: "Environment",
            lat: -6.716064,
            lng: 106.871048,
          },
          {
            id: "5",
            title: "Gerakan Papua Mengajar",
            category: "Education",
            lat: -3.369025,
            lng: 135.505905,
          },
          {
            id: "6",
            title: "Sehat Setara",
            category: "Healthcare",
            lat: -7.79558,
            lng: 110.369492,
          },
        ]);
      } catch {
        setError("Gagal memuat data misi");
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // 🔐 AUTH GATE
  const handleAuthAction = (id: string) => {
    if (!token) {
      setRedirectTo("/peta-misi");
      openModal();
    } else {
      router.push(`/misi/${id}`);
    }
  };

  // UI STATES
  if (loading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) return <div>{error}</div>;
  if (missions.length === 0) return <div>Belum ada misi</div>;

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ width: "100%", height: "500px", borderRadius: "16px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {missions.map((mission) => {
        if (!mission.lat || !mission.lng) return null;
        return (
          <Marker
            key={mission.id}
            position={[mission.lat, mission.lng]}
            icon={icon}
          >
            <Popup>
              <div className="min-w-[160px]">
                <h3 className="font-semibold text-sm text-gray-800 mb-1">
                  {mission.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{mission.category}</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleAuthAction(mission.id)}
                    className="w-full bg-primary-normal text-white py-1.5 rounded-lg text-xs font-semibold"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => handleAuthAction(mission.id)}
                    className="w-full border border-primary-normal text-primary-normal py-1.5 rounded-lg text-xs font-semibold"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
