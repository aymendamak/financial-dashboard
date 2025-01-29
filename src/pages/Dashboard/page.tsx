import ActivityGraph from "../../components/Dashboard/activity-graph";
import RecentTransactions from "../../components/Dashboard/recent-transactions";
import StatCards from "../../components/Dashboard/stat-cards";

const DashboardPage = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatCards />

      <ActivityGraph />
      <RecentTransactions />
    </div>
  );
};

export default DashboardPage;
