import React, { useState } from "react";
import { CommandMenu } from "./CommandMenu";

const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm">
        <span className="material-symbols-outlined">search</span>
        <input
          onFocus={(e) => {
            e.target.blur();
            setOpen(true);
          }}
          type="text"
          placeholder="Search"
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        />
        <span className="material-symbols-outlined p-1 text-sx flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-4 top-1/2 -translate-y-1/2">
          keyboard_command_key
        </span>
        <span className="p-1 text-base bg-stone-50 rounded absolute right-1">
          K
        </span>
      </div>

      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Search;
