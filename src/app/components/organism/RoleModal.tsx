"use client";
import { useRouter } from "next/navigation";

export default function RoleModal() {
  const router = useRouter();

  const handlePilih = async (role: "pelapor" | "relawan") => {
    if (role === "pelapor") {
      router.push("/dashboard/pelapor");
    } else {
      router.push("/dashboard/relawan");
    }
  };

  return (
    <main>
      <div className="">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="p-5 bg-white rounded-2xl shadow-2xl">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black text-center">
                Wellcome to Voletra
              </h2>
              <h3 className="text-center">Select your role to continue</h3>
            </div>
            <div className="flex p-5 gap-10">
              <div
                onClick={() => handlePilih("relawan")}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition duration-300 hover:scale-105"
              >
                <img
                  src="/icons/volunteer.png"
                  alt="Volunteer"
                  width={200}
                  height={200}
                  className="rounded-2xl object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
              </div>
              <div
                onClick={() => handlePilih("pelapor")}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition duration-300 hover:scale-105"
              >
                <img
                  src="/icons/organization.png"
                  alt="Organization"
                  width={200}
                  height={200}
                  className="rounded-2xl object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
