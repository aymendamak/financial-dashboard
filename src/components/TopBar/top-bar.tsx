import React from "react";

const TopBar = () => {
  return (
    <div className="border-b mb-4 px-4 mt-2 pb-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">Good morning, Tom!</span>
          <span className="text-sx block text-stone-500">
            Tuesday, Aug 8th 2024
          </span>
        </div>

        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="">Prev 6 Months</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
