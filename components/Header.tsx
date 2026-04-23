"use client";
import MenuItem from "./MenuItem";
import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import { usePathname } from "next/navigation";
const Header = () => {
  const pathname = usePathname();

  const isMovie = pathname.includes("/movies");
  const isTv = pathname.includes("/tv_shows");

  return (
    <div
      className={`absolute z-20 top-0 flex items-center justify-between p-3 px-20 mx-auto w-full py-5 bg-transparent ${isMovie || isTv || pathname === "/about" ? "text-cyan-500" : "text-white"} `}
    >
      <div className="flex items-center gap-5">
        <Link href={"/"} className="flex items-center gap-1">
          <span className=" font-bold py-1 px-2 text-[25px] tracking-[5px]">
            ReelTalk.
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-7 ">
        <MenuItem title="Home" address="/" Icon={AiFillHome} />
        <MenuItem title="About" address="/about" Icon={BsFillInfoCircleFill} />
        <DarkModeSwitch />
      </div>
    </div>
  );
};

export default Header;
