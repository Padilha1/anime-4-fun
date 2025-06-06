import { useFetchOnceADay } from "../hooks/useFetchOnceADay";
import type { Anime } from "../types/jikan-api";

function SeasonAnimes() {
  const { data, loading, error } = useFetchOnceADay<Anime[]>("/seasons/now");
  if (loading) return <p className="text-center">Carregando...</p>;
  if (error)
    return <p className="text-center text-red-500">Erro ao carregar dados</p>;
  if (!data || data.length === 0)
    return <p className="text-center">Nada encontrado.</p>;
  const top6 = data
    .filter(
      (anime) =>
        typeof anime.score === "number" && anime.status === "Currently Airing"
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return (
    <div>
      <h2 className="text-5xl font-anime text-center">Top 6 seasonal Anime</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6 max-w-5xl mx-auto">
        {top6.map((anime) => (
          <div
            key={anime.mal_id}
            className="bg-card p-4 rounded shadow h-full flex flex-col justify-between"
          >
            <img
              src={anime.images?.jpg?.image_url}
              alt={anime.title}
              className="w-full h-auto rounded mb-2"
            />
            <h2 className="text-lg font-semibold italic">
              {anime.title_english}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {anime.synopsis}
            </p>
            <p className="text-sm mt-2">
              Score: <b>{anime.score}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeasonAnimes;
