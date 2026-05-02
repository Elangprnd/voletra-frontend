'use client'
import dynamic from 'next/dynamic'
import AuthModal from '@/app/components/organism/AuthModal'

// Dynamic import agar Google Maps tidak SSR
const MapWrapper = dynamic(() => import('@/app/components/organism/MapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary-normal border-t-transparent rounded-full animate-spin" />
    </div>
  )
})

export default function PetaMisiPage() {
  return (
    <>
      <section className="py-16 px-4 lg:px-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-normal text-center mb-10">
            Peta Misi
          </h1>
          <MapWrapper />
        </div>
      </section>
      <AuthModal />
    </>
  )
}
