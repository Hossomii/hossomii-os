import { beforeEach, describe, expect, it } from "vitest";

import { useNarrativeStore } from "../../stores/narrativeStore";

import { evaluateNarrative } from "./narrativeService";

describe("narrativeService", () => {
  beforeEach(() => {
    useNarrativeStore.getState().resetNarrative();
  });

  it("records narrative triggers", () => {
    evaluateNarrative({
      trigger: "terminal-command",

      command: "whoami",
    });

    expect(
      useNarrativeStore.getState().getTriggerCount("terminal-command"),
    ).toBe(1);
  });

  it("returns no effects when no event conditions match", () => {
    const effects = evaluateNarrative({
      trigger: "terminal-command",

      command: "whoami",
    });

    expect(effects).toEqual([]);
  });

  it("increments trigger counts across evaluations", () => {
    evaluateNarrative({
      trigger: "terminal-command",
    });

    evaluateNarrative({
      trigger: "terminal-command",
    });

    expect(
      useNarrativeStore.getState().getTriggerCount("terminal-command"),
    ).toBe(2);
  });
});
