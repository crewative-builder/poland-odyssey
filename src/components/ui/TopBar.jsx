import React from "react";

const TopBar = () => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 px-10 py-3 rounded-full shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-800 tracking-wide">
          Poland
        </h1>
      </div>
    </div>
  );
};

export default TopBar;
