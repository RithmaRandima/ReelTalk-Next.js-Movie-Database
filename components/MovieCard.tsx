import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

type MediaType = "movies" | "tv_shows";

type MovieItem = {
  id: number;
  name?: string;
  original_name?: string;
  original_title?: string;
  first_air_date?: string;
  release_date?: string;
  vote_average?: number;
  poster_path?: string;
  original_language?: string;
  media_type?: "movie" | "tv";
};

type MovieCardProps = {
  item: MovieItem;
  type: MediaType;
  category: string;
};

const MovieCard = ({ item, type, category }: MovieCardProps) => {
  const title = item.name || item.original_name || item.original_title;
  const date = item.first_air_date || item.release_date || "—";
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";

  return (
    <Link
      href={`/${type}/${category}/${item.id}`}
      className="relative w-full h-[370px] overflow-hidden rounded-2xl shadow-md group bg-black/10"
    >
      {/* IMAGE */}
      <Image
        className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={"image"}
        width={500}
        height={750}
        priority
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10 space-y-2">
        {/* TITLE */}
        <h3 className="text-[18px] font-bold leading-tight line-clamp-2">
          {title}
        </h3>

        {/* META INFO */}
        <div className="flex items-center flex-wrap gap-2 text-[12px] text-gray-300">
          <span>{date}</span>
          <span className="opacity-60">•</span>
          <span className="uppercase">{item.original_language}</span>
        </div>

        {/* medis type */}
        <p className="capitalize absolute bottom-0 right-5 text-[20px] font-extrabold text-white/30">
          {item.media_type || "movie"}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-1 text-cyan-300 text-[17px] font-medium">
          <span>
            <FaStar />
          </span>
          <span>{rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
