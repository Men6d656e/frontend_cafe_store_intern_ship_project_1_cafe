"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { fetchUserRole } from "@/lib/userRole";
import { Role, userRole as userRoleStore } from "@/store/role";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";
import { API_BASE_URL } from "@/constants/api";

function Navbar() {
  const [userRolestat, setUserRole] = useState<string | null>("");
  const [mobNav, setMobNav] = useState(false);
  const setRole = userRoleStore((state: Role) => state.setRole);
  const clearRole = userRoleStore((state) => state.clearRole);

  const navToogleFunction = () => {
    setMobNav(!mobNav);
  };

  useEffect(() => {
    const roleetch = async () => {
      const role = await fetchUserRole();
      setRole(role);
      setUserRole(role);
      console.log("nevbar", role);
    };
    roleetch();
  }, []);

  const navs = [
    {
      text: "Home",
      label: "/",
    },
    {
      text: "Info",
      label: "/home/#info",
    },
    {
      text: "My Bookings",
      label: "/inbox",
    },
  ];
  const router = useRouter();

  const logedOut = async () => {
    const respones = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    if (respones.ok) {
      const res = await respones.json();
      toast.success(res?.message);
      clearRole();
      router.push("/login");
    } else {
      const res = await respones.json();
      toast.error(res?.messag);
    }
  };

  useEffect(() => {
    if (mobNav) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [mobNav]);
  return (
    <header>
      <nav className="flex bg-amber-100/10 px-6 py-4 justify-between items-center shadow ">
        {/* 1 */}
        <Link href={"/"}>
          <div className="logo  flex justify-center items-center">
            <Image
              src="/logo.png"
              width={150}
              height={75}
              alt="logo"
              priority
              className="w-auto h-12"
            />
          </div>
        </Link>
        {/* 2 */}
        <div className="sm:flex space-x-10 font-bold text-amber-900 hidden">
          {navs.map(({ text, label }, index) => {
            return (
              <Link key={index} href={label}>
                {text}
              </Link>
            );
          })}
          {userRolestat === "admin" && <Link href={"/form"}>Form</Link>}
        </div>
        {/* 3 */}
        <div className="space-x-1 hidden sm:flex">
          {userRolestat === "admin" ? (
            <Button
              onClick={() => router.push("/dashboard/all")}
              className="bg-amber-950 hover:bg-amber-900 cursor-pointer"
            >
              Dashboard
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/form")}
              variant={"default"}
              className="bg-amber-950 hover:bg-amber-900 cursor-pointer"
            >
              Book Now
            </Button>
          )}
          <Button
            className="border-amber-950  hover:bg-amber-950 text-amber-950 hover:text-white cursor-pointer"
            variant="outline"
            onClick={logedOut}
          >
            logout
          </Button>
        </div>
        {/* mob */}
        <div className="block sm:hidden">
          <Menu onClick={navToogleFunction} />
        </div>

        {/* mob nav */}
        {mobNav && (
          <div className="fixed inset-0 bg-white p-5 z-50 overflow-y-auto">
            <div className="flex justify-between items-center">
              <Link href={"/"} onClick={navToogleFunction}>
                <div className="logo  flex justify-center items-center">
                  <Image
                    src="/logo.png"
                    width={150}
                    height={75}
                    alt="logo"
                    priority
                    className="w-auto h-12"
                  />
                </div>
              </Link>
              <span className="px-2">
                <X onClick={navToogleFunction} />
              </span>
            </div>
            <div className="flex flex-col text-amber-950 font-bold space-y-5 mt-5">
              {navs.map(({ text, label }, index) => {
                return (
                  <Link
                    key={index}
                    href={label}
                    className="border-b"
                    onClick={navToogleFunction}
                  >
                    {text}
                  </Link>
                );
              })}
              {userRolestat === "admin" && <Link href={"/form"}>Form</Link>}
              {userRolestat === "admin" ? (
                <Button
                  onClick={() => {
                    navToogleFunction();
                    router.push("/dashboard/all");
                  }}
                  className="bg-amber-950 hover:bg-amber-900 cursor-pointer"
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navToogleFunction();
                    router.push("/form");
                  }}
                  variant={"default"}
                  className="bg-amber-950 hover:bg-amber-900 cursor-pointer"
                >
                  Book Now
                </Button>
              )}
              <Button
                className="border-amber-950  hover:bg-amber-950 text-amber-950 hover:text-white cursor-pointer"
                variant="outline"
                onClick={logedOut}
              >
                logout
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
