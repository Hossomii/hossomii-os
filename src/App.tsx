import { useSystemStore } from "./stores/systemStore";

import { LoginScreen } from "./system/auth/LoginScreen";

import { AuthenticatingScreen } from "./system/auth/AuthenticatingScreen";

import { BootScreen } from "./system/boot/BootScreen";

import { Desktop } from "./desktop/Desktop";

import { RestartScreen } from "./system/power/RestartScreen";

import { ShutdownScreen } from "./system/power/ShutdownScreen";

import { PoweredOffScreen } from "./system/power/PoweredOffScreen";

import { PowerScreen } from "./system/power/PowerScreen";

import { PowerOnScreen } from "./system/power/PowerOnScreen";

import "./styles/power.css";

function App() {
  const phase = useSystemStore((state) => state.phase);

  switch (phase) {
    case "power":
      return <PowerScreen />;

    case "powering-on":
      return <PowerOnScreen />;

    case "login":
      return <LoginScreen />;

    case "authenticating":
      return <AuthenticatingScreen />;

    case "restarting":
      return <RestartScreen />;

    case "booting":
      return <BootScreen />;

    case "desktop":
      return <Desktop />;

    case "shutting-down":
      return <ShutdownScreen />;

    case "powered-off":
      return <PoweredOffScreen />;

    default:
      return null;
  }
}

export default App;
