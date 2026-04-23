"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="flex gap-4 p-4 bg-[#111] text-white">
      <button onClick={() => router.push("/movies")}>Movies</button>

      <button onClick={() => router.push("/tv_shows")}>TV Shows</button>
    </div>
  );
}
