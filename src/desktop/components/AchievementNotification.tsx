import { useEffect } from "react";

import {
  ACHIEVEMENTS,
  useAchievementStore,
} from "../../stores/achievementStore";

export function AchievementNotification() {
  const pendingNotifications =
    useAchievementStore(
      (state) =>
        state.pendingNotifications
    );

  const dismissNotification =
    useAchievementStore(
      (state) =>
        state.dismissNotification
    );

  const activeAchievementId =
    pendingNotifications[0];

  useEffect(() => {
    if (!activeAchievementId) {
      return;
    }

    const timer = window.setTimeout(
      () => {
        dismissNotification();
      },
      5500
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    activeAchievementId,
    dismissNotification,
  ]);

  if (!activeAchievementId) {
    return null;
  }

  const achievement =
    ACHIEVEMENTS[
      activeAchievementId
    ];

  return (
    <aside
      className="achievement-notification"
      role="status"
      aria-live="polite"
    >
      <div
        className="achievement-notification-icon"
        aria-hidden="true"
      >
        ★
      </div>

      <div className="achievement-notification-content">
        <span className="achievement-notification-label">
          Conquista desbloqueada
        </span>

        <strong>
          {achievement.title}
        </strong>

        <p>
          {achievement.description}
        </p>
      </div>

      <button
        type="button"
        className="achievement-notification-close"
        aria-label="Fechar notificação"
        onClick={
          dismissNotification
        }
      >
        ×
      </button>
    </aside>
  );
}