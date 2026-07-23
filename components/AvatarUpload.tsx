"use client";

import { useRef, useState, useEffect } from "react";
import { getStoredAvatar, setStoredAvatar, resizeImage } from "@/lib/avatar";

interface Props {
  sessionImage?: string | null;
  name?: string | null;
  size?: number;
}

export default function AvatarUpload({ sessionImage, name, size = 80 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setAvatar(getStoredAvatar());
  }, []);

  const src = avatar ?? sessionImage ?? null;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    setUploading(true);
    try {
      const dataUrl = await resizeImage(file, 300);
      setStoredAvatar(dataUrl);
      setAvatar(dataUrl);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="relative group flex-shrink-0 focus:outline-none"
      style={{ width: size, height: size }}
      title="Cambiar foto de perfil"
    >
      {/* Avatar */}
      {src ? (
        <img
          src={src}
          alt={name ?? "Avatar"}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <div
          className="rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-3xl w-full h-full"
        >
          {name?.[0]?.toUpperCase() ?? "👤"}
        </div>
      )}

      {/* Overlay con ícono de cámara */}
      <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        {uploading ? (
          <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </button>
  );
}
