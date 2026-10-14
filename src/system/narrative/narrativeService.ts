import { useNarrativeStore } from "../../stores/narrativeStore";

import { NARRATIVE_REGISTRY } from "./narrativeRegistry";

import type { NarrativeContext, NarrativeEffect } from "./types";

export function evaluateNarrative(
  context:
    NarrativeContext,
): NarrativeEffect[] {
  useNarrativeStore
    .getState()
    .recordTrigger(
      context.trigger,
    );

  const effects:
    NarrativeEffect[] =
      [];

  for (
    const event
    of NARRATIVE_REGISTRY
  ) {
    if (
      event.trigger !==
      context.trigger
    ) {
      continue;
    }

    const state =
      useNarrativeStore.getState();

    if (
      event.once &&
      state.hasDiscovered(
        event.id,
      )
    ) {
      continue;
    }

    const snapshot = {
      discoveredEvents:
        state.discoveredEvents,

      triggerCounts:
        state.triggerCounts,
    };

    if (
      !event.condition(
        context,
        snapshot,
      )
    ) {
      continue;
    }

    const effect =
      event.effect(
        context,
        snapshot,
      );

    if (
      event.once
    ) {
      state.markDiscovered(
        event.id,
      );
    }

    if (
      effect.type !==
      "none"
    ) {
      effects.push(
        effect,
      );
    }
  }

  return effects;
}
