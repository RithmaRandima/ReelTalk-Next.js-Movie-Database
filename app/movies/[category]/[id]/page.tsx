"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type MovieDetail = {
  backdrop_path?: string;
  genres: string[];
  original_title?: string;
  poster_path?: string;
  name?: string;
  overview?: string;
  vote_average?: number;
};

export default function TvDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await fetch(
        // `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/${id}?api_key=bb6df8e826bb6cac0d861c0acee66248&append_to_response=credits,videos,similar`,
      );
      const json = await res.json();
      setData(json);
    };

    fetchDetail();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  console.log(data);

  const tags = data?.genres;
  const country =
    data?.origin_country?.[0] === "US" ? "USA" : data?.origin_country?.[0];
  return (
    <div className="relative text-white bg-black min-h-screen w-full pb-15">
      {/* Backdrop */}
      <div className="w-full h-[100vh] relative">
        <Image
          src={
            data?.backdrop_path
              ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
              : "/fallback.jpg"
          }
          alt={data?.original_title || "movie"}
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative w-[80%] mx-auto -mt-80 flex gap-2 pb-5">
        {/* LEFT */}
        <div className="flex-1 h-[370px] relative">
          <Image
            src={
              data?.poster_path
                ? `https://image.tmdb.org/t/p/original${data.poster_path}`
                : "/fallback.jpg"
            }
            alt={data?.poster_path || "movie"}
            fill
            className="object-cover object-top rounded-lg"
            priority
          />
        </div>

        {/* MIDDLE */}
        <div className="flex-2 h-fit pl-3 flex flex-col gap-4 mt-5">
          {/* TITLE */}
          <h1 className="text-[40px] font-extralight leading-tight">
            {data.title || data.original_title}
          </h1>

          {/* TAGLINE */}
          {data.tagline && (
            <p className="text-sm text-gray-400 italic">“{data.tagline}”</p>
          )}

          {/* META INFO */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <span>⏱ {data.runtime} min</span>

            <span>🌐 {data?.spoken_languages?.[0]?.name}</span>

            <span>🎬 {data.status}</span>
          </div>

          {/* GENRES */}
          <div className="flex flex-wrap gap-2">
            {data.genres?.map((g: any) => (
              <span
                key={g.id}
                className="text-cyan-300 border border-cyan-500/40 px-2 py-1 text-[12px] rounded-full"
              >
                #{g.name}
              </span>
            ))}
          </div>

          {/* RELEASE INFO */}
          <div className="flex flex-wrap items-center gap-4 text-cyan-400 text-sm font-medium">
            <span>📅 {data.release_date?.slice(0, 4)}</span>

            <span>🗓 {data.release_date}</span>

            <span>📍 {country}</span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-6">
            {data.overview}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex-1 h-fit bg-gray-900/40 rounded-lg flex flex-col gap-4 text-sm">
          {/* top info section */}
          <div>
            {/* top */}
            <div className="w-full h-[200px] bg-cyan-600/70 flex flex-col justify-center items-center">
              <p className="text-[100px] font-extralight">
                {data.vote_average?.toFixed(1)}
              </p>
              <span className="text-white -mt-4 font-semibold">
                {data.vote_count}00 users
              </span>
            </div>
            {/* bottom */}
            <div className="w-full flex">
              <div className="w-full h-[70px] bg-cyan-700 flex flex-col items-center justify-center">
                <p className="text-[20px] font-bold">10</p>
                <p className="uppercase tracking-[2px] text-[10px]">
                  Your Rating
                </p>
              </div>
              <div className="w-full h-[70px] bg-cyan-800 flex flex-col items-center justify-center">
                <p className="text-[20px] font-bold">
                  {" "}
                  {Math.round(data.popularity)}
                </p>
                <p className="uppercase tracking-[2px] text-[10px]">
                  popularity
                </p>
              </div>
            </div>
          </div>

          {/* QUICK INFO */}
          <div className="flex flex-col gap-2 text-gray-300 p-4">
            <p>💰 Budget: ${data.budget?.toLocaleString()}</p>

            <p>💵 Revenue: ${data.revenue?.toLocaleString()}</p>

            <p>🎥 Language: {data.original_language?.toUpperCase()}</p>

            <p>🌍 Countries: {data.production_countries?.[0]?.name}</p>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-2 ">
            {data.homepage && (
              <a
                href={data.homepage}
                target="_blank"
                className="text-blue-400 text-xs"
              >
                🌐 Official Website
              </a>
            )}

            {data.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${data.imdb_id}`}
                target="_blank"
                className="text-yellow-400 text-xs"
              >
                🎬 View on IMDb
              </a>
            )}
          </div>
        </div>
      </div>

      {/* VIDEO + PEOPLE SECTION */}
      <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 text-white gap-5 mt-5">
        {/* 🎭 LEFT: PEOPLE */}
        <div className="bg-amber300 flex flex-col  gap-8">
          {/*DIRECTOR & WRITERS */}
          <div className="flex">
            {/* DIRECTOR */}
            <div>
              <h3 className="text-cyan-400 text-[13px] uppercase tracking-widest mb-3">
                Director
              </h3>

              {data.credits?.crew
                ?.filter((c: any) => c.job === "Director")
                .slice(0, 1)
                .map((d: any) => (
                  <div
                    key={d.id}
                    className="flex flex-col text-center items-center gap-3"
                  >
                    <div className="w-23 h-23 rounded-full relative">
                      <Image
                        src={
                          d.profile_path
                            ? `https://image.tmdb.org/t/p/w185${d.profile_path}`
                            : "/fallback.jpg"
                        }
                        alt={data?.original_title || "movie"}
                        fill
                        priority
                        className="w-12 h-12 rounded-full object-cover  border border-white/10"
                      />
                    </div>

                    <div>
                      <p className="text-sm">{d.name}</p>
                      <p className="text-xs text-gray-500">Director</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* WRITERS */}
            <div className="ml-10">
              <h3 className="text-cyan-400 text-[13px] uppercase tracking-widest mb-3">
                Writers
              </h3>

              <div className="flex">
                {data.credits?.crew
                  ?.filter((c: any) => c.department === "Writing")
                  .slice(0, 3)
                  .map((w: any, index: number) => (
                    <div
                      key={`${w.credit_id || w.id}-${index}`}
                      className="flex flex-col mx-1 p-2 items-center justify-center text-center gap-2 "
                    >
                      <div className="w-17 h-17 rounded-full relative">
                        <Image
                          src={
                            w.profile_path
                              ? `https://image.tmdb.org/t/p/w185${w.profile_path}`
                              : "/fallback.jpg"
                          }
                          alt={data?.original_title || "movie"}
                          fill
                          priority
                          className="rounded-full object-cover object-top border border-white/10"
                        />
                      </div>

                      <div>
                        <p className="text-[14px]">{w.name}</p>
                        <p className="text-[10px] text-gray-500">{w.job}</p>
                      </div>
                    </div>
                  ))}

                {data.credits?.crew?.filter(
                  (c: any) => c.department === "Writing",
                ).length === 0 && (
                  <p className="text-xs text-gray-500">No writers listed</p>
                )}
              </div>
            </div>
          </div>

          {/* CAST (CLEAN HORIZONTAL STRIP) */}
          <div>
            <h3 className="text-cyan-400 text-[13px] uppercase tracking-widest mb-3">
              Cast
            </h3>

            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {data.credits?.cast?.slice(0, 12).map((actor: any) => (
                <div key={actor.id} className="min-w-[100px] text-center">
                  {/* IMAGE WRAPPER */}
                  <div className="relative w-25 h-25 mx-auto">
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "/fallback.jpg"
                      }
                      alt={actor.name}
                      fill
                      className="object-cover border border-white/10"
                    />
                  </div>

                  {/* NAME */}
                  <p className="text-[10px] mt-2 truncate">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🎬 RIGHT: TRAILER (BIG FOCUS) */}
        <div className="bg-gray-900/40 h-fit p-5">
          <h2 className="text-xl font-bold  mb-4 tracking-wide text-white">
            Trailer
          </h2>

          <div className=" overflow-hidden border border-white/10 bg-black shadow-xl">
            {data.videos?.results?.length ? (
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                title="Trailer"
                allowFullScreen
              />
            ) : (
              <div className="aspect-video flex items-center justify-center text-gray-400">
                No trailer available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RELATED MOVIES */}
      <div className="w-[90%] mx-auto mt-20 text-white">
        <h2 className="text-2xl font-light mb-10 tracking-wide">
          🔗 Related Movies
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
          {data.similar?.results?.slice(0, 10).map((movie: any) => (
            <div key={movie.id} className="min-w-[220px] group cursor-pointer">
              {/* POSTER */}
              <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-white/10">
                <div className="relative w-full h-full">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/fallback.jpg"
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    fill
                  />
                </div>

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* INFO */}
              <div className="mt-2 px-1">
                <p className="text-sm truncate">{movie.title || movie.name}</p>

                <p className="text-xs text-gray-400">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* PRODUCTION COMPANIES */
}
// <div>
//   <h3 className="text-cyan-400 mb-2">🏢 Studios</h3>
//   <div className="flex flex-col gap-1 text-gray-300 text-xs">
//     {data.production_companies?.slice(0, 4).map((c: any) => (
//       <span key={c.id}>• {c.name}</span>
//     ))}
//   </div>
// </div>
