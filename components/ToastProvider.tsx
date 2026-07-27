"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ToastType = "success" | "remove" | "error";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons: Record<ToastType, string> = {
  success: "♥",
  remove: "♡",
  error: "✕",
};

const colors: Record<ToastType, string> = {
  success: "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-orange-500",
  remove: "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-400",
  error: "bg-red-600 text-white border-red-700",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 px-5 py-3 rounded-full border shadow-xl text-sm font-semibold animate-fade-in-up ${colors[toast.type]}`}
          >
            <span className="text-orange-400">{icons[toast.type]}</span>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
