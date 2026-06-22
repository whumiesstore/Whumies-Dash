import { useEffect } from "react";
import OrderViewHeader from "./OrderViewHeader";
import OrderViewMeta from "./OrderViewMeta";
import OrderViewSummaryCards from "./OrderViewSummaryCards";
import PaymentEntries from "./PaymentEntries";
import "./orderViewModal.css";

function OrderViewModal({ order, onClose, selectedMarketplace = "amazon" }) {
  useEffect(() => {
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, []);

  const purchaseCost =
    order.status === "returned" ||
    order.status === "rto" ||
    order.status === "cancelled"
      ? 0
      : Number(order.purchaseCost || 0);

  const settlement = Number(order.settlement || 0);
  const profit = settlement - purchaseCost;

  return (
    <div className="order-view-overlay" onClick={onClose}>
      <div className="order-view-modal" onClick={(e) => e.stopPropagation()}>
        <OrderViewHeader
          order={order}
          selectedMarketplace={selectedMarketplace}
        />

        <div className="order-view-scroll-body">
          <OrderViewMeta order={order} />

          <OrderViewSummaryCards
            settlement={settlement}
            purchaseCost={purchaseCost}
            profit={profit}
          />

          <PaymentEntries
            entries={order.paymentEntries || []}
            selectedMarketplace={selectedMarketplace}
          />
        </div>

        <div className="order-view-footer">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderViewModal;
