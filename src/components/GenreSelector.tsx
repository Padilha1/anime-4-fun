const GENRES = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 4, name: "Comedy" },
  { id: 8, name: "Drama" },
  { id: 10, name: "Fantasy" },
  { id: 14, name: "Horror" },
  { id: 22, name: "Romance" },
  { id: 24, name: "Sci-Fi" },
  { id: 36, name: "Slice of Life" },
  { id: 37, name: "Supernatural" },
];

interface Props {
  selected: number;
  onSelect: (id: number) => void;
}

export default function GenreSelector({ selected, onSelect }: Props) {
  return (
    <div className="max-w-md md:max-w-5xl mx-auto flex flex-wrap justify-center gap-2 mb-6">
      {GENRES.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`px-3 py-1 text-sm rounded-full border ${
            selected === genre.id
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/70"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
