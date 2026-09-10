import { useSystemStore } from "../stores/systemStore";

export function Desktop() {
  const resetSystem = useSystemStore(
    (state) => state.resetSystem
  );

  return (
    <main className="system-screen">
      <h1>HOSSOMII OS</h1>

      <p>Desktop initialized.</p>

      <button onClick={resetSystem}>
        Restart
      </button>
    </main>
  );
}