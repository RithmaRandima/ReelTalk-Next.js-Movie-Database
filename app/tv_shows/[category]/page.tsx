"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import MovieCard from "@/components/MovieCard";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type MovieItem = {
  id: number;
  title?: string;
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

export default function TvShowsPage() {
  const params = useParams();
  const category = params.category as string;
  const router = useRouter();

  const [shows, setShows] = useState<MovieItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTv = async () => {
      setLoading(true);

      let url = "";

      switch (category) {
        case "trending":
          url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&page=${page}`;
          break;

        case "top_rated":
          url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${page}`;
          break;

        case "airing_today":
          url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&page=${page}`;
          break;

        case "on_the_air":
          url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&page=${page}`;
          break;

        default:
          url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&page=${page}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setShows(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTv();
  }, [category, page]);

  // ✅ dropdown updates URL
  const handleChange = (value: string) => {
    setPage(1);
    router.push(`/tv/${value}`);
  };

  const filtered = shows.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="relative">
      <div className="pt-19">
        <Navbar />
      </div>

      <h1 className="text-[45px] capitalize tracking-[3px] font-bold  text-center my-3">
        {category?.toString().replace("_", " ")}
      </h1>

      {/* ✅ DROPDOWN */}
      <div className="absolute right-7 top-60 flex justify-center">
        <select
          value={category}
          onChange={(e) => handleChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="trending" className="bg-white text-black">
            Trending
          </option>
          <option value="top_rated" className="bg-white text-black">
            Top Rated
          </option>
          <option value="airing_today" className="bg-white text-black">
            Airing Today
          </option>
          <option value="on_the_air" className="bg-white text-black">
            On The Air
          </option>
        </select>
      </div>

      {/* SEARCH */}
      <input
        className="bg-white text-black rounded-full w-1/2 mx-auto block mt-4 mb-5 shadow-[1px_1px_4px_rgba(0,0,0,0.5)] p-3 px-5"
        placeholder="Search TV shows..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 w-[95%] mx-auto">
          {filtered.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              type="tv_shows"
              category={category}
            />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 p-4">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
