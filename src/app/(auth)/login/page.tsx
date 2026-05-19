"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AuthService } from "@/services/AuthService";

export default function LoginPage() {
  const { setAuth, token, role } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push(role === "volunteer" ? "/dashboard/relawan" : "/dashboard/pelapor");
    }
  }, [token, role, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await AuthService.login({ email, password });
      if (response.success) {
        setAuth(response.data.token, response.data.role, response.data.user);
        router.push(response.data.role === "volunteer" ? "/dashboard/relawan" : "/dashboard/pelapor");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-primary-light px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-gray-500">Log in to your Voletra account</p>
        </div>

        <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
          <button className="flex-1 py-3 text-sm font-semibold rounded-xl bg-primary-normal text-white shadow-md">
            Login
          </button>
          <Link 
            href="/register" 
            className="flex-1 py-3 text-sm font-semibold rounded-xl text-gray-500 hover:text-gray-700 text-center transition-all"
          >
            Sign Up
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-4 rounded-xl mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Image src="/icons/mail.svg" alt="Mail" width={20} height={20} className="opacity-40 group-focus-within:opacity-100 transition-opacity" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary-normal focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <Link href="#" className="text-xs text-primary-normal hover:underline">Forgot Password?</Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Image src="/icons/lock.svg" alt="Lock" width={20} height={20} className="opacity-40 group-focus-within:opacity-100 transition-opacity" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary-normal focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-normal text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : "Login"}
          </button>
        </form>

        <div className="mt-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Or Login With</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="mt-8">
          <button className="w-full flex items-center justify-center gap-4 py-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-gray-700 group">
            <Image src="/icons/google-icon.svg" alt="Google" width={24} height={24} className="group-hover:scale-110 transition-transform" />
            Continue with Google
          </button>
        </div>

        <p className="mt-10 text-center text-gray-500 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary-normal font-bold hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </main>
  );
}
