import { useEffect, useState } from "react";
import TopAnimeCarousel from "./TopAnimeCarousel";

const TOP_CAROUSELS = [
  { title: "🔥 Top 10 Overall", params: "limit=10" },
  { title: "🎬 Top Airing Now", params: "filter=airing&limit=10" },
  { title: "🎥 Top Movies", params: "type=movie&limit=10" },
];

const POPULAR_CAROUSELS = [
  { title: "🔥 Most Popular", params: "filter=bypopularity&limit=10" },
  {
    title: "🎥 Popular Movies",
    params: "filter=bypopularity&type=movie&limit=10",
  },
  {
    title: "📺 Popular TV Series",
    params: "filter=bypopularity&type=tv&limit=10",
  },
];

export default function TopVsPopular() {
  const [tab, setTab] = useState<"top" | "popular">("top");
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    setVisibleCount(1);

    const interval = setInterval(() => {
      const limit =
        tab === "top" ? TOP_CAROUSELS.length : POPULAR_CAROUSELS.length;

      setVisibleCount((prev) => {
        if (prev < limit) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tab]);

  const carousels = tab === "top" ? TOP_CAROUSELS : POPULAR_CAROUSELS;

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
        {carousels.slice(0, visibleCount).map((carousel, idx) => (
          <TopAnimeCarousel
            key={idx}
            title={carousel.title}
            endpoint="/top/anime"
            params={carousel.params}
          />
        ))}
      </div>
    </section>
  );
}
