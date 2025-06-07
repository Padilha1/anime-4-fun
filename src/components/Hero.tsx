function Hero() {
  return (
    <header className="text-center py-20">
      <h2 className="text-2xl md:text-4xl mb-4">Just another</h2>
      <h1 className="text-3xl md:text-5xl text-primary font-semibold">
        Anime Recommendation Website
      </h1>
      <p className="mt-6 text-muted-foreground text-md md:text-lg max-w-xl mx-auto">
        Discover top anime, hidden gems and perfect recommendations updated
        daily - powered by{" "}
        <a
          href="https://jikan.moe/"
          target="_blank"
          className="underline underline-offset-4 hover:text-foreground/30 duration-300"
        >
          Jikan API
        </a>
        .
      </p>
    </header>
  );
}

export default Hero;
