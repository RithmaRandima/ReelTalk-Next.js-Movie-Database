"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkModeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  console.log(resolvedTheme);
  console.log(mounted);

  return (
    <div>
      {resolvedTheme === "dark" ? (
        <MdLightMode
          className="text-xl cursor-pointer hover:text-cyan-500"
          onClick={() => setTheme("light")}
        />
      ) : (
        <MdDarkMode
          className="text-xl cursor-pointer hover:text-cyan-500"
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
};

export default DarkModeSwitch;
