import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40">
      {/* simple spinner */}
      <div className="w-8 h-8 border-4 border-gray-300 border-t-cyan-500 rounded-full animate-spin"></div>

      <p className="mt-3 text-gray-500 animate-pulse">Loading movies...</p>
    </div>
  );
};

export default Loading;
