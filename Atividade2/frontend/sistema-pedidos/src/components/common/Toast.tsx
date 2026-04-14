import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "error" | "success";
  onClose: () => void;
  duration?: number;
};

export function Toast({ message, type = "error", onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  const styles =
    type === "error"
      ? "bg-red-600 text-white"
      : "bg-emerald-600 text-white";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg text-sm font-medium ${styles}`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 transition-opacity text-base leading-none">
        ✕
      </button>
    </div>
  );
}
