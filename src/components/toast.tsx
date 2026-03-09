"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type ToastType = "success" | "info" | "error";

interface ToastAction {
  label: string;
  href: string;
}

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  action?: ToastAction;
  duration: number;
}

interface ShowToastOptions {
  message: string;
  type?: ToastType;
  action?: ToastAction;
  duration?: number;
}

interface ToastContextValue {
  showToast: (options: ShowToastOptions) => void;
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Style maps                                                          */
/* ------------------------------------------------------------------ */

const STYLE_MAP: Record<
  ToastType,
  {
    border: string;
    bg: string;
    glow: string;
    iconColor: string;
    icon: string;
  }
> = {
  success: {
    border: "rgba(57, 255, 20, 0.4)",
    bg: "rgba(57, 255, 20, 0.08)",
    glow: "0 0 20px rgba(57, 255, 20, 0.15)",
    iconColor: "var(--neon-green)",
    icon: "✓",
  },
  info: {
    border: "rgba(0, 240, 255, 0.4)",
    bg: "rgba(0, 240, 255, 0.08)",
    glow: "0 0 20px rgba(0, 240, 255, 0.15)",
    iconColor: "var(--neon-cyan)",
    icon: "i",
  },
  error: {
    border: "rgba(255, 45, 120, 0.4)",
    bg: "rgba(255, 45, 120, 0.08)",
    glow: "0 0 20px rgba(255, 45, 120, 0.15)",
    iconColor: "var(--neon-pink)",
    icon: "!",
  },
};

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const MAX_VISIBLE = 3;
const DEFAULT_DURATION = 4000;

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  /* Clean up all timers on unmount */
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (options: ShowToastOptions) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const duration = options.duration ?? DEFAULT_DURATION;

      const toast: Toast = {
        id,
        message: options.message,
        type: options.type ?? "info",
        action: options.action,
        duration,
      };

      setToasts((prev) => {
        const next = [...prev, toast];
        /* Evict oldest if exceeding max */
        if (next.length > MAX_VISIBLE) {
          const evicted = next.slice(0, next.length - MAX_VISIBLE);
          evicted.forEach((t) => {
            const timer = timersRef.current.get(t.id);
            if (timer) {
              clearTimeout(timer);
              timersRef.current.delete(t.id);
            }
          });
          return next.slice(-MAX_VISIBLE);
        }
        return next;
      });

      /* Auto-dismiss */
      const timer = setTimeout(() => {
        dismiss(id);
      }, duration);
      timersRef.current.set(id, timer);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div
        aria-live="polite"
        aria-relevant="additions removals"
        className="fixed bottom-4 right-4 z-[60] flex flex-col gap-3 pointer-events-none"
        style={{ maxWidth: "min(380px, calc(100vw - 2rem))" }}
      >
        {toasts.map((toast) => {
          const s = STYLE_MAP[toast.type];
          return (
            <div
              key={toast.id}
              role="status"
              className="pointer-events-auto rounded-xl px-4 py-3 flex items-start gap-3 backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, ${s.bg}, rgba(10, 10, 20, 0.92))`,
                border: `1px solid ${s.border}`,
                boxShadow: `${s.glow}, inset 0 0 30px rgba(0, 0, 0, 0.3)`,
                animation: "toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              {/* Icon */}
              <span
                className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: s.iconColor,
                  background: `${s.bg}`,
                  border: `1px solid ${s.border}`,
                  textShadow: `0 0 6px ${s.border}`,
                }}
              >
                {s.icon}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs text-white/90 leading-relaxed"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {toast.message}
                </p>
                {toast.action && (
                  <a
                    href={toast.action.href}
                    className="inline-block mt-1.5 text-[10px] uppercase tracking-[2px] font-bold transition-all hover:opacity-80"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: s.iconColor,
                      textShadow: `0 0 8px ${s.border}`,
                    }}
                  >
                    {toast.action.label} &rarr;
                  </a>
                )}
              </div>

              {/* Dismiss */}
              <button
                onClick={() => dismiss(toast.id)}
                className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-white/30 hover:text-white/70 transition-colors"
                aria-label="Dismiss notification"
                style={{ fontSize: "14px", lineHeight: 1 }}
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
