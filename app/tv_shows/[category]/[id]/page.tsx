"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function TvDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await fetch(
        // `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/tv/${id}?api_key=bb6df8e826bb6cac0d861c0acee66248&append_to_response=credits,videos,similar`,
      );
      const json = await res.json();
      setData(json);
    };

    fetchDetail();
  }, [id]);

  console.log(data);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p>{data.overview}</p>
      <p>Rating: {data.vote_average}</p>
    </div>
  );
}
