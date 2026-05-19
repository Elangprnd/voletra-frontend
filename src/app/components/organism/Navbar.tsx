"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { usePathname } from "next/navigation";
import { AuthService } from "@/services/AuthService";

export default function Navbar() {
  const { token, user, role, openModal, clearAuth } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Ensure hydration matches server
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearAuth();
      setDropdownOpen(false);
      setMenuOpen(false);
      window.location.href = "/";
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/peta-misi", label: "Mission" },
    { href: "/edukasi", label: "About" },
  ];

  // Prevent hydration mismatch by not rendering auth-dependent UI until mounted
  const authSection = mounted && (
    <div className="hidden md:flex">
      {!token ? (
        <button
          onClick={openModal}
          className="text-primary-normal font-semibold hover:text-primary-dark transition-colors cursor-pointer"
        >
          Sign Up
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-primary-normal text-white flex items-center justify-center font-semibold overflow-hidden relative">
              <Image 
                src={`https://ui-avatars.com/api/?name=${user?.name || user?.institution_name || 'U'}&background=2869ca&color=fff`} 
                alt="Profile" 
                fill
                className="object-cover"
              />
            </div>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Logged in as</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{user?.name || user?.institution_name || 'User'}</p>
              </div>
              <Link
                href={role === "lembaga" ? "/dashboard/pelapor" : "/dashboard/relawan"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                Logout (Keluar)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const mobileAuthSection = mounted && (
    <div className="absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-gray-100 bg-white">
      {!token ? (
        <button
          onClick={() => {
            openModal();
            setMenuOpen(false);
          }}
          className="w-full bg-primary-normal text-white py-3 rounded-xl text-sm font-semibold shadow-md active:scale-95 transition-all"
        >
          Sign Up
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-normal text-white flex items-center justify-center font-semibold overflow-hidden relative">
              <Image 
                src={`https://ui-avatars.com/api/?name=${user?.name || user?.institution_name || 'U'}&background=2869ca&color=fff`} 
                alt="Profile" 
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800 truncate max-w-[120px]">
                {user?.name || user?.institution_name || "User"}
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-bold">{role}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="text-red-500 p-2 bg-red-50 rounded-lg active:scale-90 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav className="w-full bg-white shadow-sm px-4 lg:px-8 py-4 flex items-center justify-between fixed top-0 z-50">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/logo_voletra.png"
            alt="Voletra"
            width={32}
            height={32}
            style={{ width: 'auto' }}
          />
          <span className="font-bold text-primary-normal text-lg tracking-wide">
            VOLETRA
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-primary-normal font-semibold border-b-2 border-primary-normal pb-1"
                  : "text-gray-600 hover:text-primary-normal"
              } transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {authSection}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
          <Image src="/icons/logo_voletra.png" alt="Voletra" width={32} height={32} style={{ width: 'auto' }} />
          <span className="font-bold text-primary-normal">VOLETRA</span>
        </div>

        <div className="flex flex-col px-4 py-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href ? "bg-primary-light text-primary-normal" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {mobileAuthSection}
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
