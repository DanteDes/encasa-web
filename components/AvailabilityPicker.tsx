"use client";

import { useState, useEffect, useRef } from "react";

type Status = "disponible" | "ocupado" | "no-disponible";

const OPTIONS: { value: Status; label: string; color: string; dot: string }[] = [
  { value: "disponible",    label: "Disponible",    color: "text-green-400",  dot: "bg-green-500"  },
  { value: "ocupado",       label: "Ocupado",        color: "text-orange-400", dot: "bg-orange-500" },
  { value: "no-disponible", label: "No disponible",  color: "text-red-400",   dot: "bg-red-500"    },
];

function getStored(): Status {
  try {
    const raw = localStorage.getItem("encasa_prof_profile");
    if (raw) {
      const p = JSON.parse(raw);
      if (p.availability) return p.availability as Status;
    }
  } catch {}
  return "disponible";
}

function saveStatus(s: Status) {
  try {
    const raw = localStorage.getItem("encasa_prof_profile");
    const p = raw ? JSON.parse(raw) : {};
    p.availability = s;
    localStorage.setItem("encasa_prof_profile", JSON.stringify(p));
  } catch {}
}

export default function AvailabilityPicker() {
  const [status, setStatus] = useState<Status>("disponible");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStatus(getStored());
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = OPTIONS.find((o) => o.value === status) ?? OPTIONS[0];

  function pick(s: Status) {
    setStatus(s);
    saveStatus(s);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors"
      >
        <span className={`w-2.5 h-2.5 rounded-full ${current.dot} animate-pulse`} />
        {current.label}
        <svg className="w-3.5 h-3.5 text-zinc-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-44 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl py-1 z-50">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => pick(opt.value)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-zinc-800 transition-colors text-left ${
                status === opt.value ? "bg-zinc-800" : ""
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${opt.dot} flex-shrink-0`} />
              <span className={opt.color}>{opt.label}</span>
              {status === opt.value && (
                <svg className="w-3.5 h-3.5 text-zinc-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
