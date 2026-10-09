import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  AudioManager,
} from "./audioManager";

class FakeAudio {
  static instances:
    FakeAudio[] = [];

  src: string;

  preload = "";

  volume = 1;

  muted = false;

  playbackRate = 1;

  currentTime = 0;

  play =
    vi.fn(
      () =>
        Promise.resolve(),
    );

  pause =
    vi.fn();

  private listeners =
    new Map<
      string,
      Set<() => void>
    >();

  constructor(
    src = "",
  ) {
    this.src =
      src;

    FakeAudio.instances.push(
      this,
    );
  }

  cloneNode() {
    return new FakeAudio(
      this.src,
    );
  }

  addEventListener(
    type: string,
    listener: () => void,
  ) {
    const listeners =
      this.listeners.get(
        type,
      ) ??
      new Set();

    listeners.add(
      listener,
    );

    this.listeners.set(
      type,
      listeners,
    );
  }

  removeEventListener(
    type: string,
    listener: () => void,
  ) {
    this.listeners
      .get(type)
      ?.delete(
        listener,
      );
  }

  emit(
    type: string,
  ) {
    for (
      const listener
      of this.listeners.get(
        type,
      ) ?? []
    ) {
      listener();
    }
  }
}

describe(
  "AudioManager",
  () => {
    beforeEach(() => {
      FakeAudio.instances =
        [];

      vi.stubGlobal(
        "Audio",
        FakeAudio,
      );
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it(
      "does not create playback while muted",
      async () => {
        const manager =
          new AudioManager();

        manager.setMuted(
          true,
        );

        expect(
          await manager.play(
            "ui-folder-open",
          ),
        ).toBe(false);

        expect(
          FakeAudio.instances,
        ).toHaveLength(0);
      },
    );

    it(
      "does not create playback at zero master volume",
      async () => {
        const manager =
          new AudioManager();

        manager.setMasterVolume(
          0,
        );

        expect(
          await manager.play(
            "ui-folder-open",
          ),
        ).toBe(false);

        expect(
          FakeAudio.instances,
        ).toHaveLength(0);
      },
    );

    it(
      "restarts sounds configured with restart mode",
      async () => {
        const manager =
          new AudioManager();

        await manager.play(
          "ui-folder-open",
        );

        const firstPlayback =
          FakeAudio.instances[1];

        await manager.play(
          "ui-folder-open",
        );

        expect(
          firstPlayback.pause,
        ).toHaveBeenCalledOnce();
      },
    );

    it(
      "ignores duplicate system sounds while already playing",
      async () => {
        const manager =
          new AudioManager();

        expect(
          await manager.play(
            "system-glitch",
          ),
        ).toBe(true);

        expect(
          await manager.play(
            "system-glitch",
          ),
        ).toBe(false);

        expect(
          FakeAudio.instances,
        ).toHaveLength(2);
      },
    );

    it(
      "limits overlapping keypress voices",
      async () => {
        const manager =
          new AudioManager();

        for (
          let index = 0;
          index < 5;
          index += 1
        ) {
          await manager.play(
            "ui-keypress",
          );
        }

        const firstPlayback =
          FakeAudio.instances[1];

        expect(
          firstPlayback.pause,
        ).toHaveBeenCalledOnce();

        expect(
          FakeAudio.instances,
        ).toHaveLength(6);
      },
    );

    it(
      "allows an ignored cue to play again after it ends",
      async () => {
        const manager =
          new AudioManager();

        await manager.play(
          "system-glitch",
        );

        const playback =
          FakeAudio.instances[1];

        playback.emit(
          "ended",
        );

        expect(
          await manager.play(
            "system-glitch",
          ),
        ).toBe(true);
      },
    );
  },
);