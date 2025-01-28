import React, { Dispatch } from "react";
import { useActionState, useFormStatus } from "react";
import Transaction from "../../models/transactions";

interface TransactionModalProps {
  addNewTransaction: (newTransaction: Transaction) => void;
}

const TransactionModal = ({ addNewTransaction }: TransactionModalProps) => {
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
        document?.getElementById("my_modal_4")?.close();
      } else {
        console.error("Failed to create transaction");
      }

      return { amount, type, description };
    },
    { amount: 0, type: "Income", description: "" }
  );

  const closeModal = () => {
    document?.getElementById("my_modal_4")?.close();
  };

  return (
    <>
      <dialog id="my_modal_4" className="modal">
        <div className="flex gap-4 flex-col modal-box max-w-2xl bg-gray-100">
          <form action={formAction}>
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
              <option selected>Income</option>
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

            <div className="modal-action">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn btn-ghost text-black"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-info text-white">
                  Primary
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default TransactionModal;
