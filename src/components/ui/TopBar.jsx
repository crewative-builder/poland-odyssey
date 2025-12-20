import React from "react";

const TopBar = () => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 px-12 py-3 rounded-full shadow-xl">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Poland
        </h1>
      </div>
    </div>
  );
};

export default TopBar;
