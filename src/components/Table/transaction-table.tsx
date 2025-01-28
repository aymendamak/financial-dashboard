import Transaction from "../../models/transactions";

interface TransactionsTableProps {
  data: Transaction[];
}

const TransactionsTable = ({ data }: TransactionsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <TableHead />
        <tbody>
          {data.map((item: Transaction, index) => (
            <TransactionTr key={index} {...item} />
          ))}
        </tbody>
      </table>
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

const TransactionTr = ({
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
          <button className="btn btn-sm btn-primary btn-square btn-outline">
            <span className="material-symbols-outlined">draft</span>
          </button>
          <button className="btn btn-sm btn-info btn-square btn-outline">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="btn btn-sm btn-error btn-square btn-outline">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </th>
    </tr>
  );
};

export default TransactionsTable;
