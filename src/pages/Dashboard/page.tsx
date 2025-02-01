import ActivityGraph from "../../components/Dashboard/activity-graph";
import RecentTransactions from "../../components/Dashboard/recent-transactions";
import StatsData from "../../components/Dashboard/stats-info";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex flex-row gap-2 justify-between ">
        <div className="w-3/4">
          <ActivityGraph />
        </div>
        <div className="flex flex-col flex-grow gap-5">
          <StatsData />
        </div>
      </div>
      <div className="">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default DashboardPage;
