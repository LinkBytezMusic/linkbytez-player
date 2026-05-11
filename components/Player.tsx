"use client";

import { useEffect, useRef, useState } from "react";
import { getProjectByCode } from "@/api";

/* =========================
   TYPES
========================= */

type Track = {
  id?: string;
  title: string;
  audioURL: string;
  artworkURL?: string;
  description?: string;
  participants?: string;
};

type Project = {
  id: string;
  title: string;
  artworkURL: string;
  shareCode: string;
  tracks: Track[];
};

/* =========================
   COMPONENT
========================= */

export default function Player({ id }: { id: string }) {

  const [project, setProject] = useState<Project | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* =========================
     LOAD DATA
  ========================= */

  useEffect(() => {

    const load = async () => {

      setLoading(true);

      const data = await getProjectByCode(id) as Project;

      if (!data) {
        setProject(null);
        setLoading(false);
        return;
      }

      setProject(data);

      if (data.tracks?.length > 0) {
        setTrack(data.tracks[0]);
      }

      setLoading(false);
    };

    load();

  }, [id]);

  /* =========================
     PLAY TRACK
  ========================= */

  const playTrack = (t: Track) => {
    setTrack(t);
    setTimeout(() => {
      audioRef.current?.play();
    }, 100);
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        Project not found
      </div>
    );
  }

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-black text-white pb-40">

      {/* HERO COVER */}
      <div className="relative w-full h-[380px]">

        <img
          src={project.artworkURL}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-6 left-6">

          <h1 className="text-5xl font-black">
            {project.title}
          </h1>

          <p className="text-gray-400 mt-2">
            {project.tracks?.length} tracks
          </p>

        </div>

      </div>

      {/* TRACK LIST */}
      <div className="p-6 space-y-4">

        {project.tracks?.map((t, i) => (

          <div
            key={t.id || i}
            onClick={() => playTrack(t)}
            className={`
              flex items-center gap-4 p-4 rounded-xl cursor-pointer transition
              ${track?.audioURL === t.audioURL
                ? "bg-green-400 text-black"
                : "bg-white/10 hover:bg-white/20"
              }
            `}
          >

            <img
              src={t.artworkURL || project.artworkURL}
              className="w-14 h-14 rounded-lg object-cover"
            />

            <div className="flex flex-col">

              <span className="font-bold">
                {t.title}
              </span>

              {t.description && (
                <span className="text-xs opacity-70">
                  {t.description}
                </span>
              )}

            </div>

          </div>

        ))}

      </div>

      {/* GLOBAL PLAYER (CENTRALIZADO) */}
      {track && (

        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 p-4">

          <div className="flex flex-col items-center gap-3">

            {/* INFO TOP */}
            <div className="flex items-center gap-3">

              <img
                src={track.artworkURL || project.artworkURL}
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div className="text-center">

                <div className="font-bold">
                  {track.title}
                </div>

                <div className="text-xs text-gray-400">
                  {track.participants || project.title}
                </div>

              </div>

            </div>

            {/* CONTROLES CENTRALES */}
            <audio
              ref={audioRef}
              key={track.audioURL}
              controls
              autoPlay
              className="w-full max-w-xl"
            >
              <source src={track.audioURL} />
            </audio>

          </div>

        </div>

      )}

    </div>
  );
}