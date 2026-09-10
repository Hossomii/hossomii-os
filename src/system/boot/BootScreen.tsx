import { useSystemStore } from "../../stores/systemStore";

export function BootScreen() {
  const setPhase = useSystemStore((state) => state.setPhase);

  function finishBoot() {
    setPhase("desktop");
  }

  return (
    <main className="system-screen">
      <h1>ACCESS GRANTED</h1>

      <p>Loading profile...</p>
      <p>Starting system...</p>

      <button onClick={finishBoot}>
        Start desktop
      </button>
    </main>
  );
}