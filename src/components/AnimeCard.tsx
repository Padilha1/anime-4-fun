import { type Anime } from "../types/jikan-api";
import { Star } from "lucide-react";

interface Props {
  anime: Anime;
}

export default function AnimeCard({ anime }: Props) {
  const cover = anime.images?.jpg?.image_url;
  const aired = anime.aired?.string ?? "";
  const isAiring = anime.status === "Currently Airing";

  return (
    <div className="bg-muted rounded-xl shadow-md relative hover:shadow-lg transition-shadow overflow-hidden border flex flex-col h-full border-border">
      <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
        {isAiring ? "Airing" : "Finished"}
      </div>
      <img
        src={cover}
        alt={anime.title}
        className="w-full h-[250px] object-cover rounded-t-xl"
      />
      <div className="flex flex-col justify-between flex-grow p-4">
        <div className="">
          <h2 className="text-lg font-bold leading-tight line-clamp-2 mb-1">
            {anime.title_english || anime.title}
          </h2>
          <p className="text-xs text-muted-foreground mb-2">
            {anime.season && anime.year
              ? `${anime.season} ${anime.year}`
              : aired}
            &nbsp;•&nbsp;
            {anime.episodes ? `${anime.episodes} ep` : "?"}
          </p>
        </div>
        <div className="flex items-center text-yellow-500 text-sm mb-1">
          <Star size={14} className="mr-1" />
          {anime.score?.toFixed(2)}
          <span className="text-xs text-muted-foreground ml-2">
            #{anime.rank} • {anime.scored_by?.toLocaleString()} votes
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {anime.genres.slice(0, 3).map((genre) => (
            <span
              key={genre.name}
              className="text-xs bg-accent px-2 py-1 rounded-full text-accent-foreground"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
