"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarItemProps = {
  title: string;
  param: string;
};

const NavbarItem = ({ title, param }: NavbarItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === `/genre=${param}`;

  return (
    <Link
      href={`/genre=${param}`}
      className={`relative px-2 py-1 font-medium transition-colors duration-200
        ${isActive ? "text-white" : "text-gray-200 hover:text-white"}
      `}
    >
      {title}

      {/* underline */}
      <span
        className={`absolute left-[50%] -translate-x-[50%] -bottom-1 h-[3px] w-[80%] bg-cyan-100 transition-transform duration-200
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </Link>
  );
};

export default NavbarItem;
