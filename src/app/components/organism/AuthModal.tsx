"use client";
import { useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthService } from "@/services/AuthService";

export default function AuthModal() {
  const { setAuth, redirectTo, clearRedirectTo, isModalOpen, closeModal } = useAuthStore();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"volunteer" | "lembaga">("volunteer");
  
  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup states
  const [name, setName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});
    try {
      const response = await AuthService.login({ email: loginEmail, password: loginPassword });
      if (response.success) {
        // Backend uses cookies, so we set a placeholder token to mark as logged in
        const authToken = response.data.token || 'session';
        setAuth(authToken, response.data.role, { 
          id: "", 
          email: loginEmail, 
          name: "User" 
        });
        
        closeModal();
        
        const targetPath = response.data.redirect_url || (response.data.role === "volunteer" ? "/dashboard/relawan" : "/dashboard/pelapor");
        
        if (redirectTo) {
          router.push(redirectTo);
          clearRedirectTo();
        } else {
          router.push(targetPath);
        }
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      }
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});
    try {
      let response;
      if (role === "volunteer") {
        response = await AuthService.registerVolunteer({
          name,
          email: signupEmail,
          password: signupPassword,
          confirm_password: confirmPassword,
          role: "volunteer"
        });
      } else {
        response = await AuthService.registerLembaga({
          institution_name: institutionName,
          email: signupEmail,
          password: signupPassword,
          confirm_password: confirmPassword,
          role: "lembaga"
        });
      }

      if (response.success) {
        const userData = {
          id: response.data.user?.id || "",
          email: response.data.user?.email || signupEmail,
          name: response.data.user?.name || name,
          institution_name: response.data.user?.institution_name || institutionName
        };
        
        setAuth(response.data.token, response.data.role, userData);
        closeModal();
        
        // Always redirect to dashboard based on response from backend or calculated path
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

  if (!isModalOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
          >
            ×
          </button>

          <h2 className="text-center font-bold text-2xl text-black mb-2">
            Welcome to Voletra
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            {tab === "login" ? "Login to your account" : "Sign up to start contributing"}
          </p>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setTab("login"); setError(""); setFieldErrors({}); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                tab === "login" ? "bg-[#2869CA] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setTab("signup"); setError(""); setFieldErrors({}); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                tab === "signup" ? "bg-[#2869CA] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-3 rounded-lg mb-4 text-center border border-red-100">
              {error}
            </div>
          )}

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#2869CA] focus:border-transparent outline-none transition-all ${
                    fieldErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {fieldErrors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{fieldErrors.email[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#2869CA] focus:border-transparent outline-none transition-all ${
                    fieldErrors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {fieldErrors.password && <p className="text-red-500 text-[10px] mt-1 ml-1">{fieldErrors.password[0]}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2869CA] text-white py-3 rounded-xl font-semibold hover:bg-[#1E4F98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-blue-200"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4 max-h-[60vh] overflow-y-auto px-1 custom-scrollbar">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">I want to join as</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value="volunteer"
                      checked={role === "volunteer"}
                      onChange={() => setRole("volunteer")}
                      className="w-4 h-4 text-[#2869CA]"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-black transition-colors">Relawan</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value="lembaga"
                      checked={role === "lembaga"}
                      onChange={() => setRole("lembaga")}
                      className="w-4 h-4 text-[#2869CA]"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-black transition-colors">Lembaga</span>
                  </label>
                </div>
              </div>

              {role === "volunteer" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#2869CA] focus:border-transparent outline-none transition-all ${
                      fieldErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {fieldErrors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{fieldErrors.name[0]}</p>}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="Enter institution name"
                    className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#2869CA] focus:border-transparent outline-none transition-all ${
                      fieldErrors.institution_name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {fieldErrors.institution_name && <p className="text-red-500 text-[10px] mt-1 ml-1">{fieldErrors.institution_name[0]}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#2869CA] focus:border-transparent outline-none transition-all ${
                    fieldErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {fieldErrors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{fieldErrors.email[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Uppercase + Number + 8 chars"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#2869CA] focus:border-transparent outline-none transition-all ${
                    fieldErrors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {fieldErrors.password && <p className="text-red-500 text-[10px] mt-1 ml-1">{fieldErrors.password[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#2869CA] focus:border-transparent outline-none transition-all ${
                    fieldErrors.confirm_password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {fieldErrors.confirm_password && <p className="text-red-500 text-[10px] mt-1 ml-1">{fieldErrors.confirm_password[0]}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2869CA] text-white py-3 rounded-xl font-semibold hover:bg-[#1E4F98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-blue-200"
              >
                {loading ? "Creating account..." : "Continue"}
              </button>
            </form>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-light tracking-wider uppercase">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-700">
              <Image src="/icons/google-icon.svg" alt="Google" width={20} height={20} />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
