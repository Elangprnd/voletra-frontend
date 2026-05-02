"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { Misi } from "@/types/misi";

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

const DEFAULT_CENTER: [number, number] = [-2.5489, 118.0149];
const DEFAULT_ZOOM = 5;

export default function MapWrapper() {
  const [missions, setMissions] = useState<Misi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMission, setSelectedMission] = useState<Misi | null>(null);

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
            judul: "Distribusi Bantuan Bencana",
            deskripsi: "",
            kategori: "Emergency Response",
            alamat: "Torniang, Aceh Timur",
            latitude: 4.695135,
            longitude: 97.750397,
            jumlah_relawan: 100,
            foto: [],
            status: "Open",
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "1",
            judul: "Distribusi Bantuan Bencana",
            deskripsi: "",
            kategori: "Emergency Response",
            alamat: "Torniang, Aceh Timur",
            latitude: 4.695135,
            longitude: 97.750397,
            jumlah_relawan: 100,
            foto: [],
            status: "Open",
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "2",
            judul: "Distribusi Bantuan Bencana",
            deskripsi: "",
            kategori: "Emergency Response",
            alamat: "Torniang, Aceh Timur",
            latitude: 4.695135,
            longitude: 97.750397,
            jumlah_relawan: 100,
            foto: [],
            status: "Open",
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "3",
            judul: "Distribusi Bantuan Bencana",
            deskripsi: "",
            kategori: "Emergency Response",
            alamat: "Torniang, Aceh Timur",
            latitude: 4.695135,
            longitude: 97.750397,
            jumlah_relawan: 100,
            foto: [],
            status: "Open",
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "4",
            judul: "Distribusi Bantuan Bencana",
            deskripsi: "",
            kategori: "Emergency Response",
            alamat: "Torniang, Aceh Timur",
            latitude: 4.695135,
            longitude: 97.750397,
            jumlah_relawan: 100,
            foto: [],
            status: "Open",
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "5",
            judul: "Distribusi Bantuan Bencana",
            deskripsi: "",
            kategori: "Emergency Response",
            alamat: "Torniang, Aceh Timur",
            latitude: 4.695135,
            longitude: 97.750397,
            jumlah_relawan: 100,
            foto: [],
            status: "Open",
            createdAt: "",
            updatedAt: "",
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
        if (!mission.latitude || !mission.longitude) return null;
        return (
          <Marker
            key={mission.id}
            position={[mission.latitude, mission.longitude]}
            icon={icon}
          >
            <Popup>
              <div className="min-w-[160px]">
                <h3 className="font-semibold text-sm text-gray-800 mb-1">
                  {mission.judul}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{mission.kategori}</p>
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
