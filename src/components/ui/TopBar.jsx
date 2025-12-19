import React from "react";

const TopBar = () => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-auto">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 px-6 py-3 rounded-full shadow-xl">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          🇵🇱 Poland Odyssey
        </h1>
      </div>
    </div>
  );
};

export default TopBar;
