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
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

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
  }, [transactions, fromDate, toDate, filteredType]);

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
    let tmpFilteredTransactions: Transaction[] = transactions;
    if (fromDate !== "") {
      tmpFilteredTransactions = transactions.filter(
        (elt) => elt.date >= fromDate
      );
    }

    console.log("toDate", toDate);
    if (toDate !== "") {
      tmpFilteredTransactions = tmpFilteredTransactions.filter(
        (elt) => elt.date <= toDate
      );
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
    setFromDate("");
    setToDate("");
    setFilteredType("ALL");
    (document.getElementById("from_date") as HTMLInputElement).value = "";
    (document.getElementById("to_date") as HTMLInputElement).value = "";
  };

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <CreateTransactionModal addNewTransaction={addNewTransaction} />
      <div className="mb-4 flex flex-row justify-between ">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 rounded-md shadow-sm bg-stone-100 p-2">
            {["ALL", "INCOME", "EXPENSE"].map((type) => (
              <MyButton
                key={type}
                title={type.charAt(0) + type.slice(1).toLowerCase()}
                type="button"
                textColour="text-black"
                btnVariant={
                  "btn-ghost " + (filteredType === type ? "bg-stone-200" : "")
                }
                onClick={() => filterTransactions(type)}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-md shadow-sm bg-stone-100 p-2">
            {["From", "To"].map((label) => (
              <label
                key={label}
                className="input flex items-center rounded-md bg-stone-100 text-black"
              >
                <h3 className="pr-2">{label}</h3>
                <span className="material-symbols-outlined text-black">
                  calendar_month
                </span>
                <input
                  type="date"
                  className="w-full"
                  placeholder={`Transaction's date`}
                  id={`${label.toLowerCase()}_date`}
                  name={`${label.toLowerCase()}_date`}
                  onChange={(e) =>
                    label === "From"
                      ? setFromDate(e.target.value)
                      : setToDate(e.target.value)
                  }
                  required
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MyButton
            type="button"
            textColour="text-black"
            btnVariant="btn-ghost bg-stone-100"
            icon="close"
            onClick={resetFilters}
          />
          <div className="divider lg:divider-horizontal"></div>
          <button
            className="btn bg-stone-100 text-black hover:bg-stone-300 border-none flex items-center gap-2"
            onClick={showTransactionModal}
          >
            <span className="material-symbols-outlined">add</span>
            New Transaction
          </button>
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
