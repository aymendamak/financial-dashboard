import { useEffect, useState } from "react";
import TransactionsTable from "../Table/transaction-table";
import TransactionModal from "../Modals/transaction-modal";
import Transaction from "../../models/transactions";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/transaction/all"
      );
      const data = await response.json();
      setTransactions(data);
    };
    fetchData();
  }, []);

  const showTransactionModal = () => {
    document?.getElementById("my_modal_4")?.showModal();
  };

  const addNewTransaction = (newTransaction: Transaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  const deleteTransaction = async (id: number) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/transaction/${id}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );

      setTransactions(updatedTransactions);
    }
  };

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <TransactionModal addNewTransaction={addNewTransaction} />
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5"></h3>
        <button
          className="btn btn-ghost"
          onClick={() => showTransactionModal()}
        >
          <span className="material-symbols-outlined">add</span>New Transaction
        </button>
      </div>

      <div className="overflow-x-auto">
        <TransactionsTable
          data={transactions}
          deleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
};
export default RecentTransactions;
