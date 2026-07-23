"use client";

import { useEffect, useState } from "react";

interface Props {
  service: string;
  defaultTags?: string[];
}

export default function ProfServiceTags({ service, defaultTags = [] }: Props) {
  const [tags, setTags] = useState<string[]>(defaultTags);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("encasa_prof_profile");
      if (raw) {
        const prof = JSON.parse(raw);
        if (Array.isArray(prof.tags) && prof.tags.length > 0) {
          setTags(prof.tags);
        }
      }
    } catch {}
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-lg text-sm font-medium">
        {service}
      </span>
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
