"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { AuthService } from "@/services/AuthService";
import { useAuthStore } from "@/app/store/authStore";
import { getErrorMessage } from "@/lib/error";

export default function RoleModal() {
  const router = useRouter();
  const { setAuth, token, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePilih = async (role: "lembaga" | "volunteer") => {
    setIsLoading(true);
    setError("");
    try {
      const response = await AuthService.updateRole(role);
      if (response.success) {
        // Update store dan cookie dengan role yang baru
        setAuth(token!, role, user!);
        router.push(role === "volunteer" ? "/dashboard/relawan" : "/dashboard/pelapor");
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Gagal memilih role. Silakan coba lagi."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="p-5 bg-white rounded-2xl shadow-2xl">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black text-center">
              Welcome to Voletra
            </h2>
            <h3 className="text-center text-gray-500">Select your role to continue</h3>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-6 text-center border border-red-100">
              {error}
            </div>
          )}

          <div className="flex p-5 gap-10">
            <button
              onClick={() => handlePilih("volunteer")}
              disabled={isLoading}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transition duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                src="/icons/volunteer.png"
                alt="Volunteer"
                width={200}
                height={200}
                className="rounded-2xl object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
              <p className="text-center font-semibold mt-2">Volunteer (Relawan)</p>
            </button>

            <button
              onClick={() => handlePilih("lembaga")}
              disabled={isLoading}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transition duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                src="/icons/organization.png"
                alt="Organization"
                width={200}
                height={200}
                className="rounded-2xl object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
              <p className="text-center font-semibold mt-2">Organization (Lembaga)</p>
            </button>
          </div>

          {isLoading && (
            <p className="text-center text-sm text-gray-400 mt-4">Menyimpan pilihan...</p>
          )}
        </div>
      </div>
    </main>
  );
}