import Image from "next/image";
import React from "react";

type Movie = {
  title?: string;
  overview?: string;
  backdrop_path?: string;
};

const HeroCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title || "movie"}
        fill
        className="object-cover object-top"
        priority
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 h-full flex flex-col justify-center px-10 text-white space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>

        <p className="text-lg text-gray-200 max-w-md line-clamp-2">
          {movie.overview}
        </p>

        <button className="w-fit px-6 py-2 bg-white text-black rounded-full font-semibold">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default HeroCard;
