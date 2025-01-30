import ActivityGraph from "../../components/Dashboard/activity-graph";
import RecentTransactions from "../../components/Dashboard/recent-transactions";
import StatCards from "../../components/Dashboard/stat-cards";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex flex-row gap-2 justify-between ">
        <div className="w-full">
          <ActivityGraph />
        </div>
        <div className="flex flex-col gap-5">
          <StatCards />
        </div>
      </div>
      <div className="">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default DashboardPage;
