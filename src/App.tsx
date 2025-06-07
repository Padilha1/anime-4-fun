import AnimeOfTheDay from "./components/AnimeOfTheDay";
import Divider from "./components/Divider";
import GenreAnimeSection from "./components/GenreAnimeSection";
import Hero from "./components/Hero";
import RecommendationAnime from "./components/Recommendation_anime";
import SeasonAnimes from "./components/Season_animes";
import TopVsPopular from "./components/TopVsPopular";

function App() {
  return (
    <div className="bg-background flex flex-col items-center">
      <Hero />
      <Divider />
      <AnimeOfTheDay />
      <Divider />
      <SeasonAnimes />
      <Divider />
      <RecommendationAnime />
      <Divider />
      <TopVsPopular />
      <Divider />
      <GenreAnimeSection />
    </div>
  );
}

export default App;
