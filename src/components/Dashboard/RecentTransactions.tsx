import { useEffect, useState } from "react";
import TransactionsTable from "../Table/transaction-table";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/v1");
      const data = await response.json();
      setTransactions(data);
    };
    fetchData();
  }, []);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5"></h3>
        <button className="text-sm text-violet-500 hover:underline">
          See all{" "}
        </button>
      </div>

      <div className="overflow-x-auto">
        <TransactionsTable data={transactions} />
      </div>
    </div>
  );
};
export default RecentTransactions;
