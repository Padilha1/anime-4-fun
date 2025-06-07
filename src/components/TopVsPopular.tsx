import { useState } from "react";
import TopAnimeCarousel from "./TopAnimeCarousel";

export default function TopVsPopular() {
  const [tab, setTab] = useState<"top" | "popular">("top");

  return (
    <section className="p-2">
      <h2 className="text-5xl font-anime text-center mb-6">explore rankings</h2>

      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        <button
          onClick={() => setTab("top")}
          className={`px-6 py-2 text-sm sm:text-base rounded-full border transition ${
            tab === "top"
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/70"
          }`}
        >
          Top
        </button>
        <button
          onClick={() => setTab("popular")}
          className={`px-6 py-2 text-sm sm:text-base rounded-full border transition ${
            tab === "popular"
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/70"
          }`}
        >
          Popular
        </button>
      </div>

      <div className="space-y-12">
        {tab === "top" ? (
          <>
            <TopAnimeCarousel
              title="🔥 Top 10 Overall"
              endpoint="/top/anime"
              params="limit=10"
            />
            <TopAnimeCarousel
              title="🎬 Top Airing Now"
              endpoint="/top/anime"
              params="filter=airing&limit=10"
            />
            <TopAnimeCarousel
              title="🎥 Top Movies"
              endpoint="/top/anime"
              params="type=movie&limit=10"
            />
          </>
        ) : (
          <>
            <TopAnimeCarousel
              title="🔥 Most Popular"
              endpoint="/top/anime"
              params="filter=bypopularity&limit=10"
            />
            <TopAnimeCarousel
              title="🎥 Popular Movies"
              endpoint="/top/anime"
              params="filter=bypopularity&type=movie&limit=10"
            />
            <TopAnimeCarousel
              title="📺 Popular TV Series"
              endpoint="/top/anime"
              params="filter=bypopularity&type=tv&limit=10"
            />
          </>
        )}
      </div>
    </section>
  );
}
