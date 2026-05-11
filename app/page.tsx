"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const openProject = () => {
    if (!code.trim()) return;

    let clean = code.trim();

    // soporta URL completa o código
    if (clean.includes("/p/")) {
      clean = clean.split("/p/")[1];
    }

    clean = clean.replace(/\//g, "");

    router.push(`/p/${clean}`);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-xl text-center">

        <h1 className="text-5xl font-black mb-6">
          LINKBYTEZ
        </h1>

        <p className="text-gray-400 mb-10">
          Enter your project code to open a private player
        </p>

        <div className="flex gap-3">

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") openProject();
            }}
            placeholder="Paste code (e.g. abc123)"
            className="
              flex-1
              bg-white/10
              border
              border-white/10
              px-5
              py-4
              rounded-xl
              outline-none
              focus:border-green-400
            "
          />

          <button
            onClick={openProject}
            className="
              bg-green-400
              text-black
              px-6
              rounded-xl
              font-bold
            "
          >
            OPEN
          </button>

        </div>

      </div>

    </main>
  );
}