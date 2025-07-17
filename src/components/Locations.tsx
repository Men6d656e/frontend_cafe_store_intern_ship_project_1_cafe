"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function Locations({
  image,
  title,
  desc,
  underdes,
}: {
  image: string;
  title: string;
  desc: string;
  underdes: string;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col container m-auto overflow-hidden my-10">
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
        {/* 1 */}
        <div className="flex w-full md:w-1/2 justify-center items-center ">
          {" "}
          {/* Adjusted width for responsiveness */}
          <div className="relative h-[300px] w-[300px]">
            <Image
              src={image}
              alt={title}
              fill={true}
              style={{ objectFit: "cover" }}
              priority
              className="rounded-4xl"
              // Add the sizes prop here:
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px" // A good guess for a fixed 300px container
            />
          </div>
        </div>
        {/* 2 */}
        <div className="flex flex-col w-full md:w-1/2 relative p-8  justify-center  text-amber-950 ">
          {" "}
          <div className="text-center sm:text-left">
            <h2 className="text-4xl font-bold ">{title}</h2>
            <p className="pt-2">{underdes}</p>
            <p className=" pt-10 text-pretty">{desc}</p>
          </div>
          <div className="w-full">
            <Button
              onClick={() => router.push("/form")}
              className="w-full sm:w-auto  mt-10 border-amber-950 hover:bg-amber-950 hover:text-white"
              variant={"outline"}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Locations;
