import { useEffect, useState } from "react";

interface Transaction {
  id: number;
  amount: number;
  type: string;
  createdAt: string;
  description: string;
}

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
          {" "}
          See all{" "}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <TableHead />
          <tbody>
            {transactions.map((item: Transaction, index) => (
              <Transaction key={index} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Transaction ID</th>
        <th className="text-start p-1.5">Amount</th>
        <th className="text-start p-1.5">Type</th>
        <th className="text-start p-1.5">Created At</th>
        <th className="text-start p-1.5">Description</th>
        <th className="text-start p-1.5">Actions</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const Transaction = ({
  id,
  amount,
  type,
  createdAt,
  description,
}: Transaction) => {
  return (
    <tr className="text-sm font-normal text-stone-500">
      <td className="px-4 py-2">{id}</td>
      <td className="px-4 py-2">{amount.toFixed(2)}</td>
      <td className="px-4 py-2">{type}</td>
      <td className="px-4 py-2">{createdAt}</td>
      <td className="px-4 py-2">{description}</td>
      <th>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-square btn-outline">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="btn btn-sm btn-error btn-square">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </th>
    </tr>
  );
};
export default RecentTransactions;
