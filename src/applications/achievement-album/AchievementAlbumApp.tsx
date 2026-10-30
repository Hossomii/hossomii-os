import { useMemo, useState, type CSSProperties } from "react";

import { ACHIEVEMENT_LIST } from "../../system/achievements/achievementRegistry";

import { useAchievementStore } from "../../stores/achievementStore";

import { useAchievementAlbumStore } from "../../stores/achievementAlbumStore";

import type { AchievementDefinition } from "../../system/achievements/types";

import "./AchievementAlbumApp.css";

const STICKERS_PER_PAGE = 3;

type StickerMaskStyle = CSSProperties & {
  "--sticker-mask": string;
};

function getRarityLabel(rarity: AchievementDefinition["rarity"]) {
  switch (rarity) {
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

export function AchievementAlbumApp() {
  const unlockedAchievements = useAchievementStore(
    (state) => state.unlockedAchievements,
  );

  const unlockedAtById = useAchievementStore((state) => state.unlockedAtById);

  const pastedAchievements = useAchievementAlbumStore(
    (state) => state.pastedAchievements,
  );

  const [currentPage, setCurrentPage] = useState(0);

  const [selectedAchievementId, setSelectedAchievementId] = useState<
    AchievementDefinition["id"] | null
  >(null);

  const pages = useMemo(() => {
    const result: AchievementDefinition[][] = [];

    for (
      let index = 0;
      index < ACHIEVEMENT_LIST.length;
      index += STICKERS_PER_PAGE
    ) {
      result.push(ACHIEVEMENT_LIST.slice(index, index + STICKERS_PER_PAGE));
    }

    return result;
  }, []);

  const currentAchievements = pages[currentPage] ?? [];

  const selectedAchievement = selectedAchievementId
    ? (ACHIEVEMENT_LIST.find(
        (achievement) => achievement.id === selectedAchievementId,
      ) ?? null)
    : null;

  const selectedIsPasted = selectedAchievement
    ? pastedAchievements.includes(selectedAchievement.id)
    : false;

  function formatDate(value: string | undefined) {
    if (!value) {
      return "Não registrada";
    }

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",

      month: "2-digit",

      year: "numeric",
    }).format(new Date(value));
  }

  return (
    <div className="achievement-album">
      <section className="achievement-album-details">
        {selectedAchievement && selectedIsPasted ? (
          <>
            <div className="achievement-album-preview">
              <img
                src={selectedAchievement.stickerImage}
                alt={selectedAchievement.title}
              />
            </div>

            <span className="achievement-album-number">
              #{String(selectedAchievement.number).padStart(3, "0")}
            </span>

            <h2>{selectedAchievement.title}</h2>

            <span
              className={`achievement-album-rarity achievement-album-rarity-${selectedAchievement.rarity}`}
            >
              {getRarityLabel(selectedAchievement.rarity)}
            </span>

            <p>{selectedAchievement.description}</p>

            <dl className="achievement-album-metadata">
              <div>
                <dt>Desbloqueada</dt>

                <dd>{formatDate(unlockedAtById[selectedAchievement.id])}</dd>
              </div>
            </dl>
          </>
        ) : (
          <div className="achievement-album-empty-details">
            <strong>Álbum de Conquistas</strong>

            <p>Selecione uma figurinha colada para visualizar seus detalhes.</p>
          </div>
        )}
      </section>

      <section className="achievement-album-book">
        <header className="achievement-album-page-header">
          <div>
            <span>HOSSOMII COLLECTION</span>

            <strong>Conquistas</strong>
          </div>

          <span>
            Página {currentPage + 1} de {pages.length}
          </span>
        </header>

        <div className="achievement-album-slots">
          {currentAchievements.map((achievement) => {
            const unlocked = unlockedAchievements.includes(achievement.id);

            const pasted = pastedAchievements.includes(achievement.id);

            const maskStyle: StickerMaskStyle = {
              "--sticker-mask": `url("${achievement.stickerImage}")`,
            };

            return (
              <button
                key={achievement.id}
                type="button"
                className={[
                  "achievement-sticker-slot",

                  unlocked ? "is-unlocked" : "is-locked",

                  pasted ? "is-pasted" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  if (pasted) {
                    setSelectedAchievementId(achievement.id);
                  }
                }}
                aria-label={
                  pasted
                    ? `Ver figurinha ${achievement.title}`
                    : unlocked
                      ? "Figurinha disponível para colar"
                      : "Figurinha ainda não desbloqueada"
                }
              >
                <div className="achievement-sticker-space">
                  {pasted ? (
                    <img src={achievement.stickerImage} alt="" />
                  ) : (
                    <span
                      className="achievement-sticker-mask"
                      style={maskStyle}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="achievement-sticker-slot-footer">
                  <span>#{String(achievement.number).padStart(3, "0")}</span>

                  {unlocked && !pasted && (
                    <span className="achievement-sticker-available">
                      DISPONÍVEL
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <footer className="achievement-album-navigation">
          <button
            type="button"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
            aria-label="Página anterior"
          >
            ←
          </button>

          <span>
            {currentPage + 1} / {pages.length}
          </span>

          <button
            type="button"
            disabled={currentPage >= pages.length - 1}
            onClick={() =>
              setCurrentPage((page) => Math.min(pages.length - 1, page + 1))
            }
            aria-label="Próxima página"
          >
            →
          </button>
        </footer>
      </section>
    </div>
  );
}
