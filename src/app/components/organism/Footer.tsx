'use client';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8 px-4 mt-auto">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
      <img src="/logo.png" alt="Voletra Logo" className="h-10 w-auto" />
      <h3 className="text-xl font-bold">Voletra</h3>
      <p className="text-sm text-blue-200">Slogan atau deskripsi singkat.</p>
    </div>
    
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold">Links</h4>
      <Link href="/" className="hover:text-blue-300">Privacy Policy</Link>
      <Link href="/" className="hover:text-blue-300">Terms of Service</Link>
    </div>

    <div>
      <h4 className="font-semibold text-center md:text-left">Follow Us</h4>
      {/* Icon sosmed di sini */}
    </div>
  </div>
  
  <div className="border-t border-grey-800 mt-8 pt-4 text-center text-sm">
    &copy; 2026 Voletra. All rights reserved.
  </div>
</footer>
    )
}

export default Footer;