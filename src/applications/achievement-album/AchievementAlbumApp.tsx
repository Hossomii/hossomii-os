import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import {
  gsap,
} from "gsap";

import {
  ACHIEVEMENT_LIST,
} from "../../system/achievements/achievementRegistry";

import {
  ACHIEVEMENT_STICKERS_PER_PAGE,
  getAchievementAlbumPage,
  pasteAchievementSticker,
} from "../../system/achievements/achievementAlbumService";

import {
  useAchievementStore,
} from "../../stores/achievementStore";

import {
  useAchievementAlbumStore,
} from "../../stores/achievementAlbumStore";

import type {
  AchievementDefinition,
  AchievementId,
} from "../../system/achievements/types";

import "./AchievementAlbumApp.css";

type StickerMaskStyle =
  CSSProperties & {
    "--sticker-mask":
      string;
  };

const ACHIEVEMENT_PAGES =
  Array.from(
    {
      length:
        Math.ceil(
          ACHIEVEMENT_LIST.length /
            ACHIEVEMENT_STICKERS_PER_PAGE,
        ),
    },

    (
      _,
      pageIndex,
    ) => {
      const startIndex =
        pageIndex *
        ACHIEVEMENT_STICKERS_PER_PAGE;

      return ACHIEVEMENT_LIST.slice(
        startIndex,
        startIndex +
          ACHIEVEMENT_STICKERS_PER_PAGE,
      );
    },
  );

function getRarityLabel(
  rarity:
    AchievementDefinition["rarity"],
) {
  switch (
    rarity
  ) {
    case "common":
      return "Comum";

    case "uncommon":
      return "Incomum";

    case "rare":
      return "Rara";

    case "special":
      return "Especial";

    case "secret":
      return "Secreta";
  }
}

function formatDate(
  value:
    | string
    | undefined,
) {
  if (!value) {
    return "Não registrada";
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day:
        "2-digit",

      month:
        "2-digit",

      year:
        "numeric",
    },
  ).format(
    new Date(
      value,
    ),
  );
}

export function AchievementAlbumApp() {
  const albumRef =
    useRef<HTMLDivElement>(
      null,
    );

  const unlockedAchievements =
    useAchievementStore(
      (
        state,
      ) =>
        state.unlockedAchievements,
    );

  const unlockedAtById =
    useAchievementStore(
      (
        state,
      ) =>
        state.unlockedAtById,
    );

  const pastedAchievements =
    useAchievementAlbumStore(
      (
        state,
      ) =>
        state.pastedAchievements,
    );

  const pastedAtById =
    useAchievementAlbumStore(
      (
        state,
      ) =>
        state.pastedAtById,
    );

  const currentPage =
    useAchievementAlbumStore(
      (
        state,
      ) =>
        state.currentPage,
    );

  const setCurrentPage =
    useAchievementAlbumStore(
      (
        state,
      ) =>
        state.setCurrentPage,
    );

  const [
    selectedAchievementId,
    setSelectedAchievementId,
  ] =
    useState<
      | AchievementId
      | null
    >(
      null,
    );

  const [
    pastingAchievementId,
    setPastingAchievementId,
  ] =
    useState<
      | AchievementId
      | null
    >(
      null,
    );

  const maxPageIndex =
    Math.max(
      0,
      ACHIEVEMENT_PAGES.length -
        1,
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      maxPageIndex,
    );

  const currentAchievements =
    ACHIEVEMENT_PAGES[
      safeCurrentPage
    ] ??
    [];

  const selectedAchievement =
    selectedAchievementId &&
    getAchievementAlbumPage(
      selectedAchievementId,
    ) ===
      safeCurrentPage
      ? ACHIEVEMENT_LIST.find(
          (
            achievement,
          ) =>
            achievement.id ===
            selectedAchievementId,
        ) ??
        null
      : null;

  const selectedIsPasted =
    selectedAchievement
      ? pastedAchievements.includes(
          selectedAchievement.id,
        )
      : false;

  const availableCount =
    unlockedAchievements.filter(
      (
        achievementId,
      ) =>
        !pastedAchievements.includes(
          achievementId,
        ),
    ).length;

  useLayoutEffect(
    () => {
      if (
        !pastingAchievementId
      ) {
        return;
      }

      const album =
        albumRef.current;

      if (!album) {
        return;
      }

      const adheredSticker =
        album.querySelector<HTMLImageElement>(
          `[data-adhered-sticker-id="${pastingAchievementId}"]`,
        );

      const looseSticker =
        album.querySelector<HTMLImageElement>(
          `[data-loose-sticker-id="${pastingAchievementId}"]`,
        );

      const pressureLine =
        album.querySelector<HTMLElement>(
          `[data-pressure-line-id="${pastingAchievementId}"]`,
        );

      if (
        !adheredSticker ||
        !looseSticker ||
        !pressureLine
      ) {
        return;
      }

      const achievementId =
        pastingAchievementId;

      gsap.killTweensOf(
        [
          adheredSticker,
          looseSticker,
          pressureLine,
        ],
      );

      gsap.set(
        adheredSticker,
        {
          clipPath:
            "polygon(0% 0%, 0% 0%, 0% 0%)",

          filter:
            "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.08))",
        },
      );

      gsap.set(
        looseSticker,
        {
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

          transformOrigin:
            "0% 0%",

          rotationX:
            -9,

          rotationY:
            15,

          rotationZ:
            -1.8,

          x:
            -4,

          y:
            -5,

          z:
            22,

          scale:
            1.018,

          filter:
            "drop-shadow(10px 13px 9px rgba(0, 0, 0, 0.32))",
        },
      );

      gsap.set(
        pressureLine,
        {
          xPercent:
            -110,

          yPercent:
            -110,

          opacity:
            0,
        },
      );

      const timeline =
        gsap.timeline({
          onComplete:
            () => {
              setSelectedAchievementId(
                achievementId,
              );

              setPastingAchievementId(
                null,
              );
            },
        });

      /*
       * O canto superior esquerdo toca
       * primeiro no papel.
       */
      timeline.to(
        looseSticker,
        {
          rotationX:
            -6,

          rotationY:
            11,

          rotationZ:
            -1.2,

          x:
            -2,

          y:
            -2,

          z:
            16,

          duration:
            0.2,

          ease:
            "power2.out",
        },
      );

      timeline.to(
        pressureLine,
        {
          opacity:
            0.82,

          duration:
            0.08,
        },
        "<",
      );

      /*
       * Primeira metade da colagem.
       * A região aderida forma um
       * triângulo partindo do topo
       * esquerdo.
       */
      timeline.to(
        adheredSticker,
        {
          clipPath:
            "polygon(0% 0%, 76% 0%, 0% 76%)",

          duration:
            0.52,

          ease:
            "power1.inOut",
        },
      );

      timeline.to(
        looseSticker,
        {
          clipPath:
            "polygon(72% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 72%)",

          rotationX:
            -4.5,

          rotationY:
            7,

          rotationZ:
            -0.7,

          z:
            10,

          filter:
            "drop-shadow(7px 8px 6px rgba(0, 0, 0, 0.25))",

          duration:
            0.52,

          ease:
            "power1.inOut",
        },
        "<",
      );

      timeline.to(
        pressureLine,
        {
          xPercent:
            15,

          yPercent:
            15,

          duration:
            0.52,

          ease:
            "power1.inOut",
        },
        "<",
      );

      /*
       * A dobra restante avança até
       * o canto inferior direito.
       */
      timeline.to(
        adheredSticker,
        {
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

          duration:
            0.52,

          ease:
            "power1.inOut",
        },
      );

      timeline.to(
        looseSticker,
        {
          clipPath:
            "polygon(100% 100%, 100% 100%, 100% 100%)",

          rotationX:
            0,

          rotationY:
            0,

          rotationZ:
            0,

          x:
            0,

          y:
            0,

          z:
            0,

          filter:
            "drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.12))",

          duration:
            0.52,

          ease:
            "power1.inOut",
        },
        "<",
      );

      timeline.to(
        pressureLine,
        {
          xPercent:
            120,

          yPercent:
            120,

          duration:
            0.52,

          ease:
            "power1.inOut",
        },
        "<",
      );

      timeline.to(
        pressureLine,
        {
          opacity:
            0,

          duration:
            0.1,
        },
      );

      /*
       * Pequena pressão final contra
       * o papel.
       */
      timeline.to(
        adheredSticker,
        {
          scaleX:
            1.006,

          scaleY:
            0.986,

          duration:
            0.09,

          ease:
            "power2.in",
        },
      );

      timeline.to(
        adheredSticker,
        {
          scaleX:
            1,

          scaleY:
            1,

          duration:
            0.16,

          ease:
            "back.out(1.8)",

          clearProps:
            "transform,filter,clipPath",
        },
      );

      return () => {
        timeline.kill();
      };
    },
    [
      pastingAchievementId,
    ],
  );

  function handleStickerClick(
    achievement:
      AchievementDefinition,
  ) {
    const unlocked =
      unlockedAchievements.includes(
        achievement.id,
      );

    const pasted =
      pastedAchievements.includes(
        achievement.id,
      );

    if (
      pasted
    ) {
      setSelectedAchievementId(
        achievement.id,
      );

      return;
    }

    if (
      !unlocked ||
      pastingAchievementId
    ) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (
      !prefersReducedMotion
    ) {
      setPastingAchievementId(
        achievement.id,
      );
    }

    const pastedNow =
      pasteAchievementSticker(
        achievement.id,
      );

    if (
      !pastedNow
    ) {
      setPastingAchievementId(
        null,
      );

      return;
    }

    if (
      prefersReducedMotion
    ) {
      setSelectedAchievementId(
        achievement.id,
      );
    }
  }

  function handlePageChange(
    nextPage:
      number,
  ) {
    if (
      pastingAchievementId
    ) {
      return;
    }

    setSelectedAchievementId(
      null,
    );

    setCurrentPage(
      Math.min(
        maxPageIndex,
        Math.max(
          0,
          nextPage,
        ),
      ),
    );
  }

  return (
    <div
      ref={
        albumRef
      }
      className="achievement-album"
    >
      <div className="achievement-album-spread">
        <section className="achievement-album-details">
          {selectedAchievement &&
          selectedIsPasted ? (
            <>
              <div className="achievement-album-preview">
                <img
                  src={
                    selectedAchievement.stickerImage
                  }
                  alt={
                    selectedAchievement.title
                  }
                  draggable={
                    false
                  }
                />
              </div>

              <div className="achievement-album-details-content">
                <span className="achievement-album-number">
                  #
                  {String(
                    selectedAchievement.number,
                  ).padStart(
                    3,
                    "0",
                  )}
                </span>

                <h2>
                  {
                    selectedAchievement.title
                  }
                </h2>

                <span
                  className={[
                    "achievement-album-rarity",

                    `achievement-rarity-${selectedAchievement.rarity}`,
                  ].join(
                    " ",
                  )}
                >
                  {getRarityLabel(
                    selectedAchievement.rarity,
                  )}
                </span>

                <p className="achievement-album-description">
                  {
                    selectedAchievement.description
                  }
                </p>

                <dl className="achievement-album-metadata">
                  <div>
                    <dt>
                      Desbloqueada
                    </dt>

                    <dd>
                      {formatDate(
                        unlockedAtById[
                          selectedAchievement.id
                        ],
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt>
                      Colada
                    </dt>

                    <dd>
                      {formatDate(
                        pastedAtById[
                          selectedAchievement.id
                        ],
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </>
          ) : (
            <div className="achievement-album-empty-details">
              <span className="achievement-album-empty-eyebrow">
                HOSSOMII COLLECTION
              </span>

              <strong>
                Álbum de Conquistas
              </strong>

              <p>
                Selecione uma
                figurinha colada
                para visualizar
                seus detalhes.
              </p>
            </div>
          )}
        </section>

        <section className="achievement-album-book">
          <header className="achievement-album-page-header">
            <div>
              <span>
                HOSSOMII COLLECTION
              </span>

              <strong>
                Conquistas
              </strong>
            </div>

            <div className="achievement-album-page-status">
              {availableCount >
                0 && (
                <span className="achievement-album-available-count">
                  {
                    availableCount
                  }{" "}
                  {availableCount ===
                  1
                    ? "disponível"
                    : "disponíveis"}
                </span>
              )}

              <span className="achievement-album-page-counter">
                Página{" "}
                {safeCurrentPage +
                  1}{" "}
                de{" "}
                {
                  ACHIEVEMENT_PAGES.length
                }
              </span>
            </div>
          </header>

          <div className="achievement-album-slots">
            {currentAchievements.map(
              (
                achievement,
              ) => {
                const unlocked =
                  unlockedAchievements.includes(
                    achievement.id,
                  );

                const pasted =
                  pastedAchievements.includes(
                    achievement.id,
                  );

                const available =
                  unlocked &&
                  !pasted;

                const isPasting =
                  pastingAchievementId ===
                  achievement.id;

                const maskStyle:
                  StickerMaskStyle =
                    {
                      "--sticker-mask":
                        `url("${achievement.stickerImage}")`,
                    };

                return (
                  <button
                    key={
                      achievement.id
                    }
                    type="button"
                    className={[
                      "achievement-sticker-slot",

                      unlocked
                        ? "is-unlocked"
                        : "is-locked",

                      available
                        ? "is-available"
                        : "",

                      pasted
                        ? "is-pasted"
                        : "",

                      isPasting
                        ? "is-pasting"
                        : "",

                      `achievement-rarity-${achievement.rarity}`,
                    ]
                      .filter(
                        Boolean,
                      )
                      .join(
                        " ",
                      )}
                    onClick={() =>
                      handleStickerClick(
                        achievement,
                      )
                    }
                    aria-disabled={
                      !unlocked
                    }
                    aria-busy={
                      isPasting
                    }
                    aria-label={
                      pasted
                        ? `Ver figurinha ${achievement.title}`
                        : unlocked
                          ? `Colar figurinha ${achievement.title}`
                          : "Figurinha ainda não desbloqueada"
                    }
                  >
                    <div className="achievement-sticker-space">
                      {(
                        !pasted ||
                        isPasting
                      ) && (
                        <span
                          className="achievement-sticker-mask"
                          style={
                            maskStyle
                          }
                          aria-hidden="true"
                        />
                      )}

                      {pasted && (
                        <img
                          className="achievement-sticker-adhered"
                          src={
                            achievement.stickerImage
                          }
                          alt=""
                          data-adhered-sticker-id={
                            achievement.id
                          }
                          draggable={
                            false
                          }
                        />
                      )}

                      {isPasting && (
                        <>
                          <img
                            className="achievement-sticker-loose"
                            src={
                              achievement.stickerImage
                            }
                            alt=""
                            data-loose-sticker-id={
                              achievement.id
                            }
                            draggable={
                              false
                            }
                          />

                          <span
                            className="achievement-sticker-pressure-line"
                            data-pressure-line-id={
                              achievement.id
                            }
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </div>

                    <div className="achievement-sticker-slot-footer">
                      <span>
                        #
                        {String(
                          achievement.number,
                        ).padStart(
                          3,
                          "0",
                        )}
                      </span>

                      {available && (
                        <span className="achievement-sticker-available">
                          DISPONÍVEL
                        </span>
                      )}
                    </div>
                  </button>
                );
              },
            )}
          </div>

          <footer className="achievement-album-navigation">
            <button
              type="button"
              disabled={
                safeCurrentPage ===
                  0 ||
                Boolean(
                  pastingAchievementId,
                )
              }
              onClick={() =>
                handlePageChange(
                  safeCurrentPage -
                    1,
                )
              }
              aria-label="Página anterior"
            >
              ←
            </button>

            <span>
              {safeCurrentPage +
                1}{" "}
              /{" "}
              {
                ACHIEVEMENT_PAGES.length
              }
            </span>

            <button
              type="button"
              disabled={
                safeCurrentPage >=
                  maxPageIndex ||
                Boolean(
                  pastingAchievementId,
                )
              }
              onClick={() =>
                handlePageChange(
                  safeCurrentPage +
                    1,
                )
              }
              aria-label="Próxima página"
            >
              →
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}