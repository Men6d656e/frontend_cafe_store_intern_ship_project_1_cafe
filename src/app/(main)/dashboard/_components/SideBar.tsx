"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, GalleryVerticalEnd, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navs = [
  {
    label: "All",
    link: "/dashboard/all",
    icon: <GalleryVerticalEnd size={20} />,
  },
  {
    label: "Bookings",
    link: "/dashboard/bookings",
    icon: <ClipboardList size={20} />,
  },
  {
    label: "Users",
    link: "/dashboard/users",
    icon: <UsersRound size={20} />,
  },
];

function SideBar() {
  const pathname = usePathname();
  return (
    <div className="p-4 w-auto ">
      <Card>
        <CardContent>
          <div className="flex flex-row sm:flex-col md:flex-col justify-center sm:justify-start   sm:h-screen pt-5 gap-2 px-2 ">
            {navs.map((nav, index) => {
              const isactive = pathname === nav.link;
              return (
                <Link
                  key={index}
                  className={`text-amber-950 font-black  px-4 py-2 flex gap-3 rounded-sm 
                ${isactive ? "bg-gray-400 text-white" : ""}`}
                  href={nav.link}
                >
                  {nav.icon}
                  {nav.label}
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SideBar;
