import {
  useEffect,
} from "react";

import {
  useSystemStore,
} from "../../stores/systemStore";

import bootLogo from "../../assets/branding/hossomii-boot-logo.webp";

export function PowerOnScreen() {
  const completePowerOn =
    useSystemStore(
      (state) =>
        state.completePowerOn
    );

  useEffect(() => {
    const timer =
      window.setTimeout(
        () => {
          completePowerOn();
        },
        1900
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    completePowerOn,
  ]);

  return (
    <main className="power-on-screen">
      <section className="power-on-brand">
        <img
          src={bootLogo}
          alt="HOSSOMII OS"
          draggable={false}
        />

        <span>
          HOSSOMII OS
        </span>
      </section>
    </main>
  );
}