import { useFetchOnceADay } from "../hooks/useFetchOnceADay";
import { useState } from "react";
import { type Recommendation } from "../types/jikan-api";

function RecommendationAnime() {
  const { data, loading, error } = useFetchOnceADay<Recommendation[]>(
    "/recommendations/anime"
  );

  const [page, setPage] = useState(0);
  const pageSize = 3;

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading recommendations
      </div>
    );
  if (!data || data.length === 0)
    return <div className="text-center py-10">No recommendation found.</div>;

  const totalPages = Math.ceil(data.length / pageSize);
  const start = page * pageSize;
  const end = start + pageSize;
  const currentPageData = data.slice(start, end);

  return (
    <div className="p-4">
      <h2 className="text-5xl font-anime mb-4 text-center">
        Today's recommendation
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
        {currentPageData.map((rec, idx) => (
          <div
            key={rec.mal_id + idx}
            className="bg-card rounded shadow p-4 h-full flex flex-col justify-between"
          >
            <p className="text-muted-foreground font-semibold mb-2">
              <b>{idx + 1}.</b> {rec.content}
            </p>
            <div className="flex gap-4 overflow-x-auto">
              {rec.entry.map((anime) => (
                <div key={anime.mal_id} className="min-w-[100px] ">
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-full h-auto rounded"
                  />
                  <p className="text-sm mt-1 text-center font-bold">
                    {anime.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-muted text-muted-foreground rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-muted text-muted-foreground rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="text-center mt-4 text-sm text-muted-foreground">
        Page {page + 1} of {totalPages}
      </div>
    </div>
  );
}

export default RecommendationAnime;
