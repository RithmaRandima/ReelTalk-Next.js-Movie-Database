import React from "react";
import MenuItem from "./MenuItem";
import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
const Header = () => {
  return (
    <div className="flex items-center justify-between p-3 max-w-6xl mx-auto w-full py-5">
      <div className="flex gap-4">
        <MenuItem title="Home" address="/" Icon={AiFillHome} />
        <MenuItem title="About" address="/about" Icon={BsFillInfoCircleFill} />
      </div>

      <div className="flex items-center gap-5">
        <DarkModeSwitch />
        <Link href={"/"} className="flex items-center gap-1">
          <span className="bg-cyan-500 font-bold py-1 px-2 rounded-sm">
            ReelTalk
          </span>
          <span className="text-xl font-extrabold hidden sm:inline">clone</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
