import { useEffect, useRef } from "react";
import { sound } from "./SoundEngine";
import Icon from "@/components/ui/icon";

interface TrailerModalProps {
  onClose: () => void;
}

// We embed a real YouTube gameplay trailer (Battlefield / CoD style, public)
// Using an officially available military game trailer from YouTube
const TRAILER_EMBED = "https://www.youtube.com/embed/mvrd4UPEI0w?autoplay=1&mute=0&controls=1&rel=0&showinfo=0&modestbranding=1";

export default function TrailerModal({ onClose }: TrailerModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      style={{ background: "rgba(10,12,8,0.97)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) { sound.click(); onClose(); } }}
    >
      {/* Corner decorations */}
      <div className="absolute top-8 left-8" style={{ width: 32, height: 32, borderTop: "2px solid rgba(143,160,64,0.5)", borderLeft: "2px solid rgba(143,160,64,0.5)" }} />
      <div className="absolute top-8 right-8" style={{ width: 32, height: 32, borderTop: "2px solid rgba(143,160,64,0.5)", borderRight: "2px solid rgba(143,160,64,0.5)" }} />
      <div className="absolute bottom-8 left-8" style={{ width: 32, height: 32, borderBottom: "2px solid rgba(143,160,64,0.5)", borderLeft: "2px solid rgba(143,160,64,0.5)" }} />
      <div className="absolute bottom-8 right-8" style={{ width: 32, height: 32, borderBottom: "2px solid rgba(143,160,64,0.5)", borderRight: "2px solid rgba(143,160,64,0.5)" }} />

      <div
        className="relative w-full max-w-4xl mx-6"
        style={{
          animation: "trailerIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <div className="font-mono text-[10px] text-[rgba(143,160,64,0.5)] tracking-[0.3em] uppercase mb-1">// ОФИЦИАЛЬНЫЙ ТРЕЙЛЕР //</div>
            <div className="font-oswald text-2xl text-[rgba(232,240,176,0.9)] tracking-wider uppercase">Confrontation — Сезон IV</div>
          </div>
          <button
            onClick={() => { sound.click(); onClose(); }}
            className="flex items-center gap-2 font-mono text-[11px] text-[rgba(143,160,64,0.5)] hover:text-[rgba(143,160,64,0.9)] transition-colors border border-[rgba(90,99,53,0.3)] hover:border-[rgba(143,160,64,0.5)] px-3 py-2"
          >
            <Icon name="X" size={14} />
            ESC
          </button>
        </div>

        {/* Video container */}
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            border: "1px solid rgba(90,99,53,0.4)",
            background: "#0a0c08",
            boxShadow: "0 0 80px rgba(143,160,64,0.1), 0 0 160px rgba(90,99,53,0.05)",
          }}
        >
          {/* Scanline on video */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)"
          }} />

          <iframe
            src={TRAILER_EMBED}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Confrontation Trailer"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-4">
            {["Тактика", "Команда", "Выживание"].map(tag => (
              <span key={tag} className="font-mono text-[10px] text-[rgba(107,122,58,0.5)] uppercase tracking-wider"># {tag}</span>
            ))}
          </div>
          <div className="font-mono text-[10px] text-[rgba(90,99,53,0.4)] tracking-wider">CONFRONTATION // 2026</div>
        </div>
      </div>

      <style>{`
        @keyframes trailerIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
