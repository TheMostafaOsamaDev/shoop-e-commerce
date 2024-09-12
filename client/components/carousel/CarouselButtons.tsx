import React from "react";
import { CarouselNext, CarouselPrevious } from "../ui/carousel";
import clsx from "clsx";

export default function CarouselButtons({
  currentSlide,
  totalSlides,
}: {
  currentSlide: number;
  totalSlides: number;
}) {
  const buttonsClass =
    "relative translate-x-0 translate-y-0 left-0 top-0 size-10 bg-transparent text-white";

  return (
    <div className="flex items-center gap-2">
      <CarouselPrevious className={clsx(buttonsClass)} />
      <span className="w-fit text-white text-lg font-medium">
        {currentSlide + 1}/{totalSlides}
      </span>
      <CarouselNext className={clsx(buttonsClass)} />
    </div>
  );
}
