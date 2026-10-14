export type NarrativeTriggerId =
  | "terminal-command"
  | "file-opened"
  | "directory-entered"
  | "file-deleted"
  | "system-recovered"
  | "session-started";

export type NarrativeEventId =
  | "operator-record-discovered"
  | "maintenance-record-discovered"
  | "operator-identity-acknowledged"
  | "maintenance-version-acknowledged";

export type NarrativeContext = {
  trigger: NarrativeTriggerId;

  command?: string;

  itemId?: string;

  directoryId?: string;
};

export type NarrativeSnapshot = {
  discoveredEvents:
    readonly NarrativeEventId[];

  triggerCounts:
    Readonly<
      Partial<
        Record<
          NarrativeTriggerId,
          number
        >
      >
    >;
};

export type NarrativeEffect =
  | {
      type: "terminal-lines";

      lines: string[];
    }
  | {
      type: "none";
    };

export type NarrativeEventDefinition = {
  id:
    NarrativeEventId;

  trigger:
    NarrativeTriggerId;

  once:
    boolean;

  condition: (
    context:
      NarrativeContext,
    snapshot:
      NarrativeSnapshot,
  ) => boolean;

  effect: (
    context:
      NarrativeContext,
    snapshot:
      NarrativeSnapshot,
  ) => NarrativeEffect;
};
