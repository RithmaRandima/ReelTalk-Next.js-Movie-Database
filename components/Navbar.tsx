import React from "react";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  return (
    <div className="flex w-full bg-cyan-500 p-3 items-center justify-center gap-7">
      <NavbarItem title="Trending" param="fetchingTrending" />
      <NavbarItem title="Top Rated" param="fetchingTopRated" />
    </div>
  );
};

export default Navbar;
