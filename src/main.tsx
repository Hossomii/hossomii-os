import {
  StrictMode,
} from "react";

import {
  createRoot,
} from "react-dom/client";

import App from "./App";

import {
  initializeAudioPreferences,
} from "./system/audio/audioPreferencesSync";

import "./styles/global.css";

initializeAudioPreferences();

createRoot(
  document.getElementById(
    "root"
  )!
).render(
  <StrictMode>
    <App />
  </StrictMode>
);