import { Loader } from "lucide-react";
import { useFetchOnceADay } from "../hooks/useFetchOnceADay";
import type { Anime } from "../types/jikan-api";
import AnimeCard from "./AnimeCard";

function SeasonAnimes() {
  const { data, loading, error } = useFetchOnceADay<Anime[]>("/seasons/now");
  if (loading)
    return (
      <div className="text-accent flex items-center justify-center">
        <Loader className="animate-spin h-4 w-4" />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading seasonal animes
      </div>
    );
  if (!data || data.length === 0)
    return <div className="text-center py-10">No animes found.</div>;
  const top6 = data
    .filter(
      (anime) =>
        typeof anime.score === "number" && anime.status === "Currently Airing"
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return (
    <section className="px-4">
      <h2 className="text-5xl font-anime text-center mb-4">
        Top 6 seasonal Anime
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6 max-w-5xl mx-auto">
        {top6.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </section>
  );
}

export default SeasonAnimes;
