import { useEffect } from "react";

import { useSystemStore } from "../../stores/systemStore";

export function RestartScreen() {
  const resetSystem = useSystemStore((state) => state.resetSystem);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      resetSystem();
    }, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [resetSystem]);

  return (
    <main className="restart-screen">
      <section className="restart-content">
        <span className="restart-eyebrow">HOSSOMII-01</span>

        <h1>Reiniciando</h1>

        <p>Aguarde enquanto o sistema reinicia...</p>

        <div className="restart-progress" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}
