'use client';
import { useAuthStore } from "@/app/store/authStore";
import Link from "next/link";

const Navbar = () => {
  const { user, clearAuth } = useAuthStore();

  return (
    <nav>
        <div className="p-4 bg-black text-white">
            <ul className="flex justify-between items-center ">
                <img src="/logo.png" /* belum ada */ alt="Logo Aplikasi" className="h-8" />
                <li><Link href="/">home</Link></li>
                <li><Link href="/">about</Link></li>
                <li><Link href="/">services</Link></li>
                <li><Link href="/">contact</Link></li>
                <li><Link href="/">contact</Link></li>
                <li>
                    {user ? (
                        <span>Welcome, {user.name}!</span>
                    ) : (
                        <button className="border-2 border-white p-2 hover:bg-white hover:text-blue-800">Login</button>
                    )}
                </li>
            </ul>
        </div>
    </nav>
  );
};

export default Navbar;
