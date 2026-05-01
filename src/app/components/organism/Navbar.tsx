"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { token, user, openModal, clearAuth } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/peta-misi", label: "Mission" },
    { href: "/edukasi", label: "About" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm px-4 lg:px-8 py-4 flex items-center justify-between fixed top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/icons/logo_voletra.png"
            alt="Voletra"
            width={36}
            height={36}
          />
          <span className="font-bold text-primary-normal text-lg tracking-wide">
            VOLETRA
          </span>
        </div>

        {/* Nav Links - Desktop */}
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

        {/* Auth - Desktop */}
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
                <div className="w-9 h-9 rounded-full bg-primary-normal text-white flex items-center justify-center font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                  <Link
                    href="/dashboard/relawan"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      clearAuth();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger - Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Sidebar */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
          <Image
            src="/icons/logo_voletra.png"
            alt="Voletra"
            width={32}
            height={32}
          />
          <span className="font-bold text-primary-normal">VOLETRA</span>
        </div>

        {/* Nav Links Sidebar */}
        <div className="flex flex-col px-4 py-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-primary-light text-primary-normal"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User di bawah sidebar */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-gray-100">
          {!token ? (
            <button
              onClick={() => {
                openModal();
                setMenuOpen(false);
              }}
              className="w-full bg-primary-normal text-white py-2 rounded-lg text-sm font-semibold"
            >
              Sign Up
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/icons/user.svg"
                  width={25}
                  height={25}
                  alt="user"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </div>
              <button onClick={clearAuth} className="text-red-500">
                <span className="text-lg">→</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
