interface StatsCardProps {
  title: string;
  value: string;
  pillText: string;
  trend: "UP" | "DOWN";
  period: string;
}

const StatsCard = ({
  title,
  value,
  pillText,
  trend,
  period,
}: StatsCardProps) => {
  return (
    <div className="p-4 col-span-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold"> {value} </p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-1.5 py-1 rounded ${
            trend === "UP"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } `}
        >
          {trend === "UP" ? (
            <span className="material-symbols-outlined">trending_up</span>
          ) : (
            <span className="material-symbols-outlined">trending_down</span>
          )}
          {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500"> {period} </p>
    </div>
  );
};

export default StatsCard;
