import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { marketplaceConfig } from "../../config/MarketplaceConfig";
import sampleSkus from "../../data/sampleSkus.json";

import UploadOrdersReport from "./upload-orders-report/UploadOrdersReport";
import SkuCostModal from "./sku-cost/SkuCostModal";
import UploadPaymentsReport from "./upload-payments-report/UploadPaymentsReport";
import SavingOverlay from "./shared/SavingOverlay";

import "./generateReport.css";

function formatShortMonthDay(date) {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  return `${month} ${day}`;
}

function formatFullDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getMonthDetails(monthParam) {
  const today = new Date();

  const [yearValue, monthValue] = monthParam
    ? monthParam.split("-").map(Number)
    : [today.getFullYear(), today.getMonth()];

  const date = new Date(yearValue, monthValue - 1, 1);

  const monthName = date.toLocaleString("en-US", { month: "long" });
  const shortMonth = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const startDateObject = new Date(year, date.getMonth(), 1);
  const endDateObject = new Date(year, date.getMonth() + 1, 0);

  const startDate = formatFullDate(startDateObject);
  const endDate = formatFullDate(endDateObject);

  const idealPaymentEndDateObject = new Date(year, date.getMonth() + 1, 20);

  const paymentEndDateObject =
    idealPaymentEndDateObject > today ? today : idealPaymentEndDateObject;

  const paymentEndDate = formatFullDate(paymentEndDateObject);

  const paymentUploadLabel = `Upload from ${formatShortMonthDay(
    startDateObject,
  )} to ${formatShortMonthDay(paymentEndDateObject)}`;

  const paymentPeriod = `${shortMonth} - ${paymentEndDateObject.toLocaleString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    },
  )}`;

  const isPaymentRangePartial = idealPaymentEndDateObject > today;

  return {
    monthName,
    shortMonth,
    year,
    displayMonth: `${monthName} ${year}`,

    startDate,
    endDate,

    paymentEndDate,
    paymentUploadLabel,
    paymentPeriod,
    isPaymentRangePartial,
  };
}

function GenerateReportMain() {
  const { firmName, marketplace } = useParams();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState("upload-orders");
  const [showSkuCostModal, setShowSkuCostModal] = useState(false);
  const [isSavingCosts, setIsSavingCosts] = useState(false);

  const decodedFirmName = decodeURIComponent(firmName || "");
  const selectedMarketplace = marketplace?.toLowerCase() || "amazon";

  const config =
    marketplaceConfig[selectedMarketplace] || marketplaceConfig.amazon;

  const monthParam = searchParams.get("month");
  const monthDetails = getMonthDetails(monthParam);

  const handleOrdersUploaded = () => {
    setShowSkuCostModal(true);
  };

  const handleSkuCostsComplete = () => {
    setIsSavingCosts(true);

    // Mock backend save for now.
    // Later replace this with API call to save SKU cost data.
    setTimeout(() => {
      setIsSavingCosts(false);
      setShowSkuCostModal(false);
      setStep("upload-payments");
    }, 1200);
  };

  return (
    <>
      {step === "upload-orders" && (
        <UploadOrdersReport
          firmName={firmName}
          decodedFirmName={decodedFirmName}
          selectedMarketplace={selectedMarketplace}
          config={config}
          monthDetails={monthDetails}
          onOrdersUploaded={handleOrdersUploaded}
        />
      )}

      {step === "upload-payments" && (
        <UploadPaymentsReport
          firmName={firmName}
          decodedFirmName={decodedFirmName}
          selectedMarketplace={selectedMarketplace}
          config={config}
          monthDetails={monthDetails}
        />
      )}

      {showSkuCostModal && (
        <SkuCostModal
          skus={sampleSkus}
          onClose={handleSkuCostsComplete}
          onStartAgain={() => {
            setShowSkuCostModal(false);
            setStep("upload-orders");
          }}
        />
      )}

      {isSavingCosts && <SavingOverlay message="Saving SKU costs..." />}
    </>
  );
}

export default GenerateReportMain;
