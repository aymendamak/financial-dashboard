import { useEffect, useState } from "react";
import Transaction from "../../models/transactions";
import MyButton from "../Buttons/primary-button";

interface UpdateTransactionModalProps {
  updateTransactions?: (newTransaction: Transaction) => void;
  transactionData?: Transaction | null;
  onCloseModal: () => void;
}

const UpdateTransactionModal = ({
  updateTransactions,
  transactionData,
  onCloseModal,
}: UpdateTransactionModalProps) => {
  let myForm = new FormData();

  const [amount, setAmount] = useState(transactionData?.amount);
  const [type, setType] = useState(transactionData?.type);
  const [date, setDate] = useState(transactionData?.date);
  const [description, setDescription] = useState(transactionData?.description);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  });

  const updateTransaction = async (newTransaction: Transaction) => {
    const updatedTransaction = await fetch(
      `http://localhost:3000/api/v1/transaction/${transactionData?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      }
    );

    if (updatedTransaction.ok) {
      const updatedTransactionJson = await updatedTransaction.json();
      if (updatedTransaction && updateTransactions)
        updateTransactions(updatedTransactionJson);
    } else {
      console.error("Failed to update transaction");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    myForm = new FormData(e.currentTarget);
    const updatedTransaction: Transaction = {
      id: Math.random(),
      amount: Number(myForm.get("amount")),
      type: myForm.get("type") as string,
      date: myForm.get("date") as string,
      createdAt: new Date().toString(),
      description: myForm.get("description") as string,
    };
    updateTransaction(updatedTransaction);
  };

  return (
    <dialog
      id="update-transaction-modal"
      className="modal"
      key={transactionData?.id}
    >
      {"transactionData " + transactionData?.id}
      {transactionData && (
        <div className="modal-box max-w-2xl bg-gray-100">
          <form onSubmit={handleFormSubmit}>
            <div className="flex gap-4 flex-col ">
              <label className="input input-bordered flex bg-white items-center gap-2 shadow-sm ">
                <span className="material-symbols-outlined text-black">
                  payments
                </span>
                <input
                  type="text"
                  className="w-full"
                  placeholder={transactionData.amount.toString()}
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => {
                    myForm.set("amount", e.target.value);
                    setAmount(parseFloat(e.target.value));
                  }}
                  required
                />
              </label>

              <select
                className="select select-bordered w-full bg-white shadow-sm"
                required
                id="type"
                name="type"
                value={type}
                onChange={(e) => {
                  myForm.set("type", e.target.value);
                  setType(e.target.value);
                }}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <label className="input input-bordered flex bg-white items-center gap-2 shadow-sm ">
                <span className="material-symbols-outlined text-black">
                  calendar_month
                </span>
                <input
                  type="date"
                  className="w-full"
                  placeholder="Transaction's date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => {
                    myForm.set("date", e.target.value);
                    setDate(e.target.value);
                  }}
                  required
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 bg-white shadow-sm">
                <span className="material-symbols-outlined text-black">
                  format_align_justify
                </span>
                <input
                  type="text"
                  className="grow"
                  placeholder="Description"
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    myForm.set("description", e.target.value);
                    setDescription(e.target.value);
                  }}
                />
              </label>

              <div className="modal-action flex justify-end w-full">
                <div className="flex">
                  <MyButton
                    title="Close"
                    type="button"
                    onClick={onCloseModal}
                    textColour="text-black"
                    btnVariant="btn-ghost"
                  />
                </div>
                <div className="flex-grow-2">
                  <MyButton
                    title="Update"
                    type="submit"
                    textColour="text-black"
                    btnVariant="btn-accent"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default UpdateTransactionModal;
