"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();
  return (
    <section className="container m-auto">
      <div className="flex ">
        {/* 1 */}
        <div className="flex flex-col justify-center text-amber-950 w-full md:w-1/2 p-10 text-center sm:text-left ">
          <h1 className="text-3xl sm:text-4xl md:w-5xl lg:w-6xl font-extrabold ">
            Discover the Perfect Cup.
          </h1>
          <p className="text-md pt-10">
            Immerse yourself in the aroma and flavor of our expertly crafted
            coffee. Enjoy a relaxing atmosphere and personalized service at our
            cozy cafe.
          </p>
          <div>
            <Button
              onClick={() => router.push("/form")}
              className="bg-amber-950 hover:bg-amber-900 mt-6 cursor-pointer"
            >
              Book Now
            </Button>
          </div>
        </div>
        {/* 2 */}
        <div className="sm:flex items-center justify-center relative w-full md:w-1/2   h-[500px] hidden">
          <Image src={"/cofe.svg"} alt="hero" fill={true} priority />
        </div>
      </div>
    </section>
  );
}

export default Hero;
