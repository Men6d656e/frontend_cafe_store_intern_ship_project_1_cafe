"use client";
import Falvours from "@/components/Falvours";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      {/* hero section */}
      <Hero />
      {/* how works */}
      <div id="info" className="px-5">
        <Locations
          image={"/loc1.jpg"}
          title="Dining Experience"
          desc="Indulge in a delightful dining experience at our cafe. Enjoy a
            selection of delectable dishes, freshly brewed coffee, and a
            welcoming ambiance."
          underdes="Savor the Flavors"
        />
        <Locations
          image={"/loc2.jpg"}
          title="Remote Work Haven"
          desc="Discover the perfect workspace for remote professionals at our cafe. Enjoy high-speed internet, comfortable seating, and a quiet atmosphere to boost your productivity."
          underdes="Work in Comfort"
        />
        <Locations
          image={"/loc3.jpg"}
          title="Dining Experience"
          desc="Indulge in a delightful dining experience at our cafe. Enjoy a
            selection of delectable dishes, freshly brewed coffee, and a
            welcoming ambiance."
          underdes="Savor the Flavors"
        />
      </div>

      {/* hours options */}
      <div className="w-full flex items-center justify-center bg-amber-950 py-8 mt-5">
        <div className="flex items-center gap-5 ">
          <div className="relative w-[50px] h-[50px]">
            <Image
              src={"/titleCup.png"}
              alt="titleCup"
              fill={true}
              priority
              sizes="50px"
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="text-white text-3xl font-bold">
              Hours of Operation
            </h2>
          </div>
        </div>
      </div>

      <Falvours />

      <div className="mt-5 pb-20 flex flex-col justify-center items-center text-shadow-amber-950">
        <h2 className="text-5xl font-extrabold text-amber-950">
          Book Your Visit
        </h2>
        <p className="pt-5">Experience the best coffee and dining in town</p>
        <div>
          <Button
            onClick={() => router.push("/form")}
            className="rounded-xl bg-amber-950 hover:bg-amber-900 mt-5 text-xl px-10 py-6 cursor-pointer"
          >
            Make a reservation
          </Button>
        </div>
      </div>
      {/* footer */}
      <div className="flex bg-gray-100 mb-20 justify-center items-center text-gray-500 py-10">
        akash(c) copyright.
      </div>
    </div>
  );
}
