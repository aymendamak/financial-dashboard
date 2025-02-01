import React from "react";

const TopBar = () => {
  return (
    <div className="border-b mb-4 px-4 mt-2 pb-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-md font-bold block">
            Good morning,{" "}
            <span className="font-bold text-cyan-500 ">Aymen</span> !
          </span>
          <span className="text-sm block text-stone-500">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
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
