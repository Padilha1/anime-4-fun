import Divider from "./components/Divider";
import Hero from "./components/Hero";
import RecommendationAnime from "./components/Recommendation_anime";
import SeasonAnimes from "./components/Season_animes";

function App() {
  return (
    <div className="bg-background flex flex-col items-center">
      <Hero />
      <Divider />
      <SeasonAnimes />
      <Divider />
      <RecommendationAnime />
    </div>
  );
}

export default App;
