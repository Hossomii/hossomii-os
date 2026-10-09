import { useSystemPreferencesStore } from "../../stores/systemPreferencesStore";

import { audioManager } from "./audioManager";

let unsubscribePreferences: (() => void) | null = null;

export function initializeAudioPreferences() {
  if (unsubscribePreferences) {
    return;
  }

  const initialState = useSystemPreferencesStore.getState();

  audioManager.setMuted(initialState.audioMuted);

  audioManager.setMasterVolume(initialState.audioVolume);

  unsubscribePreferences = useSystemPreferencesStore.subscribe(
    (state, previousState) => {
      if (state.audioMuted !== previousState.audioMuted) {
        audioManager.setMuted(state.audioMuted);
      }

      if (state.audioVolume !== previousState.audioVolume) {
        audioManager.setMasterVolume(state.audioVolume);
      }
    },
  );
}

export function disposeAudioPreferencesSync() {
  unsubscribePreferences?.();

  unsubscribePreferences = null;
}
