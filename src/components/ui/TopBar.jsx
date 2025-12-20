import React from "react";

const TopBar = () => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-white px-8 py-2 rounded-full shadow-lg border border-slate-100">
        <h1 className="text-xl font-bold text-slate-800">Poland</h1>
      </div>
    </div>
  );
};

export default TopBar;
