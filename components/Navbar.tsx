"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex gap-4 p-5 px-6 bg-[#111]">
      <button
        className={`${pathname === "/movies/trending" ? "text-cyan-500" : "text-white"} cursor-pointer text-[17px] font-bold tracking-[2px]`}
        onClick={() => router.push("/movies")}
      >
        Movies
      </button>

      <button
        className={`${pathname === "/tv_shows/trending" ? "text-cyan-500" : "text-white"} cursor-pointer text-[17px] font-bold tracking-[2px]`}
        onClick={() => router.push("/tv_shows")}
      >
        TV Shows
      </button>
    </div>
  );
}
