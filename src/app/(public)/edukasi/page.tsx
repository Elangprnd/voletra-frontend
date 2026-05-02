import AuthModal from "@/app/components/organism/AuthModal";
import Image from "next/image";

export default function EdukasiPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative w-full h-52 bg-blue-100 flex items-center justify-center overflow-hidden pt-16">
        <Image
          src="/images/about.png"
          alt="About Banner"
          fill
          className="object-cover"
        />
      </section>

      {/* Content Card */}
      <section className="bg-primary-light px-8 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10 flex flex-col gap-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Connect for Impact, Anywhere in Indonesia
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Platform digital ini menghubungkan relawan dengan berbagai misi
              sosial di seluruh Indonesia, membantu siapa pun untuk
              berkontribusi dengan mudah melalui peluang yang relevan dan
              berdampak. Melalui jaringan luas organisasi, komunitas, dan
              inisiatif sosial, pengguna dapat menemukan kegiatan relawan,
              program kemanusiaan, hingga aksi tanggap darurat secara real-time
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Empowering Communities Through Meaningful Action
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Kami memberdayakan individu dan komunitas untuk terlibat langsung
              dalam aksi sosial yang nyata dan berdampak. Melalui sistem yang
              terintegrasi, relawan dapat menemukan peluang yang sesuai dengan
              minat, keterampilan, dan lokasi mereka, sementara organisasi dapat
              menjangkau bantuan yang tepat dengan lebih cepat dan efisien.
              Dengan pendekatan yang kolaboratif dan berbasis kebutuhan,
              platform ini mendorong terciptanya ekosistem sosial yang inklusif,
              responsif, dan berkelanjutan
            </p>
          </div>
        </div>
      </section>

      {/* A bit more about us */}
      <section className="bg-primary-light px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white grid grid-cols-2 gap-6 p-7 rounded-3xl">
            {/* Mission */}
            <div className="rounded-2xl shadow-sm flex flex-col">
              <h2 className="bg-white text-2xl p-7 font-bold text-primary-darker">
                A bit more about us...
              </h2>
              <div className="bg-primary-light p-7 rounded-2xl">
                <h3 className="text-xl font-bold text-primary-darker mb-3">
                  Mission
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Menjadi platform digital yang menghubungkan relawan dengan
                  misi sosial di seluruh Indonesia. Kami percaya bahwa setiap
                  orang dapat berkontribusi untuk menciptakan perubahan positif
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-primary-light rounded-2xl p-7 shadow-sm">
              <h3 className="text-xl font-bold text-primary-darker mb-3">
                Vision
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Menjadi platform digital yang menghubungkan relawan dengan misi
                sosial di seluruh Indonesia. Kami percaya bahwa setiap orang
                dapat berkontribusi untuk menciptakan perubahan positif
              </p>
            </div>

            {/* Our Target */}
            <div className="bg-primary-light rounded-2xl p-7 shadow-sm">
              <h3 className="text-xl font-bold text-primary-darker mb-3">
                Our Target
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Kami menargetkan untuk menjangkau lebih dari 10.000 relawan di
                seluruh Indonesia dalam beberapa tahun ke depan
              </p>
            </div>

            {/* Our Value */}
            <div className="bg-primary-light rounded-2xl p-7 shadow-sm">
              <h3 className="text-xl font-bold text-primary-darker mb-3">
                Our Value
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Kami menjunjung tinggi kolaborasi, kepedulian, dan kepercayaan
                dalam setiap langkah. Nilai ini menjadi dasar dalam membangun
                sinergi antara relawan dan masyarakat, serta memastikan platform
                yang berdampak nyata
              </p>
            </div>
          </div>
        </div>
      </section>
      <AuthModal />
    </>
  );
}
