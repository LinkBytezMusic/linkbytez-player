"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const openProject = () => {
    if (!code.trim()) return;

    let clean = code.trim();

    if (clean.includes("/p/")) {
      clean = clean.split("/p/")[1];
    }

    clean = clean.replace(/\//g, "");

    router.push(`/p/${clean}`);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 text-white overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=2000&q=80')"
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* GREEN VIBE GLOW */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-black/60 to-black" />

      {/* CONTENT */}
      <div className="relative w-full max-w-2xl text-center z-10">

        {/* BRAND */}
        <div className="mb-10">
          <h1 className="text-6xl font-black tracking-tight">
            <span className="text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]">
              LINK
            </span>
            BYTEZ
          </h1>

          <div className="mt-3 h-[2px] w-24 bg-green-400 mx-auto blur-[1px] opacity-70" />

          <p className="text-gray-300 mt-5 text-sm tracking-wide">
            Private music player · Share your sound · Open with code
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">

          <p className="text-gray-300 mb-5 text-sm">
            Enter project access code
          </p>

          <div className="flex gap-3">

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openProject();
              }}
              placeholder="e.g. ba1f1f27"
              className="
                flex-1
                bg-black/40
                border border-white/10
                px-5 py-4
                rounded-xl
                outline-none
                text-white
                placeholder:text-gray-500
                focus:border-green-400
                focus:ring-2
                focus:ring-green-400/30
                transition
              "
            />

            <button
              onClick={openProject}
              className="
                bg-green-400
                hover:bg-green-300
                active:scale-95
                transition
                text-black
                px-6
                rounded-xl
                font-bold
                shadow-[0_0_25px_rgba(34,197,94,0.5)]
              "
            >
              OPEN
            </button>

          </div>

          <div className="mt-4 text-xs text-gray-500">
            Supports: direct code or full LinkBytez URL
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-10 text-xs text-gray-500">
          Powered by LinkBytez Player System
        </div>

      </div>
    </main>
  );
}