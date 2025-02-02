import { useEffect, useState } from "react";
import TransactionsTable from "../Table/transaction-table";
import CreateTransactionModal from "../Modals/create-transaction";
import Transaction from "../../models/transactions";
import MyButton from "../Buttons/primary-button";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [filteredType, setFilteredType] = useState<string>("ALL");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/transaction/all"
      );
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterTransactions(filteredType);
  }, [transactions]);

  const showTransactionModal = () => {
    (
      document?.getElementById("create-transaction-modal") as HTMLDialogElement
    )?.showModal();
  };

  const addNewTransaction = (newTransaction: Transaction) => {
    console.log("addNewTransaction", newTransaction);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  const filterTransactions = (type: string) => {
    if (type === "ALL") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(
        (elt) => elt.type.toUpperCase() === type.toUpperCase()
      );
      setFilteredTransactions(filtered);
    }
    setFilteredType(type);
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
      <CreateTransactionModal addNewTransaction={addNewTransaction} />
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-md shadow-sm bg-stone-100">
          <MyButton
            title="All"
            type="button"
            textColour="text-black"
            btnVariant={
              "btn-ghost " + (filteredType === "ALL" ? "bg-stone-200" : "")
            }
            onClick={() => filterTransactions("ALL")}
          />
          <MyButton
            title="Income"
            type="button"
            textColour="text-black"
            btnVariant={
              "btn-ghost " + (filteredType === "INCOME" ? "bg-stone-200" : "")
            }
            onClick={() => filterTransactions("INCOME")}
          />
          <MyButton
            title="Expense"
            type="button"
            textColour="text-black"
            btnVariant={
              "btn-ghost " + (filteredType === "EXPENSE" ? "bg-stone-200" : "")
            }
            onClick={() => filterTransactions("EXPENSE")}
          />
        </div>
        <button
          className="btn bg-stone-100 text-black hover:bg-stone-300 border-none"
          onClick={() => showTransactionModal()}
        >
          <span className="material-symbols-outlined">add</span>New Transaction
        </button>
      </div>

      <div className="overflow-x-auto">
        <TransactionsTable
          data={filteredTransactions}
          deleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
};
export default RecentTransactions;
