import React from "react";

const TransactionModal = () => {
  return (
    <>
      <dialog id="my_modal_4" className="modal">
        <div className="flex gap-4 flex-col modal-box w-8/12 max-w-5xl bg-gray-100">
          <label className="input input-bordered flex bg-white items-center gap-2 shadow-sm ">
            <span className="material-symbols-outlined text-black">
              payments
            </span>
            <input type="text" className="w-full" placeholder="Amount" />
          </label>

          <select className="select select-bordered w-full bg-white shadow-sm">
            <option selected>Income</option>
            <option>Expense</option>
          </select>
          <label className="input input-bordered flex items-center gap-2 bg-white shadow-sm">
            <span className="material-symbols-outlined text-black">
              format_align_justify
            </span>
            <input type="text" className="grow" placeholder="Description" />
          </label>

          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-2">
                <button className="btn btn-ghost text-black">Close</button>
                <button className="btn btn-success text-white">Primary</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TransactionModal;
