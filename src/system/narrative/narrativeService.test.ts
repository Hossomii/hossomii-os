import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAchievementStore } from "../../stores/achievementStore";

import { useNarrativeStore } from "../../stores/narrativeStore";

import { NARRATIVE_REGISTRY } from "./narrativeRegistry";
import { evaluateNarrative } from "./narrativeService";

import type { NarrativeContext } from "./types";

const narrativeAchievementCases = [
  {
    eventId: "hidden-archive-discovered",
    achievementId: "hidden-archive",
    context: {
      trigger: "directory-entered",
      directoryId: "system-archive",
    },
  },
  {
    eventId: "operator-record-discovered",
    achievementId: "operator-archive",
    context: {
      trigger: "file-opened",
      itemId: "operator-record-file",
    },
  },
] as const;

describe("narrativeService", () => {
  beforeEach(() => {
    useNarrativeStore.getState().resetNarrative();

    useAchievementStore.setState({
      unlockedAchievements: [],
      unlockedAtById: {},
      pendingNotifications: [],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
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

  it("discovers the hidden archive and unlocks its achievement when entered", () => {
    const effects = evaluateNarrative({
      trigger: "directory-entered",

      directoryId: "system-archive",
    });

    expect(effects).toEqual([]);
    expect(useNarrativeStore.getState().discoveredEvents).toEqual([
      "hidden-archive-discovered",
    ]);
    expect(useAchievementStore.getState().unlockedAchievements).toEqual([
      "hidden-archive",
    ]);
    expect(useAchievementStore.getState().pendingNotifications).toEqual([
      "hidden-archive",
    ]);
  });

  it("discovers the operator record and unlocks its achievement when opened", () => {
    const effects = evaluateNarrative({
      trigger: "file-opened",

      itemId: "operator-record-file",
    });

    expect(effects).toEqual([]);

    expect(
      useNarrativeStore.getState().hasDiscovered("operator-record-discovered"),
    ).toBe(true);

    expect(useAchievementStore.getState().unlockedAchievements).toEqual([
      "operator-archive",
    ]);
    expect(useAchievementStore.getState().pendingNotifications).toEqual([
      "operator-archive",
    ]);
  });

  it.each<NarrativeContext>([
    { trigger: "directory-entered", directoryId: "anthony" },
    { trigger: "file-opened", itemId: "maintenance-record-file" },
    { trigger: "terminal-command", command: "whoami" },
    { trigger: "terminal-command", directoryId: "system-archive" },
    { trigger: "file-opened", directoryId: "system-archive" },
    { trigger: "directory-entered", itemId: "operator-record-file" },
    { trigger: "terminal-command", itemId: "operator-record-file" },
  ])("does not unlock either achievement for unrelated context %j", (context) => {
    evaluateNarrative(context);

    expect(
      useNarrativeStore.getState().hasDiscovered("hidden-archive-discovered"),
    ).toBe(false);
    expect(
      useNarrativeStore.getState().hasDiscovered("operator-record-discovered"),
    ).toBe(false);
    expect(useAchievementStore.getState().unlockedAchievements).toEqual([]);
    expect(useAchievementStore.getState().pendingNotifications).toEqual([]);
  });

  it.each(narrativeAchievementCases)(
    "keeps $achievementId unique and preserves its original unlock timestamp",
    ({ eventId, achievementId, context }) => {
      vi.useFakeTimers();
      const originalUnlockTime = "2026-11-01T12:00:00.000Z";
      vi.setSystemTime(new Date(originalUnlockTime));

      evaluateNarrative(context);

      expect(useAchievementStore.getState().getUnlockedAt(achievementId)).toBe(
        originalUnlockTime,
      );

      vi.setSystemTime(new Date("2026-11-02T12:00:00.000Z"));
      evaluateNarrative(context);
      evaluateNarrative(context);

      expect(useNarrativeStore.getState().discoveredEvents).toEqual([eventId]);
      expect(useAchievementStore.getState().unlockedAchievements).toEqual([
        achievementId,
      ]);
      expect(useAchievementStore.getState().pendingNotifications).toEqual([
        achievementId,
      ]);
      expect(useAchievementStore.getState().getUnlockedAt(achievementId)).toBe(
        originalUnlockTime,
      );

      useAchievementStore.getState().dismissNotification();
      evaluateNarrative(context);

      expect(useAchievementStore.getState().pendingNotifications).toEqual([]);
      expect(useAchievementStore.getState().getUnlockedAt(achievementId)).toBe(
        originalUnlockTime,
      );
    },
  );

  describe.each(narrativeAchievementCases)(
    "persisted $eventId discovery",
    ({ eventId, achievementId, context }) => {
      it.each([
        { trigger: "session-started" },
        context,
      ] satisfies NarrativeContext[])(
        "reconciles its missing achievement on %j without replaying the event",
        (evaluationContext) => {
          useNarrativeStore.setState({ discoveredEvents: [eventId] });

          const event = NARRATIVE_REGISTRY.find(({ id }) => id === eventId)!;
          const effect = vi.spyOn(event, "effect").mockReturnValue({
            type: "terminal-lines",
            lines: ["This once-only effect must not replay."],
          });

          const effects = evaluateNarrative(evaluationContext);

          expect(effects).toEqual([]);
          expect(effect).not.toHaveBeenCalled();
          expect(useNarrativeStore.getState().discoveredEvents).toEqual([eventId]);
          expect(useAchievementStore.getState().unlockedAchievements).toEqual([
            achievementId,
          ]);
          expect(useAchievementStore.getState().pendingNotifications).toEqual([
            achievementId,
          ]);
        },
      );
    },
  );

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
