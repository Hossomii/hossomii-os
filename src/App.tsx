import { useSystemStore } from "./stores/systemStore";

import { LoginScreen } from "./system/auth/LoginScreen";
import { AuthenticatingScreen } from "./system/auth/AuthenticatingScreen";
import { BootScreen } from "./system/boot/BootScreen";
import { Desktop } from "./desktop/Desktop";

function App() {
  const phase = useSystemStore((state) => state.phase);

  switch (phase) {
    case "login":
      return <LoginScreen />;

    case "authenticating":
      return <AuthenticatingScreen />;

    case "booting":
      return <BootScreen />;

    case "desktop":
      return <Desktop />;

    default:
      return null;
  }
}

export default App;