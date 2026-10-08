import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";

import {
  ACHIEVEMENTS,
  useAchievementStore,
} from "../../stores/achievementStore";

import {
  playSound,
} from "../../system/audio/audioService";

export function AchievementNotification() {
  const notificationRef = useRef<HTMLElement>(null);

  const isDismissing = useRef(false);

  const pendingNotifications = useAchievementStore(
    (state) => state.pendingNotifications,
  );

  const dismissNotification = useAchievementStore(
    (state) => state.dismissNotification,
  );

  const activeAchievementId = pendingNotifications[0];

  useEffect(() => {
    if (!activeAchievementId) {
      return;
    }

    void playSound("ui-notification");
  }, [activeAchievementId]);

  const dismissWithAnimation = useCallback(() => {
    if (isDismissing.current) {
      return;
    }

    const element = notificationRef.current;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!element || prefersReducedMotion) {
      dismissNotification();

      return;
    }

    isDismissing.current = true;

    gsap.killTweensOf(element);

    gsap.to(element, {
      opacity: 0,

      y: 10,

      scale: 0.985,

      duration: 0.16,

      ease: "power2.in",

      onComplete: () => {
        dismissNotification();

        isDismissing.current = false;
      },
    });
  }, [dismissNotification]);

  useLayoutEffect(() => {
    if (!activeAchievementId) {
      return;
    }

    const element = notificationRef.current;

    if (!element) {
      return;
    }

    isDismissing.current = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    gsap.killTweensOf(element);

    const animation = gsap.fromTo(
      element,
      {
        opacity: 0,

        y: 12,

        scale: 0.985,
      },
      {
        opacity: 1,

        y: 0,

        scale: 1,

        duration: 0.2,

        ease: "power2.out",

        clearProps: "transform,opacity",
      },
    );

    return () => {
      animation.kill();
    };
  }, [activeAchievementId]);

  useEffect(() => {
    if (!activeAchievementId) {
      return;
    }

    const timer = window.setTimeout(() => {
      dismissWithAnimation();
    }, 5500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeAchievementId, dismissWithAnimation]);

  if (!activeAchievementId) {
    return null;
  }

  const achievement = ACHIEVEMENTS[activeAchievementId];

  return (
    <aside
      ref={notificationRef}
      className="achievement-notification"
      role="status"
      aria-live="polite"
    >
      <div className="achievement-notification-icon" aria-hidden="true">
        ★
      </div>

      <div className="achievement-notification-content">
        <span className="achievement-notification-label">
          Conquista desbloqueada
        </span>

        <strong>{achievement.title}</strong>

        <p>{achievement.description}</p>
      </div>

      <button
        type="button"
        className="achievement-notification-close"
        aria-label="Fechar notificação"
        onClick={dismissWithAnimation}
      >
        ×
      </button>
    </aside>
  );
}
