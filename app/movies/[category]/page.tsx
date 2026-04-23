"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function MoviesPage() {
  const { category } = useParams(); // ✅ get from URL
  const router = useRouter();

  const [movies, setMovies] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      let url = "";

      switch (category) {
        case "trending":
          url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`;
          break;

        case "top_rated":
          url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`;
          break;

        case "now_playing":
          url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;
          break;

        case "upcoming":
          url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`;
          break;

        default:
          url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  // ✅ dropdown now updates URL instead of state
  const handleChange = (value: string) => {
    setPage(1);
    router.push(`/movies/${value}`);
  };

  const filtered = movies.filter((m) =>
    m.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <Navbar />

      <h1 className="text-center text-xl font-bold capitalize">
        {category?.toString().replace("_", " ")}
      </h1>

      {/* ✅ DROPDOWN */}
      <div className="flex justify-center mt-4">
        <select
          value={category}
          onChange={(e) => handleChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="trending">Trending</option>
          <option value="top_rated">Top Rated</option>
          <option value="now_playing">Now Playing</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      {/* SEARCH */}
      <input
        className="border p-2 w-1/2 mx-auto block mt-4"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {filtered.map((m) => (
            <div key={m.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                className="rounded"
                alt={m.title}
              />
              <p>{m.title}</p>
            </div>
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
