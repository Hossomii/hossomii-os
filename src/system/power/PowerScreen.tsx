import { useSystemStore } from "../../stores/systemStore";

import { audioManager } from "../audio/audioManager";

export function PowerScreen() {
  const powerOnSystem = useSystemStore((state) => state.powerOnSystem);

  function handlePowerOn() {
    audioManager.preload([
      "ui-keypress",
      "ui-error",
      "ui-folder-open",
      "system-login",
      "system-shutdown",
      "system-recovery",
      "system-glitch",
    ]);

    void audioManager.play("system-startup");

    powerOnSystem();
  }

  return (
    <main className="power-screen">
      <button
        type="button"
        className="power-button-minimal"
        onClick={handlePowerOn}
        aria-label="Ligar HOSSOMII-01"
      >
        <span aria-hidden="true">⏻</span>
      </button>
    </main>
  );
}
