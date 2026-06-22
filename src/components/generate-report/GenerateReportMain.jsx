import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { marketplaceConfig } from "../../config/MarketplaceConfig";
import sampleSkus from "../../data/sampleSkus.json";

import UploadOrdersReport from "./steps/upload-orders-report/UploadOrdersReport";
import SkuCostModal from "./steps/sku-cost/SkuCostModal";
import UploadPaymentsReport from "./steps/upload-payments-report/UploadPaymentsReport";
import UploadAdsReport from "./steps/upload-ads-report/UploadAdsReport";
import SavingOverlay from "./shared/SavingOverlay";
import ReportReady from "./steps/report-ready/ReportReady";

import { formatShortMonthDay, formatFullDate } from "../../utils/formatters";

import "./generateReport.css";

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

  const nextMonthStartObject = new Date(year, date.getMonth() + 1, 1);
  const nextMonthEndObject = new Date(year, date.getMonth() + 1, 20);

  const nextMonthName = nextMonthStartObject.toLocaleString("en-US", {
    month: "long",
  });

  const nextShortMonth = nextMonthStartObject.toLocaleString("en-US", {
    month: "short",
  });

  const nextYear = nextMonthStartObject.getFullYear();

  const idealPaymentEndDateObject = new Date(year, date.getMonth() + 1, 20);

  const paymentEndDateObject =
    idealPaymentEndDateObject > today ? today : idealPaymentEndDateObject;

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
    monthNumber: date.getMonth() + 1,
    monthName,
    shortMonth,
    year,
    displayMonth: `${monthName} ${year}`,

    startDate: formatFullDate(startDateObject),
    endDate: formatFullDate(endDateObject),

    startDateObject,
    endDateObject,

    paymentEndDate: formatFullDate(paymentEndDateObject),
    paymentUploadLabel,
    paymentPeriod,
    isPaymentRangePartial,

    nextMonth: {
      monthName: nextMonthName,
      shortMonth: nextShortMonth,
      year: nextYear,
      displayMonth: `${nextMonthName} ${nextYear}`,
      startDate: formatFullDate(nextMonthStartObject),
      endDate: formatFullDate(nextMonthEndObject),
      startDateObject: nextMonthStartObject,
      endDateObject: nextMonthEndObject,
    },
  };
}

function GenerateReportMain() {
  const { firmName, marketplace } = useParams();
  const [searchParams] = useSearchParams();

  const decodedFirmName = decodeURIComponent(firmName || "");
  const selectedMarketplace = marketplace?.toLowerCase() || "amazon";

  const config =
    marketplaceConfig[selectedMarketplace] || marketplaceConfig.amazon;

  const flow = config.flow || marketplaceConfig.amazon.flow;

  const [step, setStep] = useState(flow[0] || "upload-orders-report");
  const [showSkuCostModal, setShowSkuCostModal] = useState(false);
  const [isSavingCosts, setIsSavingCosts] = useState(false);
  const [adsReportStatus, setAdsReportStatus] = useState("not-started");

  const monthParam = searchParams.get("month");
  const monthDetails = getMonthDetails(monthParam);

  const goToStep = (nextStep) => {
    if (!nextStep) return;

    if (nextStep === "sku-cost") {
      setShowSkuCostModal(true);
      return;
    }

    setStep(nextStep);
  };

  const goToNextStep = (currentStep = step) => {
    const currentIndex = flow.indexOf(currentStep);
    const nextStep = flow[currentIndex + 1];

    goToStep(nextStep);
  };

  const handleOrdersUploaded = () => {
    goToNextStep("upload-orders-report");
  };

  const handleAmazonPaymentsUploaded = () => {
    goToNextStep("upload-amazon-payments-report");
  };

  const handleFlipkartPayments1Uploaded = () => {
    goToNextStep("upload-flipkart-payments-report-1");
  };

  const handleFlipkartPayments2Uploaded = () => {
    goToNextStep("upload-flipkart-payments-report-2");
  };

  const handleFlipkartAdsUploaded = () => {
    setAdsReportStatus("uploaded");
    goToNextStep("upload-flipkart-ads-report");
  };

  const handleFlipkartAdsSkipped = () => {
    setAdsReportStatus("skipped");
    goToNextStep("upload-flipkart-ads-report");
  };

  const handleSkuCostsComplete = () => {
    setIsSavingCosts(true);

    // Mock backend save for now.
    // Later replace this with API call to save SKU cost data.
    setTimeout(() => {
      setIsSavingCosts(false);
      setShowSkuCostModal(false);
      goToNextStep("sku-cost");
    }, 1200);
  };

  const handleStartAgain = () => {
    setShowSkuCostModal(false);
    setIsSavingCosts(false);
    setAdsReportStatus("not-started");
    setStep(flow[0] || "upload-orders-report");
  };

  return (
    <>
      {step === "upload-orders-report" && (
        <UploadOrdersReport
          firmName={firmName}
          decodedFirmName={decodedFirmName}
          selectedMarketplace={selectedMarketplace}
          config={config}
          monthDetails={monthDetails}
          uploadConfig={config.upload.orders}
          onOrdersUploaded={handleOrdersUploaded}
        />
      )}

      {step === "upload-amazon-payments-report" && (
        <UploadPaymentsReport
          firmName={firmName}
          decodedFirmName={decodedFirmName}
          selectedMarketplace={selectedMarketplace}
          config={config}
          monthDetails={monthDetails}
          uploadConfig={config.upload.payments}
          reportMonthDetails={monthDetails}
          onPaymentsUploaded={handleAmazonPaymentsUploaded}
        />
      )}

      {step === "upload-flipkart-payments-report-1" && (
        <UploadPaymentsReport
          firmName={firmName}
          decodedFirmName={decodedFirmName}
          selectedMarketplace={selectedMarketplace}
          config={config}
          monthDetails={monthDetails}
          uploadConfig={config.upload.payments1}
          reportMonthDetails={monthDetails}
          onPaymentsUploaded={handleFlipkartPayments1Uploaded}
        />
      )}

      {step === "upload-flipkart-payments-report-2" && (
        <UploadPaymentsReport
          firmName={firmName}
          decodedFirmName={decodedFirmName}
          selectedMarketplace={selectedMarketplace}
          config={config}
          monthDetails={monthDetails}
          uploadConfig={config.upload.payments2}
          reportMonthDetails={monthDetails.nextMonth}
          onPaymentsUploaded={handleFlipkartPayments2Uploaded}
        />
      )}

      {step === "upload-flipkart-ads-report" && (
        <UploadAdsReport
          firmName={firmName}
          decodedFirmName={decodedFirmName}
          selectedMarketplace={selectedMarketplace}
          config={config}
          monthDetails={monthDetails}
          uploadConfig={config.upload.ads}
          reportMonthDetails={monthDetails}
          onAdsUploaded={handleFlipkartAdsUploaded}
          onSkipAds={handleFlipkartAdsSkipped}
        />
      )}

      {step === "report-ready" && (
        <ReportReady
          firmName={firmName}
          decodedFirmName={decodedFirmName}
          selectedMarketplace={selectedMarketplace}
          config={config}
          monthDetails={monthDetails}
          nextMonthDetails={monthDetails.nextMonth}
          skuCount={sampleSkus.length}
          adsReportStatus={adsReportStatus}
        />
      )}

      {showSkuCostModal && (
        <SkuCostModal
          skus={sampleSkus}
          selectedMarketplace={selectedMarketplace}
          onClose={handleSkuCostsComplete}
          onStartAgain={handleStartAgain}
        />
      )}

      {isSavingCosts && <SavingOverlay message="Saving SKU costs..." />}
    </>
  );
}

export default GenerateReportMain;
