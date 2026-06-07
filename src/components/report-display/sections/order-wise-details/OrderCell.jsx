import { useState } from "react";
import CopyIcon from "../../../ui/icons/CopyIcon";
import CheckIcon from "../../../ui/icons/CheckIcon";

function OrderCell({ order }) {
  const [isCopied, setIsCopied] = useState(null);

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(null);
      }, 1200);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <span className="order-id-cell">
      {order.orderId}
      <button
        type="button"
        onClick={() => copyText(order.orderId)}
        aria-label="Copy order id"
      >
        {isCopied ? (
          <CheckIcon fill="#2f8f46" width={13} height={13} />
        ) : (
          <CopyIcon fill="#777777" width={13} height={13} />
        )}
      </button>
    </span>
  );
}

export default OrderCell;
