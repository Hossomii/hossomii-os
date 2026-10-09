import { useSystemStore } from "../../stores/systemStore";

import { playSound, preloadAudioGroup } from "../audio/audioService";

export function PowerScreen() {
  const powerOnSystem = useSystemStore((state) => state.powerOnSystem);

  function handlePowerOn() {
    preloadAudioGroup("session");

    void playSound("system-startup");

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
