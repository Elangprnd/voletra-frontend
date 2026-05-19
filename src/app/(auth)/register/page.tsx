"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AuthService } from "@/services/AuthService";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RegisterForm() {
  const { setAuth, token, role: storedRole } = useAuthStore();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") as "volunteer" | "lembaga" | null;
  
  const [role, setRole] = useState<"volunteer" | "lembaga">(initialRole || "volunteer");
  const [name, setName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push(storedRole === "volunteer" ? "/dashboard/relawan" : "/dashboard/pelapor");
    }
  }, [token, storedRole, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});
    try {
      let response;
      if (role === "volunteer") {
        response = await AuthService.registerVolunteer({
          name,
          email,
          password,
          confirm_password: confirmPassword,
          role: "volunteer"
        });
      } else {
        response = await AuthService.registerLembaga({
          institution_name: institutionName,
          email,
          password,
          confirm_password: confirmPassword,
          role: "lembaga"
        });
      }

      if (response.success) {
        // Backend uses cookies, so we set a placeholder token to mark as logged in
        const authToken = response.data.token || 'session';
        const userData = {
          id: response.data.user?.id || "",
          email: response.data.user?.email || email,
          name: response.data.user?.name || name,
          institution_name: response.data.user?.institution_name || institutionName
        };

        setAuth(authToken, response.data.role, userData);
        
        // Redirect to dashboard based on role or backend response
        const targetPath = response.data.redirect_url || (role === "volunteer" ? "/dashboard/relawan" : "/dashboard/pelapor");
        router.push(targetPath);
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      }
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-primary-light px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black mb-2">Join Voletra</h1>
          <p className="text-gray-500">Create an account to start contributing</p>
        </div>

        <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
          <Link 
            href="/login" 
            className="flex-1 py-3 text-sm font-semibold rounded-xl text-gray-500 hover:text-gray-700 text-center transition-all"
          >
            Login
          </Link>
          <button className="flex-1 py-3 text-sm font-semibold rounded-xl bg-primary-normal text-white shadow-md">
            Sign Up
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-4 rounded-xl mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 ml-1">Register as</label>
            <div className="flex gap-6 p-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="role"
                  value="volunteer"
                  checked={role === "volunteer"}
                  onChange={() => setRole("volunteer")}
                  className="w-5 h-5 text-primary-normal border-gray-300 focus:ring-primary-normal"
                />
                <span className="text-sm font-medium text-gray-600 group-hover:text-black transition-colors">Relawan</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="role"
                  value="lembaga"
                  checked={role === "lembaga"}
                  onChange={() => setRole("lembaga")}
                  className="w-5 h-5 text-primary-normal border-gray-300 focus:ring-primary-normal"
                />
                <span className="text-sm font-medium text-gray-600 group-hover:text-black transition-colors">Lembaga</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              {role === "volunteer" ? "Full Name" : "Institution Name"}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Image src={role === "volunteer" ? "/icons/user.svg" : "/icons/organization.png"} alt="Icon" width={20} height={20} className="opacity-40 group-focus-within:opacity-100 transition-opacity" />
              </div>
              <input
                type="text"
                required
                value={role === "volunteer" ? name : institutionName}
                onChange={(e) => role === "volunteer" ? setName(e.target.value) : setInstitutionName(e.target.value)}
                placeholder={role === "volunteer" ? "John Doe" : "Yayasan Kemanusiaan"}
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary-normal focus:border-transparent outline-none transition-all ${
                  (role === "volunteer" ? fieldErrors.name : fieldErrors.institution_name) ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
            {(role === "volunteer" ? fieldErrors.name : fieldErrors.institution_name) && (
              <p className="text-red-500 text-xs mt-1 ml-1">{(role === "volunteer" ? fieldErrors.name : fieldErrors.institution_name)![0]}</p>
            )}
          </div>

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
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary-normal focus:border-transparent outline-none transition-all ${
                  fieldErrors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.email[0]}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary-normal focus:border-transparent outline-none transition-all ${
                  fieldErrors.password ? "border-red-500" : "border-gray-200"
                }`}
              />
              {fieldErrors.password && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.password[0]}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary-normal focus:border-transparent outline-none transition-all ${
                  fieldErrors.confirm_password ? "border-red-500" : "border-gray-200"
                }`}
              />
              {fieldErrors.confirm_password && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.confirm_password[0]}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-normal text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 mt-4 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? "Creating account..." : "Continue"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-normal font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
