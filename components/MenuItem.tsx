import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type MenuItemProps = {
  title: string;
  address: string;
  Icon: IconType;
};

const MenuItem = ({ title, address, Icon }: MenuItemProps) => {
  return (
    <Link
      href={address}
      className="flex items-center gap-2 hover:text-cyan-500"
    >
      <Icon className="text-[20px] sm:hidden" />
      <p className="hidden uppercase sm:inline text-sm">{title}</p>
    </Link>
  );
};

export default MenuItem;
