"use client";
import { useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthService } from "@/services/AuthService";
import { getErrorMessage, getFieldErrors } from "@/lib/error";

export default function AuthModal() {
  const { setAuth, redirectTo, clearRedirectTo, isModalOpen, closeModal } = useAuthStore();
  const [tab, setTab] = useState<"login" | "signup">("login");

  // shared
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // signup only
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const router = useRouter();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
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
          router.push(redirectTo);
          clearRedirectTo();
        } else {
          router.push(response.data.role === "volunteer" ? "/dashboard/relawan" : "/dashboard/pelapor");
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
      const response = await AuthService.register({ email, password, confirm_password: confirmPassword, name });
      if (response.success) {
        setAuth(response.data.token, response.data.role, response.data.user);
        closeModal();
        resetForm();
        // Role null → belum pilih role → arahkan ke pilih-role
        router.push(response.data.role ? "/dashboard" : "/pilih-role");
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
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="••••••••"
                    />
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
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password[0]}</p>}
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Confirm Password</label>
                  <div className={`border rounded-lg px-3 py-2 flex items-center gap-2 ${fieldErrors.confirm_password ? "border-red-400" : "border-gray-200"}`}>
                    <Image src="/icons/lock.svg" alt="lock" width={20} height={20} />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  {fieldErrors.confirm_password && <p className="text-red-500 text-xs mt-1">{fieldErrors.confirm_password[0]}</p>}
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