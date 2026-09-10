import { useSystemStore } from "../../stores/systemStore";

export function AuthenticatingScreen() {
  const setPhase = useSystemStore((state) => state.setPhase);

  function continueBoot() {
    setPhase("booting");
  }

  return (
    <main className="system-screen">
      <h1>AUTHENTICATING...</h1>

      <button onClick={continueBoot}>
        Continue
      </button>
    </main>
  );
}