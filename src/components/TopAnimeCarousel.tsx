import { useEffect, useState } from "react";
import { get } from "../util/api";
import type { Anime, PaginatedResponse } from "../types/jikan-api";
import AnimeCard from "./AnimeCard";
import { Loader } from "lucide-react";

interface Props {
  title: string;
  endpoint: string;
  params?: string;
}

export default function TopAnimeCarousel({ title, endpoint, params }: Props) {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(endpoint, params)
      .then((res) => {
        if (res.status === 200) {
          const paginated = res.data as PaginatedResponse<Anime>;
          setAnimes(paginated.data);
        }
      })
      .finally(() => setLoading(false));
  }, [endpoint, params]);

  return (
    <section className="max-w-sm md:max-w-7xl mx-auto">
      <h3 className="text-lg sm:text-2xl font-semibold mb-3">{title}</h3>

      {loading ? (
        <div className="text-accent flex items-center justify-center">
          <Loader className="animate-spin h-4 w-4" />
        </div>
      ) : (
        <div className="overflow-x-scroll scrollbar-hide">
          <div className="flex gap-4">
            {animes.map((anime, idx) => (
              <div key={anime.mal_id + idx}>
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
