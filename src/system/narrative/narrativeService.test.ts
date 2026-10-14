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

  it("marks recovery completion as discovered", () => {
    const effects = evaluateNarrative({
      trigger: "system-recovered",
    });

    expect(effects).toEqual([]);

    expect(
      useNarrativeStore.getState().hasDiscovered("recovery-completed"),
    ).toBe(true);
  });

  it("does not reveal recovery host metadata before recovery", () => {
    const effects = evaluateNarrative({
      trigger: "terminal-command",

      command: "hostname",
    });

    expect(effects).toEqual([]);
  });

  it("reveals recovery metadata through hostname after recovery", () => {
    evaluateNarrative({
      trigger: "system-recovered",
    });

    const effects = evaluateNarrative({
      trigger: "terminal-command",

      command: "hostname",
    });

    expect(effects).toEqual([
      {
        type: "terminal-lines",

        lines: [
          "[recovery] registro de falha de integridade associado a este host.",
        ],
      },
    ]);
  });

  it("shows the recovery hostname response only once", () => {
    evaluateNarrative({
      trigger: "system-recovered",
    });

    evaluateNarrative({
      trigger: "terminal-command",

      command: "hostname",
    });

    const effects = evaluateNarrative({
      trigger: "terminal-command",

      command: "hostname",
    });

    expect(effects).toEqual([]);
  });
});
