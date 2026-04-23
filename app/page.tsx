"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const pathname = usePathname();
  const router = useRouter();

  // ✅ FIXED: 3 states (all | movie | tv)
  let category: "all" | "movie" | "tv" = "all";

  if (pathname === "/movies") {
    category = "movie";
  } else if (pathname === "/tv_shows") {
    category = "tv";
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let url = "";

      if (category === "movie") {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
      } else if (category === "tv") {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
      } else {
        // ✅ Default = trending all
        url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&page=${page}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, page]);

  // ✅ FIXED: support "all"
  const setCategory = (newCategory: string) => {
    setPage(1);

    if (newCategory === "movie") {
      router.push("/movies");
    } else if (newCategory === "tv") {
      router.push("/tv_shows");
    } else {
      router.push("/"); // ⭐ default page
    }
  };

  const filteredMovies = movies.filter((item) =>
    (item.title || item.name)?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <Navbar setCategory={setCategory} />

      {/* ✅ Dynamic title */}
      <h1 className="text-xl font-bold mb-4 text-center">
        {category === "movie"
          ? "Movies"
          : category === "tv"
            ? "TV Series"
            : "Trending This Week"}
      </h1>

      {/* 🔍 SEARCH */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-2 border rounded border-b-amber-200"
        />
      </div>

      {/* 📄 CONTENT */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredMovies.map((item: any) => (
              <div key={item.id} className="text-sm">
                <img
                  className="rounded"
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.title || item.name}
                />
                <p className="mt-2">{item.title || item.name}</p>
              </div>
            ))}
          </div>

          {/* 🔥 PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Previous
            </button>

            <span className="font-bold">Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
