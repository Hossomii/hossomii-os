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

  it("marks the operator record as discovered when opened", () => {
    const effects = evaluateNarrative({
      trigger: "file-opened",

      itemId: "operator-record-file",
    });

    expect(effects).toEqual([]);

    expect(
      useNarrativeStore.getState().hasDiscovered("operator-record-discovered"),
    ).toBe(true);
  });

  it("reveals the operator identity response after reading operator.txt", () => {
    evaluateNarrative({
      trigger: "file-opened",

      itemId: "operator-record-file",
    });

    const effects = evaluateNarrative({
      trigger: "terminal-command",

      command: "whoami",
    });

    expect(effects).toEqual([
      {
        type: "terminal-lines",

        lines: ["[archive] perfil do operador vinculado à sessão atual."],
      },
    ]);
  });

  it("shows the operator identity response only once", () => {
    evaluateNarrative({
      trigger: "file-opened",

      itemId: "operator-record-file",
    });

    evaluateNarrative({
      trigger: "terminal-command",

      command: "whoami",
    });

    const effects = evaluateNarrative({
      trigger: "terminal-command",

      command: "whoami",
    });

    expect(effects).toEqual([]);
  });

  it("reveals maintenance metadata after reading maintenance.log", () => {
    evaluateNarrative({
      trigger: "file-opened",

      itemId: "maintenance-record-file",
    });

    const effects = evaluateNarrative({
      trigger: "terminal-command",

      command: "ver",
    });

    expect(effects).toEqual([
      {
        type: "terminal-lines",

        lines: [
          "[archive] metadados de manutenção disponíveis fora do índice padrão.",
        ],
      },
    ]);
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
