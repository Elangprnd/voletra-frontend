"use client";
import { useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import Image from "next/image";

export default function AuthModal() {
  const { isModalOpen, closeModal } = useAuthStore();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isModalOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        onClick={closeModal}
      >
        {/* Modal Box */}
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-10 p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>

          {/* Title */}
          <h2 className="text-center font-bold text-lg text-gray-800 mb-1">
            Welcome to Voletra
          </h2>
          <p className="text-center text-sm text-gray-500 mb-5">
            Login or Sign up to start contributing
          </p>

          {/* Tab */}
          <div className="flex mb-6 border border-primary-normal rounded-lg overflow-hidden">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                tab === "login"
                  ? "bg-primary-normal text-white"
                  : "text-primary-normal bg-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                tab === "signup"
                  ? "bg-primary-normal text-white"
                  : "text-primary-normal bg-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          {tab === "login" ? (
            <>
              <div className="flex flex-col gap-3 mb-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Email
                  </label>
                  <div className="border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2">
                    <Image
                      src="/icons/mail.svg"
                      alt="✉"
                      width={20}
                      height={20}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Password
                  </label>
                  <div className="border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2">
                    <Image
                      src="/icons/lock.svg"
                      alt="example@gmail.com"
                      width={20}
                      height={20}
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button className="w-full bg-primary-normal text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-normalHover transition-colors mb-3">
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Google */}
              <button className="w-full border border-gray-200 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Image
                  src="/icons/google-icon.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Continue with Google
              </button>
            </>
          ) : (
            <>
              {/* Google */}
              <button className="w-full border border-gray-200 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 my-7">
                <Image
                  src="/icons/google-icon.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Continue with Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-2 my-7">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* form */}
              <div className="flex flex-col gap-3 my-7">
                <div>
                  <div className="border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2">
                    <Image
                      src="/icons/mail.svg"
                      alt="✉"
                      width={20}
                      height={20}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm outline-none"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
              </div>
              {/* Submit */}
              <button className="w-full bg-primary-normal text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-normalHover transition-colors mb-6">
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
