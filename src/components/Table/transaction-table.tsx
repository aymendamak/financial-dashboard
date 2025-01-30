import Transaction from "../../models/transactions";

interface TransactionsTableProps {
  data: Transaction[];
  deleteTransaction: (id: number) => void;
}

const TransactionsTable = ({
  data,
  deleteTransaction,
}: TransactionsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
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
        <tbody>
          {data.map((item: Transaction, index) => (
            <tr className="text-sm font-normal text-stone-500" key={index}>
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{item.type}</td>
              <td className="px-4 py-2">{item.createdAt}</td>
              <td className="px-4 py-2">{item.description}</td>
              <th>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-info btn-square btn-outline">
                    <span className="material-symbols-outlined">draft</span>
                  </button>
                  <button className="btn btn-sm btn-warning btn-square btn-outline">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    className="btn btn-sm btn-error btn-square btn-outline"
                    onClick={() => deleteTransaction(item.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
