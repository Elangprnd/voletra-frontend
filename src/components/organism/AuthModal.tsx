"use client";
import { useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { AuthService } from "@/services/AuthService";
import { getErrorMessage, getFieldErrors } from "@/lib/error";
import { useEffect } from "react";

export default function AuthModal() {
  const { setAuth, redirectTo, setRedirectTo, clearRedirectTo, isModalOpen, openModal, closeModal } = useAuthStore();
  const [tab, setTab] = useState<"login" | "signup">("login");

  // shared
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // signup only
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<"volunteer" | "lembaga">("volunteer");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const authParam = searchParams.get("auth");
    const redirectParam = searchParams.get("redirect");

    if (authParam) {
      if (authParam === "login") {
        setTab("login");
        openModal();
      } else if (authParam === "register" || authParam === "signup") {
        setTab("signup");
        openModal();
      }

      if (redirectParam) {
        setRedirectTo(redirectParam);
      }

      // Clear the query params to prevent reopening on refresh
      const params = new URLSearchParams(searchParams.toString());
      params.delete("auth");
      params.delete("redirect");
      const query = params.toString();
      const newPath = window.location.pathname + (query ? `?${query}` : "");
      router.replace(newPath);
    }
  }, [searchParams, openModal, setRedirectTo, router]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setName("");
    setConfirmPassword("");
    setShowConfirmPassword(false);
    setRole("volunteer");
    setError("");
    setFieldErrors({});
  };

  const handleTabChange = (newTab: "login" | "signup") => {
    setTab(newTab);
    resetForm();
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await AuthService.login({ email, password });
      if (response.success) {
        setAuth(response.data.token, response.data.role, response.data.user);
        closeModal();
        resetForm();

        if (redirectTo) {
          router.replace(redirectTo);
          clearRedirectTo();
        } else {
          const path = response.data.role === "volunteer" ? "/dashboard/relawan" : "/dashboard/pelapor";
          router.replace(path);
        }
      }
    } catch (err: unknown) {
      setFieldErrors(getFieldErrors(err));
      setError(getErrorMessage(err, "Login gagal. Periksa kembali kredensial Anda."));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    setFieldErrors({});
    try {
      const response = await AuthService.register({ 
        email, 
        password, 
        confirm_password: confirmPassword, 
        name,
        role 
      });
      if (response.success) {
        setAuth(response.data.token, response.data.role, response.data.user);
        closeModal();
        resetForm();
        
        // Langsung arahkan ke dashboard sesuai role yang baru saja dipilih
        const dashboardPath = response.data.role === "volunteer" ? "/dashboard/relawan" : "/dashboard/pelapor";
        router.replace(dashboardPath);
      }
    } catch (err: unknown) {
      setFieldErrors(getFieldErrors(err));
      setError(getErrorMessage(err, "Registrasi gagal. Silakan coba lagi."));
    } finally {
      setLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-10 p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>

          <h2 className="text-center font-bold text-lg text-gray-800 mb-1">
            Welcome to Voletra
          </h2>
          <p className="text-center text-sm text-gray-500 mb-5">
            Login or Sign up to start contributing
          </p>

          <div className="flex mb-6 border border-primary-normal rounded-lg overflow-hidden">
            <button
              onClick={() => handleTabChange("login")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                tab === "login" ? "bg-primary-normal text-white" : "text-primary-normal bg-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleTabChange("signup")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                tab === "signup" ? "bg-primary-normal text-white" : "text-primary-normal bg-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center border border-red-100">
              {error}
            </div>
          )}

          {tab === "login" ? (
            <>
              <div className="flex flex-col gap-3 mb-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Email</label>
                  <div className={`border rounded-lg px-3 py-2 flex items-center gap-2 ${fieldErrors.email ? "border-red-400" : "border-gray-200"}`}>
                    <Image src="/icons/mail.svg" alt="mail" width={20} height={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email[0]}</p>}
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Password</label>
                  <div className={`border rounded-lg px-3 py-2 flex items-center gap-2 ${fieldErrors.password ? "border-red-400" : "border-gray-200"}`}>
                    <Image src="/icons/lock.svg" alt="lock" width={20} height={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password[0]}</p>}
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-primary-normal text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-normalHover transition-colors mb-3 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Login"}
              </button>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button className="w-full border border-gray-200 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Image src="/icons/google-icon.svg" alt="Google" width={20} height={20} />
                Continue with Google
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3 mb-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                  <div className={`border rounded-lg px-3 py-2 flex items-center gap-2 ${fieldErrors.name ? "border-red-400" : "border-gray-200"}`}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name[0]}</p>}
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Email</label>
                  <div className={`border rounded-lg px-3 py-2 flex items-center gap-2 ${fieldErrors.email ? "border-red-400" : "border-gray-200"}`}>
                    <Image src="/icons/mail.svg" alt="mail" width={20} height={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email[0]}</p>}
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Password</label>
                  <div className={`border rounded-lg px-3 py-2 flex items-center gap-2 ${fieldErrors.password ? "border-red-400" : "border-gray-200"}`}>
                    <Image src="/icons/lock.svg" alt="lock" width={20} height={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password[0]}</p>}
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Confirm Password</label>
                  <div className={`border rounded-lg px-3 py-2 flex items-center gap-2 ${fieldErrors.confirm_password ? "border-red-400" : "border-gray-200"}`}>
                    <Image src="/icons/lock.svg" alt="lock" width={20} height={20} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                  {fieldErrors.confirm_password && <p className="text-red-500 text-xs mt-1">{fieldErrors.confirm_password[0]}</p>}
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Register as</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRole("volunteer")}
                      className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        role === "volunteer" 
                          ? "border-primary-normal bg-primary-light text-primary-normal shadow-sm" 
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <Image src="/icons/volunteer.png" alt="volunteer" width={20} height={20} className={role === "volunteer" ? "" : "grayscale opacity-50"} />
                      Volunteer
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("lembaga")}
                      className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        role === "lembaga" 
                          ? "border-primary-normal bg-primary-light text-primary-normal shadow-sm" 
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <Image src="/icons/organization.png" alt="organization" width={20} height={20} className={role === "lembaga" ? "" : "grayscale opacity-50"} />
                      Institution
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-primary-normal text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-normalHover transition-colors mb-3 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Continue"}
              </button>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button className="w-full border border-gray-200 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Image src="/icons/google-icon.svg" alt="Google" width={20} height={20} />
                Continue with Google
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
