import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const removeNotify = () => {
  toast.success("Remove from cart successfully!", {
    theme: "green",
    autoClose: 5000,
    style: { background: "white", zIndex: 1, color: "black" },
  });
};

export const addToCartNotify = () => {
  toast.success("Add to cart successfully!", {
    theme: "green",
    autoClose: 5000,
    style: { background: "white", zIndex: 1, color: "black" },
  });
};
export const successfulCheckout = () => {
  toast.success("Checkout successfully!", {
    theme: "green",
    autoClose: 5000,
    style: { background: "white", zIndex: 1, color: "black" },
  });
};
