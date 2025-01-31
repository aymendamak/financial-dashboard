import { use, useEffect, useState } from "react";
import Transaction from "../../models/transactions";
import ConsultTransactionModal from "../Modals/consult-transaction";

interface TransactionsTableProps {
  data: Transaction[];
  deleteTransaction: (id: number) => void;
}

const TransactionsTable = ({
  data,
  deleteTransaction,
}: TransactionsTableProps) => {
  const [transactionData, setTransactionData] = useState<Transaction | null>(
    null
  );

  const [displayModal, setDisplayModal] = useState(false);

  const handleClickViewTransactionData = (item: Transaction) => {
    setDisplayModal(true);
    setTransactionData(item);
  };

  useEffect(() => {
    if (transactionData) {
      document.getElementById("consult-transaction-modal")?.showModal();
    }
  }, [transactionData, displayModal]);

  const onCloseConsultModal = () => {
    document?.getElementById("consult-transaction-modal")?.close();
    setTransactionData(null);
  };

  return (
    <div className="overflow-x-auto">
      {displayModal && (
        <ConsultTransactionModal
          transactionData={transactionData}
          onCloseModal={onCloseConsultModal}
        />
      )}
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
                  <button
                    className="btn btn-sm btn-ghost btn-square btn-outline"
                    onClick={() => {
                      handleClickViewTransactionData(item);
                    }}
                  >
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
