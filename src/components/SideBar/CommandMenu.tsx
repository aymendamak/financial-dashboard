import { Command } from "cmdk";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const CommandMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 bg-stone-950/50"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden w-full max-w-lg mx-auto mt-12"
        onClick={(e) => e.stopPropagation()}
      >
        <Command.Input
          value={value}
          onValueChange={setValue}
          placeholder="What do you need ?"
          className="relative border-b border-stone-300 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none "
        />
        <Command.List className="p-3">
          <Command.Empty>
            No results found for{" "}
            <span className="text-violet-500"> {value} </span>
          </Command.Empty>

          <Command.Group heading="Team" className="text-sm-mb-3 text-stone-400">
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              <span className="">Invite Member</span>
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <span className="material-symbols-outlined">visibility</span>
              <span className="">See Org Chart</span>
            </Command.Item>
          </Command.Group>

          <Command.Group
            heading="Integrations"
            className="text-sm-mb-3 text-stone-400"
          >
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <span className="material-symbols-outlined">link</span>
              <span className="">Link Services</span>
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <span className="material-symbols-outlined">call</span>
              <span className="">Contact Support</span>
            </Command.Item>
          </Command.Group>

          <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
            <span className="material-symbols-outlined">logout</span>
            <span className="">Sign Out</span>
          </Command.Item>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};
