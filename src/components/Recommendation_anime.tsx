import { useFetchOnceADay } from "../hooks/useFetchOnceADay";
import { useState } from "react";
import { type Recommendation } from "../types/jikan-api";
import { Loader } from "lucide-react";

function RecommendationAnime() {
  const { data, loading, error } = useFetchOnceADay<Recommendation[]>(
    "/recommendations/anime"
  );

  const [page] = useState(0);
  const pageSize = 3;

  if (loading)
    return (
      <div className=" flex items-center justify-center py-10 text-accent">
        <Loader className="animate-spin h-4 w-4" />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading recommendations
      </div>
    );
  if (!data || data.length === 0)
    return <div className="text-center py-10">No recommendation found.</div>;

  const start = page * pageSize;
  const end = start + pageSize;
  const currentPageData = data.slice(start, end);

  return (
    <div className="p-4">
      <h2 className="text-5xl font-anime mb-10 text-center tracking-wide">
        Today&apos;s recommendation
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {currentPageData.map((rec, idx) => (
          <div
            key={rec.mal_id + idx}
            className="bg-muted rounded-2xl p-5 shadow-lg flex flex-col justify-between h-full border border-border"
          >
            <p className="text-foreground font-medium mb-4 text-base leading-relaxed">
              <span className="text-lg font-black text-primary mr-1">
                {idx + 1}.
              </span>
              {rec.content}
            </p>

            <div className="flex gap-4 mt-auto">
              {rec.entry.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="w-24 mx-auto flex-shrink-0 text-center"
                >
                  <div className="rounded-md overflow-hidden shadow transition-transform hover:scale-105">
                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      className="w-full h-36 object-cover"
                    />
                  </div>
                  <p className="text-xs mt-1 font-semibold text-foreground line-clamp-3">
                    {anime.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-primary text-foreground rounded-md hover:bg-primary/80 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-primary text-foreground rounded-md hover:bg-primary/80 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="text-center mt-4 text-sm text-muted-foreground">
        Page {page + 1} of {totalPages}
      </div> */}
    </div>
  );
}

export default RecommendationAnime;
