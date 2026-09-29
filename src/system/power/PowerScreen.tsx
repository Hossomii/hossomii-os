import {
  useSystemStore,
} from "../../stores/systemStore";

export function PowerScreen() {
  const powerOnSystem =
    useSystemStore(
      (state) =>
        state.powerOnSystem
    );

  return (
    <main className="power-screen">
      <button
        type="button"
        className="power-button-minimal"
        onClick={
          powerOnSystem
        }
        aria-label="Ligar HOSSOMII-01"
      >
        <span aria-hidden="true">
          ⏻
        </span>
      </button>
    </main>
  );
}