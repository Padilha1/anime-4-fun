/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Anime {
  mal_id: number;
  url: string;
  images: Record<string, any>;
  trailer: Record<string, any>;
  approved: boolean;
  titles: Array<{ type: string; title: string }>;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Record<string, any>;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Record<string, any>;
  producers: Array<{ name: string; url: string }>;
  licensors: Array<{ name: string; url: string }>;
  studios: Array<{ name: string; url: string }>;
  genres: Array<{ name: string; url: string }>;
  explicit_genres: Array<{ name: string; url: string }>;
  themes: Array<{ name: string; url: string }>;
  demographics: Array<{ name: string; url: string }>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: Record<string, any>;
  };
}

export interface Recommendation {
  mal_id: string;
  content: string;
  entry: Array<{
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }>;
}
