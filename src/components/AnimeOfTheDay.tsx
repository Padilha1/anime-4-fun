import { useAnimeOfTheDay } from "../hooks/useAnimeOfTheDay";
import AnimeCard from "./AnimeCard";

export default function AnimeOfTheDay() {
  const { anime, loading } = useAnimeOfTheDay();

  return (
    <section className="max-w-4xl mx-auto py-10 px-4 text-center">
      <h2 className="text-5xl font-anime mb-8 tracking-tight">
        Anime of the day
      </h2>

      {loading ? (
        <p className=" text-muted-foreground">Loading...</p>
      ) : anime ? (
        <div className="max-w-sm mx-auto">
          <AnimeCard anime={anime} />
        </div>
      ) : (
        <p className=" text-red-500">Failed to load the anime of the day.</p>
      )}
    </section>
  );
}
