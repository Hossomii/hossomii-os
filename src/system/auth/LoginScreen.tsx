import { useSystemStore } from "../../stores/systemStore";

export function LoginScreen() {
  const setPhase = useSystemStore((state) => state.setPhase);

  function handleLogin() {
    setPhase("authenticating");
  }

  return (
    <main className="system-screen">
      <h1>HOSSOMII SYSTEMS</h1>

      <p>SECURE NODE 03</p>

      <p>&gt; connection established</p>
      <p>&gt; remote host detected</p>
      <p>&gt; authentication required</p>

      <button onClick={handleLogin}>
        Enter system
      </button>
    </main>
  );
}