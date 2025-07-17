import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

function Falvours() {
  const cards = [
    {
      icon: "/cup1.png",
      title: "Specialty Coffee",
      desc: "Indulge in our expertly crafted specialty coffee, made with the finest beans and brewed to perfection.",
    },
    {
      icon: "/cup2.png",
      title: "Cozy Atmosphere",
      desc: "Relax and unwind in our inviting and comfortable cafe, perfect for catching up with friends or getting some work done.",
    },
    {
      icon: "/cup3.png",
      title: "Delectable Treats",
      desc: "Satisfy your sweet tooth with our selection of mouthwatering pastries and desserts, baked fresh daily.",
    },
  ];
  return (
    <div className="w-full my-20">
      {/* 1 */}
      <div className="flex flex-col text-amber-950 text-center mb-10">
        <p className="">Explore Our Offerings</p>
        <h2 className="my-5 text-4xl font-bold">Savor the Flavors</h2>
        <p>
          Discover the perfect cup of coffee, delectable pastries, and more at
          our cozy cafe
        </p>
      </div>
      {/* 2 */}
      <div className="flex flex-wrap w-full justify-evenly text-amber-950">
        {cards.map((card, index) => {
          return (
            <Card key={index} className="w-[300px] border-0 shadow-none mt-5">
              <CardHeader>
                <div className="h-[100px] w-[100px] relative m-auto">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    fill={true}
                    priority
                    sizes="100px"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-center items-center m-auto text-center text-amber-950">
                  <h3 className="my-5 text-2xl font-bold ">{card.title}</h3>
                  <p className="text-pretty">{card.desc}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Falvours;
