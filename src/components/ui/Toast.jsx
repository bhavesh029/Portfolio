import { useEffect, useRef } from "react";

const Toast = ({ message, type = "success", isVisible, onClose }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: "border-green-500/30 bg-green-500/10 text-green-400",
    error: "border-red-500/30 bg-red-500/10 text-red-400",
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  return (
    <div
      className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-md animate-fade-in ${styles[type]}`}
    >
      {icons[type]}
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
