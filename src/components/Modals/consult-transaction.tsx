import { useEffect } from "react";
import Transaction from "../../models/transactions";
import MyButton from "../Buttons/primary-button";

interface ConsultTransactionModalProps {
  onCloseModal: () => void;
  transactionData: Transaction | null;
}

const ConsultTransactionModal = ({
  transactionData,
  onCloseModal,
}: ConsultTransactionModalProps) => {
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
  }, []);

  return (
    <dialog
      id="consult-transaction-modal"
      className="modal"
      key={transactionData?.id}
    >
      {transactionData && (
        <div className="modal-box max-w-2xl bg-gray-100">
          <div className="flex flex-col gap-5 p-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-600">
                payments
              </span>
              <span className="font-semibold">Amount:</span>
              <span className="text-lg">
                {transactionData.amount.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-600">
                {transactionData.type.toUpperCase() === "INCOME"
                  ? "trending_up"
                  : "trending_down"}
              </span>
              <span className="font-semibold">Type:</span>
              <span
                className={`text-lg ${
                  transactionData.type.toUpperCase() === "INCOME"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transactionData.type}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-gray-600 mt-1">
                format_align_justify
              </span>
              <div>
                <span className="font-semibold">Description:</span>
                <p className="mt-1 text-gray-700">
                  {transactionData.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-center w-full">
              <MyButton
                title="Close"
                type="button"
                onClick={onCloseModal}
                textColour="text-black"
                btnVariant="btn-ghost"
              />
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default ConsultTransactionModal;
