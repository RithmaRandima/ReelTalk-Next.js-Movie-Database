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
  const title =
    item.name || item.original_name || item.original_title || "Untitled";

  const date = item.first_air_date || item.release_date || "—";

  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";

  return (
    <Link
      href={`/${type}/${category}/${item.id}`}
      className="relative w-full h-[380px] overflow-hidden rounded-xl group bg-black/20 shadow-md"
    >
      {/* IMAGE */}
      <Image
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "/fallback.jpg"
        }
        alt={title}
        width={500}
        height={750}
        className="object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
      />

      {/* TOP BADGE */}
      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 text-[10px] uppercase rounded-md text-white/80">
        {item.media_type || "movie"}
      </div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10 space-y-2">
        {/* TITLE */}
        <h3 className="text-[18px] font-semibold leading-tight line-clamp-2">
          {title}
        </h3>

        {/* META */}
        <div className="flex items-center gap-3 text-[12px] text-gray-300">
          {/* DATE */}
          <span className="flex items-center gap-1">
            📅 {date !== "—" ? new Date(date).getFullYear() : "N/A"}
          </span>

          {/* DOT */}
          <span className="text-gray-500">•</span>

          {/* LANGUAGE */}
          <span className="flex items-center gap-1 uppercase bg-white/10 px-2 py-[2px] rounded-md text-[10px] tracking-wide">
            🌐 {item.original_language || "N/A"}
          </span>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-md text-cyan-300 text-[13px] w-fit">
          <FaStar className="text-yellow-400 text-xs" />
          <span>{rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
