const KEY = "encasa_avatar";
const EVENT = "encasa:avatar-updated";

export function getStoredAvatar(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setStoredAvatar(dataUrl: string): void {
  localStorage.setItem(KEY, dataUrl);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: dataUrl }));
}

export function clearStoredAvatar(): void {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: null }));
}

export function onAvatarUpdated(cb: (url: string | null) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

/** Redimensiona un File a un dataURL de máximo maxSize×maxSize px */
export function resizeImage(file: File, maxSize = 300): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = url;
  });
}
