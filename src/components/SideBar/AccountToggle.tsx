import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className="size-8 rounded shirnk-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-semibold block">Tom Is Loading</span>
          <span className="text-xs block text-stone-500">tom@hover.dev</span>
        </div>
        <span className="material-symbols-outlined absolute right-2 ">
          unfold_more
        </span>
      </button>
    </div>
  );
};

export default AccountToggle;
