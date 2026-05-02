import { useEffect, useState, useRef } from "react";
import { sound } from "./SoundEngine";

const LOGO_IMG = "https://cdn.poehali.dev/projects/d3a33a24-4716-4cb8-b8dd-e76cc2556330/files/b53530de-b0b0-4e5e-95d2-69c36b69bd0e.jpg";

interface IntroProps {
  onDone: () => void;
}

const PHRASES = [
  "ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ...",
  "ЗАГРУЗКА ТАКТИЧЕСКИХ ДАННЫХ...",
  "АВТОРИЗАЦИЯ БОЙЦА...",
  "ПОДКЛЮЧЕНИЕ К СЕРВЕРАМ...",
  "CONFRONTATION — ГОТОВ",
];

export default function Intro({ onDone }: IntroProps) {
  const [phase, setPhase] = useState<"boot" | "logo" | "title" | "done">("boot");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [glitch, setGlitch] = useState(false);
  const [scanPct, setScanPct] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [bars, setBars] = useState<number[]>([]);
  const [skipVisible, setSkipVisible] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimeout = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timeouts.current.push(t);
    return t;
  };

  useEffect(() => {
    // Random glitch bars
    setBars(Array.from({ length: 12 }, () => Math.random() * 100));

    // Show skip button after 1s
    addTimeout(() => setSkipVisible(true), 1000);

    // Boot phase: type phrases
    sound.introGlitch();

    let totalDelay = 300;

    PHRASES.forEach((phrase, pi) => {
      addTimeout(() => {
        setPhraseIdx(pi);
        setTyped("");
        sound.introBeep(0);

        // Type effect
        phrase.split("").forEach((_, ci) => {
          addTimeout(() => {
            setTyped(phrase.slice(0, ci + 1));
          }, ci * 28);
        });
      }, totalDelay);
      totalDelay += phrase.length * 28 + 380;
    });

    // Scan bar animation
    const scanStart = 400;
    addTimeout(() => {
      let pct = 0;
      const interval = setInterval(() => {
        pct += 1.2;
        setScanPct(Math.min(pct, 100));
        if (pct >= 100) clearInterval(interval);
      }, 50);
    }, scanStart);

    // Phase 2: Logo
    addTimeout(() => {
      setPhase("logo");
      setLogoVisible(true);
      sound.introReveal();

      // Glitch effect
      for (let i = 0; i < 6; i++) {
        addTimeout(() => setGlitch(true), i * 120);
        addTimeout(() => setGlitch(false), i * 120 + 60);
      }
    }, 4200);

    // Phase 3: Title
    addTimeout(() => {
      setPhase("title");
      setTitleVisible(true);
      sound.introFinal();
    }, 6200);

    // Done
    addTimeout(() => {
      setPhase("done");
      addTimeout(onDone, 700);
    }, 8500);

    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  if (phase === "done") {
    return (
      <div
        className="fixed inset-0 z-[9999] bg-[#131610] pointer-events-none"
        style={{ animation: "introFadeOut 0.7s ease-in forwards" }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0c08] overflow-hidden flex flex-col items-center justify-center">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        zIndex: 10
      }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(90,99,53,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(90,99,53,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Glitch bars */}
      {glitch && bars.map((top, i) => (
        <div key={i} className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: `${top}%`,
            height: `${Math.random() * 6 + 1}px`,
            background: `rgba(${Math.random() > 0.5 ? "143,160,64" : "0,255,100"},0.${Math.floor(Math.random() * 4 + 1)})`,
            transform: `translateX(${(Math.random() - 0.5) * 40}px)`,
            zIndex: 20
          }}
        />
      ))}

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 pointer-events-none" style={{ zIndex: 15 }}>
        <div style={{ width: 40, height: 40, borderTop: "2px solid rgba(143,160,64,0.6)", borderLeft: "2px solid rgba(143,160,64,0.6)" }} />
      </div>
      <div className="absolute top-6 right-6 pointer-events-none" style={{ zIndex: 15 }}>
        <div style={{ width: 40, height: 40, borderTop: "2px solid rgba(143,160,64,0.6)", borderRight: "2px solid rgba(143,160,64,0.6)" }} />
      </div>
      <div className="absolute bottom-6 left-6 pointer-events-none" style={{ zIndex: 15 }}>
        <div style={{ width: 40, height: 40, borderBottom: "2px solid rgba(143,160,64,0.6)", borderLeft: "2px solid rgba(143,160,64,0.6)" }} />
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none" style={{ zIndex: 15 }}>
        <div style={{ width: 40, height: 40, borderBottom: "2px solid rgba(143,160,64,0.6)", borderRight: "2px solid rgba(143,160,64,0.6)" }} />
      </div>

      {/* TOP STATUS */}
      <div className="absolute top-8 left-0 right-0 flex justify-center pointer-events-none" style={{ zIndex: 15 }}>
        <div className="font-mono text-[10px] text-[rgba(143,160,64,0.5)] tracking-[0.3em] uppercase">
          CONFRONTATION // SYSTEM v4.2.1 // AUTHORIZED
        </div>
      </div>

      {/* BOOT PHASE */}
      {(phase === "boot") && (
        <div className="relative z-20 w-full max-w-2xl px-8">
          {/* Title top */}
          <div className="text-center mb-10">
            <div className="font-mono text-[10px] text-[rgba(143,160,64,0.4)] tracking-[0.5em] mb-2">// MILITARY TACTICAL PLATFORM //</div>
            <div
              className="font-oswald text-6xl text-[rgba(143,160,64,0.15)] tracking-[0.3em] uppercase select-none"
              style={{ textShadow: "0 0 60px rgba(143,160,64,0.1)" }}
            >
              CONFRONTATION
            </div>
          </div>

          {/* Console lines */}
          <div className="bg-[rgba(10,12,8,0.9)] border border-[rgba(90,99,53,0.3)] p-5 mb-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <div className="text-[rgba(143,160,64,0.4)] text-[10px] mb-3 tracking-wider">[ SYSTEM BOOT LOG ]</div>
            {PHRASES.slice(0, phraseIdx).map((p, i) => (
              <div key={i} className="text-[11px] mb-1 flex items-center gap-2">
                <span className="text-[rgba(107,122,58,0.5)]">[OK]</span>
                <span className="text-[rgba(143,160,64,0.7)]">{p}</span>
              </div>
            ))}
            <div className="text-[11px] flex items-center gap-2">
              <span className="text-[#8fa040] animate-pulse">[  ]</span>
              <span className="text-[#8fa040]">
                {typed}
                <span className="inline-block w-2 h-3 bg-[#8fa040] ml-0.5 animate-pulse" />
              </span>
            </div>
          </div>

          {/* Scan bar */}
          <div className="mb-2 flex justify-between items-center">
            <span className="font-mono text-[10px] text-[rgba(107,122,58,0.5)] tracking-widest">ЗАГРУЗКА СИСТЕМЫ</span>
            <span className="font-mono text-[10px] text-[#8fa040]">{Math.round(scanPct)}%</span>
          </div>
          <div style={{ height: 3, background: "rgba(90,99,53,0.2)", borderRadius: 2 }}>
            <div style={{
              height: "100%",
              width: `${scanPct}%`,
              background: "linear-gradient(90deg, #3d4228, #8fa040)",
              borderRadius: 2,
              transition: "width 0.1s linear",
              boxShadow: "0 0 8px rgba(143,160,64,0.5)"
            }} />
          </div>
        </div>
      )}

      {/* LOGO PHASE */}
      {(phase === "logo" || phase === "title") && (
        <div className="relative z-20 flex flex-col items-center">
          <div
            style={{
              opacity: logoVisible ? 1 : 0,
              transform: logoVisible ? "scale(1)" : "scale(1.1)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              filter: glitch ? "hue-rotate(90deg) saturate(3)" : "none",
            }}
          >
            <img
              src={LOGO_IMG}
              alt="CONFRONTATION"
              style={{
                width: 280,
                height: 280,
                objectFit: "cover",
                borderRadius: 2,
                border: "1px solid rgba(143,160,64,0.3)",
                boxShadow: "0 0 60px rgba(143,160,64,0.2), 0 0 120px rgba(90,99,53,0.1)",
                filter: glitch ? "hue-rotate(90deg) brightness(1.5)" : "none",
              }}
            />
          </div>

          {phase === "title" && (
            <div
              className="text-center mt-8"
              style={{
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
              }}
            >
              <div
                className="font-oswald tracking-[0.4em] uppercase"
                style={{
                  fontSize: 52,
                  color: "#e8f0b0",
                  textShadow: "0 0 30px rgba(143,160,64,0.6), 0 0 60px rgba(143,160,64,0.3)",
                  letterSpacing: "0.4em",
                }}
              >
                CONFRONTATION
              </div>
              <div className="font-mono text-[11px] text-[rgba(143,160,64,0.6)] tracking-[0.4em] mt-2 uppercase">
                Тактические сражения // Сезон IV
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {["━", "━", "━", "━", "━"].map((d, i) => (
                  <span key={i} className="text-[#8fa040]" style={{
                    opacity: 0,
                    animation: `fadeInDash 0.2s ease forwards`,
                    animationDelay: `${i * 0.1}s`
                  }}>{d}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* BOTTOM INFO */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-10 pointer-events-none" style={{ zIndex: 15 }}>
        <div className="font-mono text-[9px] text-[rgba(90,99,53,0.4)] tracking-wider">© CONFRONTATION 2026</div>
        <div className="font-mono text-[9px] text-[rgba(90,99,53,0.4)] tracking-wider">BUILD 4.2.1 // CLASSIFIED</div>
      </div>

      {/* Skip button */}
      {skipVisible && (
        <button
          onClick={() => { sound.click(); onDone(); }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[rgba(143,160,64,0.4)] hover:text-[rgba(143,160,64,0.8)] tracking-[0.3em] uppercase transition-colors border border-[rgba(90,99,53,0.2)] hover:border-[rgba(143,160,64,0.4)] px-4 py-2"
          style={{ zIndex: 30 }}
        >
          [ПРОПУСТИТЬ]
        </button>
      )}

      <style>{`
        @keyframes introFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes fadeInDash {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
