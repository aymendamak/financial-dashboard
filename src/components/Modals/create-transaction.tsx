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
  let myForm = new FormData();

  const resetForm = () => {
    (document.getElementById("amount") as HTMLInputElement).value = "";
    (document.getElementById("type") as HTMLSelectElement).value = "";
    (document.getElementById("date") as HTMLInputElement).value = "";
    (document.getElementById("description") as HTMLInputElement).value = "";
  };

  const createNewTransaction = async (newTransaction: Transaction) => {
    const response = await fetch(
      "http://localhost:3000/api/v1/transaction/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      }
    );
    if (response.ok) {
      const newTransaction = await response.json();
      resetForm();
      if (addNewTransaction) {
        addNewTransaction(newTransaction);
      }
      (
        document?.getElementById(
          "create-transaction-modal"
        ) as HTMLDialogElement
      )?.close();
    } else {
      console.error("Failed to create transaction");
    }
  };

  const closeModal = () => {
    (
      document?.getElementById("create-transaction-modal") as HTMLDialogElement
    )?.close();
  };

  const handFormSubmit = (e) => {
    e.preventDefault();
    myForm = new FormData(e.currentTarget);
    const newTransaction: Transaction = {
      id: Math.random(),
      amount: Number(myForm.get("amount")),
      type: myForm.get("type") as string,
      date: myForm.get("date") as string,
      createdAt: new Date().toString(),
      description: myForm.get("description") as string,
    };
    createNewTransaction(newTransaction);
  };

  return (
    <dialog id="create-transaction-modal" className="modal">
      <div className="modal-box max-w-2xl bg-gray-100">
        <form onSubmit={handFormSubmit}>
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
