import React from "react";

const TopBar = () => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-white px-8 py-2 rounded-full shadow-lg border border-slate-100">
        <span className="text-xl font-medium text-slate-700 tracking-tight">
          Poland
        </span>
      </div>
    </div>
  );
};

export default TopBar;
