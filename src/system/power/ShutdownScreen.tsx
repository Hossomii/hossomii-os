import {
  useEffect,
  useState,
} from "react";

import {
  useSystemStore,
} from "../../stores/systemStore";

type ShutdownStage =
  | "saving"
  | "shutting-down";

export function ShutdownScreen() {
  const completeShutdown =
    useSystemStore(
      (state) =>
        state.completeShutdown
    );

  const [
    stage,
    setStage,
  ] =
    useState<ShutdownStage>(
      "saving"
    );

  useEffect(() => {
    const stageTimer =
      window.setTimeout(
        () => {
          setStage(
            "shutting-down"
          );
        },
        900
      );

    const shutdownTimer =
      window.setTimeout(
        () => {
          completeShutdown();
        },
        2200
      );

    return () => {
      window.clearTimeout(
        stageTimer
      );

      window.clearTimeout(
        shutdownTimer
      );
    };
  }, [
    completeShutdown,
  ]);

  return (
    <main className="shutdown-screen">
      <div className="shutdown-content">
        <div className="shutdown-logo">
          HOSSOMII OS
        </div>

        <p>
          {stage === "saving"
            ? "Salvando suas configurações..."
            : "O HOSSOMII OS está sendo desligado..."}
        </p>

        <div
          className="shutdown-progress"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </main>
  );
}