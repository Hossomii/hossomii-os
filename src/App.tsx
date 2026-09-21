import {
  useSystemStore,
} from "./stores/systemStore";

import {
  LoginScreen,
} from "./system/auth/LoginScreen";

import {
  AuthenticatingScreen,
} from "./system/auth/AuthenticatingScreen";

import {
  BootScreen,
} from "./system/boot/BootScreen";

import {
  Desktop,
} from "./desktop/Desktop";

import {
  ShutdownScreen,
} from "./system/power/ShutdownScreen";

import {
  PoweredOffScreen,
} from "./system/power/PoweredOffScreen";

import "./styles/power.css";

function App() {
  const phase =
    useSystemStore(
      (state) =>
        state.phase
    );

  switch (phase) {
    case "login":
      return (
        <LoginScreen />
      );

    case "authenticating":
      return (
        <AuthenticatingScreen />
      );

    case "booting":
      return (
        <BootScreen />
      );

    case "desktop":
      return (
        <Desktop />
      );

    case "shutting-down":
      return (
        <ShutdownScreen />
      );

    case "powered-off":
      return (
        <PoweredOffScreen />
      );

    default:
      return null;
  }
}

export default App;