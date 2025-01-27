import React from "react";

const Route = ({
  selected,
  icon,
  title,
}: {
  selected: boolean;
  icon: string;
  title: string;
}) => {
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none "
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="">{title}</span>
    </button>
  );
};

const RouteSelect = () => {
  return (
    <div className="space-y-1">
      <Route icon="home" selected={true} title="Dashboard" />
      <Route icon="home" selected={false} title="Invoices" />
    </div>
  );
};

export default RouteSelect;
