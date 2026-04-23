"use client";

type NavbarProps = {
  setCategory: (value: string) => void;
};

const Navbar = ({ setCategory }: NavbarProps) => {
  return (
    <div className="flex w-full bg-cyan-500 p-3 justify-center gap-10 text-white">
      <button
        onClick={() => setCategory("movie")}
        className="font-bold hover:text-gray-200"
      >
        Movies
      </button>

      <button
        onClick={() => setCategory("tv")}
        className="font-bold hover:text-gray-200"
      >
        TV Series
      </button>
    </div>
  );
};

export default Navbar;
