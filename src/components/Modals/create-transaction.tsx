import { useActionState, useEffect, useState } from "react";
import Transaction from "../../models/transactions";
import MyButton from "../Buttons/primary-button";

interface CreateTransactionModalProps {
  addNewTransaction?: (newTransaction: Transaction) => void;
  transactionId?: number | null;
  transactionData?: Transaction | null;
}

const CreateTransactionModal = ({
  addNewTransaction,
}: CreateTransactionModalProps) => {
  const [state, formAction] = useActionState(
    async (prevState, formData) => {
      const amount = parseFloat(formData.get("amount"));
      const type = formData.get("type");
      const description = formData.get("description");

      console.log(amount, type, description);

      const response = await fetch(
        "http://localhost:3000/api/v1/transaction/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, type, description }),
        }
      );

      if (response.ok) {
        const newTransaction = await response.json();
        // Assuming you have a state to manage the list of transactions
        addNewTransaction(newTransaction);
        document?.getElementById("create-transaction-modal")?.close();
      } else {
        console.error("Failed to create transaction");
      }

      return { amount, type, description };
    },
    { amount: 0, type: "Income", description: "" }
  );

  const closeModal = () => {
    document?.getElementById("create-transaction-modal")?.close();
  };

  return (
    <dialog id="create-transaction-modal" className="modal">
      <div className="modal-box max-w-2xl bg-gray-100">
        <form action={formAction}>
          <div className="flex gap-4 flex-col ">
            <label className="input input-bordered flex bg-white items-center gap-2 shadow-sm ">
              <span className="material-symbols-outlined text-black">
                payments
              </span>
              <input
                type="text"
                className="w-full"
                placeholder="Amount"
                id="amount"
                name="amount"
                required
              />
            </label>

            <select
              className="select select-bordered w-full bg-white shadow-sm"
              required
              id="type"
              name="type"
            >
              <option>Income</option>
              <option>Expense</option>
            </select>
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
              />
            </label>

            <div className="modal-action flex justify-end w-full">
              <div className="flex">
                <MyButton
                  title="Close"
                  type="button"
                  onClick={closeModal}
                  textColour="text-black"
                  btnVariant="btn-ghost"
                />
              </div>
              <div className="flex-grow-2">
                <MyButton
                  title="Create"
                  type="submit"
                  onClick={closeModal}
                  textColour="text-black"
                  btnVariant="btn-accent"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateTransactionModal;
