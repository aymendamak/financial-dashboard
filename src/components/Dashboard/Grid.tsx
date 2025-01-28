import ActivityGraph from "./ActivityGraph";
import RecentTransactions from "./RecentTransactions";
import StatCards from "./StatCards";

const Grid = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatCards />

      <ActivityGraph />
      <RecentTransactions />
    </div>
  );
};

export default Grid;
