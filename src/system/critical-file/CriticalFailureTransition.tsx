import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { useCriticalFileStore } from "../../stores/criticalFileStore";
import { useWindowStore } from "../../stores/windowStore";

type FailureTransitionPhase =
  | "closing-windows"
  | "glitching"
  | "shutting-down"
  | "blackout"
  | "recovery-boot";

type PixelBlock = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  opacity: number;
};

type PixelTearRow = {
  id: string;
  top: number;
  left: number;
  columns: number;
  cellSize: number;
  pattern: boolean[];
  color: string;
  delay: number;
  duration: number;
  opacity: number;
};

const PHASE_TIMINGS: Record<FailureTransitionPhase, number> = {
  "closing-windows": 220,
  glitching: 1300,
  "shutting-down": 580,
  blackout: 420,
  "recovery-boot": 1700,
};

const GLITCH_COLORS = [
  "#00ffff",
  "#ff006e",
  "#fff200",
  "#ffffff",
  "#8a2eff",
  "#00ff66",
  "#ff4d00",
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomInteger(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

function randomFrom<T>(items: T[]) {
  return items[randomInteger(0, items.length - 1)];
}

function createPixelBlocks(): PixelBlock[] {
  const count = randomInteger(32, 52);

  return Array.from({ length: count }, (_, index) => {
    const size = randomInteger(4, 11);
    const widthUnits = randomInteger(1, 5);
    const heightUnits = randomInteger(1, 3);

    return {
      id: `block-${index}`,
      left: randomBetween(2, 93),
      top: randomBetween(4, 90),
      width: widthUnits,
      height: heightUnits,
      size,
      color: randomFrom(GLITCH_COLORS),
      delay: randomInteger(0, 560),
      duration: randomInteger(120, 260),
      opacity: randomBetween(0.55, 0.95),
    };
  });
}

function createRowPattern(columns: number) {
  return Array.from({ length: columns }, () => Math.random() > 0.32);
}

function createPixelTears(): PixelTearRow[] {
  const count = randomInteger(7, 12);

  return Array.from({ length: count }, (_, index) => {
    const columns = randomInteger(12, 42);
    const cellSize = randomInteger(4, 8);

    return {
      id: `tear-${index}`,
      top: randomBetween(8, 86),
      left: randomBetween(-3, 18),
      columns,
      cellSize,
      pattern: createRowPattern(columns),
      color: randomFrom(GLITCH_COLORS),
      delay: randomInteger(0, 380),
      duration: randomInteger(110, 210),
      opacity: randomBetween(0.5, 0.92),
    };
  });
}

export function CriticalFailureTransition() {
  const startRecovery = useCriticalFileStore((state) => state.startRecovery);

  const resetWindows = useWindowStore((state) => state.resetWindows);

  const [phase, setPhase] = useState<FailureTransitionPhase>("closing-windows");

  const glitchBlocks = useMemo(() => createPixelBlocks(), []);

  const glitchTears = useMemo(() => createPixelTears(), []);

  useEffect(() => {
    resetWindows();
  }, [resetWindows]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (phase === "closing-windows") {
        setPhase("glitching");
        return;
      }

      if (phase === "glitching") {
        setPhase("shutting-down");
        return;
      }

      if (phase === "shutting-down") {
        setPhase("blackout");
        return;
      }

      if (phase === "blackout") {
        setPhase("recovery-boot");
        return;
      }

      startRecovery();
    }, PHASE_TIMINGS[phase]);

    return () => {
      window.clearTimeout(timer);
    };
  }, [phase, startRecovery]);

  return (
    <div
      className={`critical-transition critical-transition-${phase}`}
      data-transition-phase={phase}
    >
      {phase === "glitching" && (
        <DesktopCorruption blocks={glitchBlocks} tears={glitchTears} />
      )}

      {phase === "shutting-down" && <ShutdownScreen />}

      {phase === "blackout" && (
        <div className="critical-blackout" aria-hidden="true" />
      )}

      {phase === "recovery-boot" && <RecoveryBootScreen />}
    </div>
  );
}

type DesktopCorruptionProps = {
  blocks: PixelBlock[];
  tears: PixelTearRow[];
};

function DesktopCorruption({ blocks, tears }: DesktopCorruptionProps) {
  return (
    <div className="critical-glitch-stage" aria-hidden="true">
      <div className="critical-glitch-rgb-shift" />
      <div className="critical-glitch-flash" />

      {tears.map((tear) => {
        const rowStyle: CSSProperties = {
          left: `${tear.left}%`,
          top: `${tear.top}%`,
          opacity: tear.opacity,
          animationDelay: `${tear.delay}ms`,
          animationDuration: `${tear.duration}ms`,
        };

        return (
          <span
            key={tear.id}
            className="critical-glitch-tear-row"
            style={rowStyle}
          >
            {tear.pattern.map((visible, index) => (
              <span
                key={`${tear.id}-${index}`}
                className={`critical-glitch-tear-cell ${
                  visible ? "is-visible" : ""
                }`}
                style={{
                  width: tear.cellSize,
                  height: tear.cellSize,
                  color: tear.color,
                  backgroundColor: visible ? tear.color : "transparent",
                }}
              />
            ))}
          </span>
        );
      })}

      {blocks.map((block) => {
        const blockStyle: CSSProperties = {
          left: `${block.left}%`,
          top: `${block.top}%`,
          width: block.width * block.size,
          height: block.height * block.size,
          opacity: block.opacity,
          color: block.color,
          animationDelay: `${block.delay}ms`,
          animationDuration: `${block.duration}ms`,
          backgroundImage: `
    linear-gradient(${block.color}, ${block.color}),
    linear-gradient(${block.color}, ${block.color})
  `,
          backgroundSize: `${block.size}px ${block.size}px`,
        };

        return (
          <span
            key={block.id}
            className="critical-glitch-block"
            style={blockStyle}
          />
        );
      })}

      <div className="critical-glitch-noise-grid" />
    </div>
  );
}

function ShutdownScreen() {
  return (
    <div className="critical-shutdown-stage" aria-hidden="true">
      <div className="critical-shutdown-image" />
    </div>
  );
}

function RecoveryBootScreen() {
  return (
    <div className="recovery-boot-screen">
      <div className="recovery-boot-content">
        <div className="recovery-boot-heading">INITIALIZING RECOVERY...</div>

        <div className="recovery-boot-lines">
          <p>LOADING EMERGENCY SUBSYSTEM...</p>
          <p>CHECKING SYSTEM STRUCTURE...</p>
          <p>PREPARING RECOVERY ENVIRONMENT...</p>
        </div>
      </div>
    </div>
  );
}
