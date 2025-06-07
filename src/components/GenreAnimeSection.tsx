import { useState, useEffect } from "react";
import { get } from "../util/api";
import type { Anime, PaginatedResponse } from "../types/jikan-api";
import AnimeCard from "./AnimeCard";
import GenreSelector from "./GenreSelector";
import { Loader } from "lucide-react";

export default function GenreAnimeSection() {
  const [selectedGenre, setSelectedGenre] = useState(1);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    get(
      "/anime",
      `genres=${selectedGenre}&limit=10&type=tv&order_by=score&sort=desc`
    )
      .then((res) => {
        if (res.status === 200) {
          const paginated = res.data as PaginatedResponse<Anime>;
          setAnimes(paginated.data);
        }
      })
      .finally(() => setLoading(false));
  }, [selectedGenre]);
  return (
    <section className="max-w-5xl py-16">
      <h2 className="text-5xl font-anime text-center mb-6">explore by Genre</h2>

      <GenreSelector selected={selectedGenre} onSelect={setSelectedGenre} />

      {loading ? (
        <div className="text-accent flex items-center justify-center ">
          <Loader className="animate-spin h-4 w-4" />
        </div>
      ) : (
        <div className="max-w-sm mx-auto md:max-w-5xl overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            {animes.map((anime) => (
              <div key={anime.mal_id} className="min-w-52 snap-start">
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
