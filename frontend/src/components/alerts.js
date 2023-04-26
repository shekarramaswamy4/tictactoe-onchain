import { toast } from "react-toastify";

export const errorToast = (text) =>
  toast.error(text, {
    autoClose: 3000,
  });

export const transactionToast = (txHash, fn) => {
  toast.promise(fn, {
    success: {
      render({ data }) {
        return `Success!`;
      },
      autoClose: 3000,
      pauseOnHover: false,
    },
    pending: `Waiting for txn ${txHash} to confirm`,
    error: {
      render({ data }) {
        return `Error confirming txn: ${data.message}!`;
      },
      autoClose: 3000,
      pauseOnHover: false,
    },
  });
};
