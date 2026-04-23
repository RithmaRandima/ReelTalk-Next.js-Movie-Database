import React from "react";
import { FaFilm, FaStar, FaUsers, FaPlayCircle } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-wide">About This App</h1>
        <p className="text-gray-600 text-sm">
          A clean and modern movie discovery experience inspired by IMDb
        </p>
      </div>

      {/* Section 1 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-cyan-500">
          <FaFilm />
          <h2 className="text-lg font-medium text-gray-800">Movie Details</h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          This movie app is designed to present films in a structured and
          professional way, similar to IMDb. It provides essential information
          such as title, release year, genre, runtime, and storyline in a clean
          layout. User ratings and feedback help viewers quickly understand the
          quality and popularity of each movie without unnecessary clutter or
          distractions.
        </p>
      </div>

      {/* Section 2 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-cyan-500">
          <FaStar />
          <h2 className="text-lg font-medium text-gray-800">
            Ratings & Discovery
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          The platform enhances discovery by integrating ratings, trending
          movies, and personalized suggestions. Users can explore similar films,
          check audience scores, and find popular titles easily. The focus is on
          fast browsing and meaningful content presentation rather than heavy
          visual effects.
        </p>
      </div>

      {/* Section 3 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-cyan-500">
          <FaUsers />
          <h2 className="text-lg font-medium text-gray-800">
            Cast & Community
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          Users can explore actor profiles, cast details, and community-driven
          insights. This creates a connected experience where films are linked
          with people, performances, and audience opinions, making movie
          exploration more interactive and informative.
        </p>
      </div>

      {/* Section 4 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-cyan-500">
          <FaPlayCircle />
          <h2 className="text-lg font-medium text-gray-800">Experience</h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          The interface is optimized for speed, simplicity, and usability. With
          smooth navigation and minimal design elements, the app focuses on
          delivering content quickly while maintaining a modern and professional
          feel suitable for real-world movie browsing platforms.
        </p>
      </div>
    </div>
  );
};

export default About;
