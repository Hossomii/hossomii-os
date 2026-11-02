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

      const achievementId =
        pastingAchievementId;

      const motionQuery =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );

      let active = true;
      const context = gsap.context(() => {});
      let timeline: gsap.core.Timeline | undefined = undefined;

      function settlePaste(completed: boolean) {
        if (!active) {
          return;
        }

        active = false;

        setPastingAchievementId(
          (currentId) =>
            currentId === achievementId
              ? null
              : currentId,
        );

        const displayedPage =
          Math.min(
            useAchievementAlbumStore.getState().currentPage,
            maxPageIndex,
          );

        if (
          completed &&
          getAchievementAlbumPage(achievementId) === displayedPage
        ) {
          setSelectedAchievementId(
            achievementId,
          );
        }
      }

      function handleMotionChange() {
        if (
          active &&
          motionQuery.matches
        ) {
          timeline?.progress(
            1,
            false,
          );
        }
      }

      function cleanup() {
        active = false;
        motionQuery.removeEventListener(
          "change",
          handleMotionChange,
        );
        timeline?.revert();
        context.revert();
      }

      const adheredSticker =
        album?.querySelector<HTMLImageElement>(
          `[data-adhered-sticker-id="${pastingAchievementId}"]`,
        );

      const looseSticker =
        album?.querySelector<HTMLImageElement>(
          `[data-loose-sticker-id="${pastingAchievementId}"]`,
        );

      const pressureLine =
        album?.querySelector<HTMLElement>(
          `[data-pressure-line-id="${pastingAchievementId}"]`,
        );

      if (
        getAchievementAlbumPage(achievementId) !== safeCurrentPage ||
        !album ||
        !adheredSticker ||
        !looseSticker ||
        !pressureLine
      ) {
        // O cleanup também invalida esta finalização caso haja unmount.
        queueMicrotask(() => {
          settlePaste(false);
        });

        return cleanup;
      }

      gsap.killTweensOf(
        [
          adheredSticker,
          looseSticker,
          pressureLine,
        ],
      );

      const pasteVisual = {
        front: 0.55,
        tilt: 32,
      };

      /*
       * As duas máscaras compartilham a mesma diagonal.
       * A faixa aderida avança 0,4% sob a camada solta
       * para esconder a antialiasing da junção.
       */
      function renderPaste() {
        if (!active) {
          return;
        }

        const { front, tilt } =
          pasteVisual;

        const adheredFront =
          Math.min(2, front + 0.004);

        const adheredEdge =
          Math.min(1, adheredFront) * 100;

        const adheredTail =
          Math.max(0, adheredFront - 1) * 100;

        const looseEdge =
          Math.min(1, front) * 100;

        const looseTail =
          Math.max(0, front - 1) * 100;

        const lift =
          tilt / 32;

        adheredSticker!.style.clipPath =
          front < 2
            ? `polygon(0% 0%, ${adheredEdge}% 0%, ${adheredEdge}% ${adheredTail}%, ${adheredTail}% ${adheredEdge}%, 0% ${adheredEdge}%)`
            : "";

        looseSticker!.style.clipPath =
          `polygon(${looseEdge}% ${looseTail}%, 100% ${looseTail}%, 100% 100%, ${looseTail}% 100%, ${looseTail}% ${looseEdge}%)`;

        /*
         * O eixo segue a diagonal do espaço 4:5.
         * A junção fica no papel; a profundidade nasce
         * da inclinação e diminui com a área solta.
         */
        looseSticker!.style.setProperty(
          "--sticker-hinge",
          `${front * 50}%`,
        );

        looseSticker!.style.setProperty(
          "--sticker-tilt",
          `${tilt}deg`,
        );

        looseSticker!.style.filter =
          `drop-shadow(${6 * lift}px ${2 + 8 * lift}px ${2 + 6 * lift}px rgba(0, 0, 0, ${0.15 + 0.15 * lift}))`;

        looseSticker!.style.visibility =
          front < 2
            ? "visible"
            : "hidden";

        pressureLine!.style.clipPath =
          looseSticker!.style.clipPath;

        pressureLine!.style.setProperty(
          "--sticker-hinge",
          `${front * 50}%`,
        );

        pressureLine!.style.setProperty(
          "--sticker-tilt",
          `${tilt}deg`,
        );

        pressureLine!.style.setProperty(
          "--adhesion-front",
          `${front * 50}%`,
        );

        pressureLine!.style.setProperty(
          "--crease-width",
          `${2 + tilt * 0.2}%`,
        );

        pressureLine!.style.opacity =
          String(
            Math.min(1, (2 - front) * 2) * 0.76,
          );
      }

      /*
       * Registrar as propriedades também no contexto
       * mantém a restauração segura ao cancelar.
       */
      context.add(() => {
        gsap.set(
          adheredSticker,
          {
            clipPath:
              "none",
          },
        );

        gsap.set(
          looseSticker,
          {
            clipPath:
              "none",

            "--sticker-hinge":
              "0%",

            "--sticker-tilt":
              "0deg",

            filter:
              "none",

            visibility:
              "visible",
          },
        );

        gsap.set(
          pressureLine,
          {
            clipPath:
              "none",

            "--sticker-hinge":
              "0%",

            "--sticker-tilt":
              "0deg",

            "--adhesion-front":
              "0%",

            "--crease-width":
              "2%",

            opacity:
              0,
          },
        );
      });

      renderPaste();

      timeline =
        gsap.timeline({
          onUpdate:
            renderPaste,

          onComplete:
            () => {
              settlePaste(
                true,
              );
            },
        });

      /*
       * Início (0–0,5s): 15–25% aderido.
       * A maior parte ainda está elevada.
       */
      timeline.to(
        pasteVisual,
        {
          front:
            0.7,

          tilt:
            27,

          duration:
            0.5,

          ease:
            "power1.inOut",
        },
      );

      /*
       * Meio (0,5–1,8s): a pressão passa pelo
       * centro (62% em 1,25s), deixando apenas
       * o canto inferior direito levantado.
       */
      timeline.to(
        pasteVisual,
        {
          front:
            1.13,

          tilt:
            19,

          duration:
            0.75,

          ease:
            "none",
        },
      );

      timeline.to(
        pasteVisual,
        {
          front:
            1.55,

          tilt:
            8,

          duration:
            0.55,

          ease:
            "none",
        },
      );

      /*
       * Fim (1,8–2,4s): o último canto baixa,
       * seguido de uma compressão mínima, sem rebote.
       */
      timeline.to(
        pasteVisual,
        {
          front:
            2,

          tilt:
            0,

          duration:
            0.36,

          ease:
            "power1.out",
        },
      );

      timeline.to(
        adheredSticker,
        {
          transformOrigin:
            "75% 75%",

          scaleX:
            1.0015,

          scaleY:
            0.9985,

          duration:
            0.08,

          ease:
            "power1.inOut",
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
            "power1.inOut",

          clearProps:
            "transform,transformOrigin,filter,clipPath",
        },
      );

      motionQuery.addEventListener(
        "change",
        handleMotionChange,
      );

      // A preferência pode ter mudado entre o clique e este efeito.
      handleMotionChange();

      return cleanup;
    },
    [
      pastingAchievementId,
      safeCurrentPage,
      maxPageIndex,
    ],
  );

  function handleStickerClick(
    achievement:
      AchievementDefinition,
  ) {
    if (
      pastingAchievementId
    ) {
      return;
    }

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
      !unlocked
    ) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const pastedNow =
      pasteAchievementSticker(
        achievement.id,
      );

    if (
      !pastedNow
    ) {
      return;
    }

    if (
      prefersReducedMotion
    ) {
      setSelectedAchievementId(
        achievement.id,
      );
    } else {
      setPastingAchievementId(
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
                      !unlocked ||
                      Boolean(pastingAchievementId)
                    }
                    aria-busy={
                      isPasting
                    }
                    aria-label={
                      isPasting
                        ? `Colando figurinha ${achievement.title}`
                        : !unlocked
                          ? "Figurinha ainda não desbloqueada"
                          : pastingAchievementId
                            ? `Figurinha ${achievement.title}: aguarde a colagem em andamento`
                            : pasted
                              ? `Ver figurinha ${achievement.title}`
                              : `Colar figurinha ${achievement.title}`
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
                            style={
                              maskStyle
                            }
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