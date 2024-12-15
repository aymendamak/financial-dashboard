import React from "react";

const Plan = () => {
  return (
    <div className="flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col 5-12 border-t px-2 border-stone-300 justify-end text-sm">
      <div className="flex items-center justify-between">
        <div className="">
          <p className="font-bold">Entreprise</p>
          <p className="text-stone-500">Pas ay you go</p>
        </div>

        <button className="px-2 py-1.5 font-medium bg-stone-200 hover:bg-stone-300 transition-colors rounded ">
          Support
        </button>
      </div>
    </div>
  );
};

export default Plan;
