import React from "react";

const TopBar = () => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 px-8 py-3 rounded-full shadow-2xl">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          🇵🇱 Poland Odyssey{" "}
          <span className="text-xs font-normal text-slate-400 ml-2">v2.0</span>
        </h1>
      </div>
    </div>
  );
};

export default TopBar;
