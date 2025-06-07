import { useEffect, useState } from "react";
import { get } from "../util/api";
import type { Anime } from "../types/jikan-api";

export function useAnimeOfTheDay() {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("anime-of-the-day");
    const today = new Date().toISOString().split("T")[0];

    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) {
        setAnime(parsed.anime);
        setLoading(false);
        return;
      }
    }

    // Usando sua função GET
    get("/random/anime")
      .then((res) => {
        if (res.status === 200) {
          const randomAnime = res.data.data;
          setAnime(randomAnime);
          localStorage.setItem(
            "anime-of-the-day",
            JSON.stringify({ date: today, anime: randomAnime })
          );
        } else {
          console.warn("Anime não modificado ou erro ao buscar.");
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar anime aleatório", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { anime, loading };
}
