import React, { useEffect, useState } from "react";
import HeroCard from "./HeroCard";
import Navbar from "./Navbar";

const HeroSection = ({ movies, setCategory }) => {
  const [index, setIndex] = useState(0);

  const slides = movies.slice(0, 8);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-black">
      {/* TRACK */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {slides.map((movie) => (
          <div key={movie.id} className="min-w-full h-full">
            <HeroCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
