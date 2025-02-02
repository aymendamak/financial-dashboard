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
  const [filteredDate, setFilteredDate] = useState<string>("");

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
  }, [transactions, filteredDate]);

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
    let tmpFilteredTransactions: Transaction[] = [];
    if (filteredDate !== "") {
      tmpFilteredTransactions = transactions.filter(
        (elt) => elt.date <= filteredDate
      );
    } else {
      tmpFilteredTransactions = transactions;
    }

    if (type === "ALL") {
      setFilteredTransactions(tmpFilteredTransactions);
    } else {
      const newFilteredTransactions = tmpFilteredTransactions.filter(
        (elt) => elt.type.toUpperCase() === type.toUpperCase()
      );
      setFilteredTransactions(newFilteredTransactions);
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

  const resetFilters = () => {
    setFilteredDate("");
    setFilteredType("ALL");
    (document.getElementById("inf_date") as HTMLInputElement).value = "";
  };

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <CreateTransactionModal addNewTransaction={addNewTransaction} />
      <div className=" flex flex-row justify-between ">
        <div className="mb-4 flex items-center gap-4">
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
                "btn-ghost " +
                (filteredType === "EXPENSE" ? "bg-stone-200" : "")
              }
              onClick={() => filterTransactions("EXPENSE")}
            />
          </div>
          <div className="">
            <label className="input flex items-center rounded-md bg-stone-100 text-black">
              <span className="material-symbols-outlined text-black">
                calendar_month
              </span>
              <input
                type="date"
                className="w-full"
                placeholder="Transaction's date"
                id="inf_date"
                name="inf_date"
                onChange={(e) => setFilteredDate(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <div className="mb-4 flex flex-row items-center gap-1">
          <div className="flex items-center ">
            <MyButton
              type="button"
              textColour="text-black"
              btnVariant={"btn-ghost bg-stone-100 "}
              icon="close"
              onClick={() => resetFilters()}
            />
          </div>

          <div className="divider lg:divider-horizontal"></div>
          <div className="flex items-center justify-end">
            <button
              className="btn bg-stone-100 text-black hover:bg-stone-300 border-none"
              onClick={() => showTransactionModal()}
            >
              <span className="material-symbols-outlined">add</span>New
              Transaction
            </button>
          </div>
        </div>
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
