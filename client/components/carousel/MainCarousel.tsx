"use client";
import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Zap } from "lucide-react";
import clsx from "clsx";
import CarouselButtons from "./CarouselButtons";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";

const carouselData = [
  {
    src: "/assets/slider/1_home_and_kitchen.jpg",
    title: "Home & Kitchen",
    // description: "Furniture, home décor, kitchen appliances, and more",
    description:
      "Start decorating your home with our wide range of furniture, home décor, kitchen appliances, and more",
    thunderBg: "bg-[#03a080]",
    textColor: "text-slate-900",
  },
  {
    src: "/assets/slider/2_electronics.jpg",
    title: "Electronics",
    // description: "Smartphones, laptops, cameras, and more",
    description:
      "Stay up to date with the latest technology with our wide range of smartphones, laptops, cameras, and more",
    thunderBg: "bg-red-900",
    textColor: "text-white",
  },
  {
    src: "/assets/slider/3_fashion_and_apparel.jpg",
    title: "Fashion & Apparel",
    // description: "Clothes, shoes, accessories, and more",
    description:
      "Stay in style with our wide range of clothes, shoes, accessories, and more",
    thunderBg: "bg-[#193871]",
    textColor: "text-white",
  },
  {
    src: "/assets/slider/4_beauty_and_personal_care.jpg",
    title: "Beauty & Personal Care",
    // description: "Skincare, makeup, hair care, and more",
    description:
      "Look and feel your best with our wide range of skincare, makeup, hair care, and more",
    textBg: "bg-[#870c00]",
    textColor: "text-slate-900",
  },
  {
    src: "/assets/slider/5_health_and_wellness.jpg",
    title: "Health & Wellness",
    // description: "Vitamins, fitness equipment, health monitors, and more",
    description:
      "Stay healthy and fit with our wide range of vitamins, fitness equipment, health monitors, and more",
    thunderBg: "bg-[#3e1e05]",
    textColor: "text-white",
  },
];

const totalSize = carouselData.length;

export default function MainCarousel({
  className,
  height,
}: {
  className?: string;
  height?: string;
}) {
  const [current, setCurrent] = React.useState(0);

  const onSelected = (api: CarouselApi) => {
    if (api) {
      setCurrent(api.selectedScrollSnap());
    }
  };

  return (
    <Carousel
      className={clsx(className, "relative", height)}
      plugins={[
        Fade(),
        Autoplay({
          delay: 3000,
          playOnInit: true,
        }),
      ]}
      opts={{ loop: true }}
      onSelected={onSelected}
    >
      {/* Description */}
      <div
        className={
          "flex gap-3 h-[80px] items-center text-white absolute top-2 left-1/2 -translate-x-1/2 w-[98%] p-1 lg:p-2 py-1"
        }
      >
        <span
          className={clsx(
            "text-white p-3 h-full rounded-main backdrop-blur-[10px] grid place-items-center",
            `${carouselData[current].thunderBg} bg-opacity-55`
          )}
        >
          <Zap size={35} fill="white" />
        </span>
        <p
          className={clsx(
            "text-xs md:text-sm font-medium h-full w-full p-1 px-3 flex items-center backdrop-blur-[10px] rounded-main flex-1",
            carouselData[current].textColor,
            `${carouselData[current].thunderBg} bg-opacity-45`
          )}
        >
          {carouselData[current].description}
        </p>
      </div>

      {/* Title */}
      <div className="p-1 lg:p-2 py-1 h-[90px] absolute w-[98%] bottom-2 left-1/2 -translate-x-1/2">
        <div className="backdrop-blur-[10px] rounded-main flex items-center justify-between h-full px-3">
          <h4 className="font-medium text-white">
            {carouselData[current].title}
          </h4>

          <CarouselButtons currentSlide={current} totalSlides={totalSize} />
        </div>
      </div>

      {/* Carousel Content + Items */}
      <CarouselContent className={clsx("relative -z-10", height)}>
        {carouselData.map((item, index) => (
          <CarouselItem
            key={index}
            className="flex items-center justify-center"
          >
            <Image
              src={item.src}
              width={1200}
              height={800}
              alt={item.title}
              className="object-cover bg-center left-5 absolute w-full h-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
