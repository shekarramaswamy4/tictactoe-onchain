import { toast } from "react-toastify";

export const errorToast = (text) =>
  toast.error(text, {
    autoClose: 3000,
  });
