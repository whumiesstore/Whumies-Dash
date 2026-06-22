import { useState } from "react";
import ReportBreadcrumb from "../shared/ReportBreadcrumb";
import UploadBox from "../shared/UploadBox";
import UploadErrorModal from "../shared/UploadErrorModal";

function UploadPaymentsReport({
  firmName,
  decodedFirmName,
  selectedMarketplace,
  config,
  monthDetails,
  onPaymentsUploaded,
}) {
  const [uploadError, setUploadError] = useState(null);

  const paymentConfig = config.upload.payments;

  return (
    <div className="generate-report-page">
      <ReportBreadcrumb
        firmName={firmName}
        decodedFirmName={decodedFirmName}
        selectedMarketplace={selectedMarketplace}
        marketplaceTitle={config.title}
        monthDetails={monthDetails}
        color={config.color}
      />

      <section className="generate-report-heading">
        <h1>Upload Your {paymentConfig.reportName}</h1>
        <p>
          Now download the payment settlements report from {config.title} and
          upload it here.{" "}
          <strong style={{ color: config.color }}>
            ({monthDetails.displayMonth})
          </strong>
        </p>
      </section>

      <section className="generate-report-layout">
        <UploadBox
          config={config}
          uploadConfig={{
            ...paymentConfig,
            uploadButtonText: monthDetails.paymentUploadLabel,
            dragDropText: `or drag & drop your payments ${paymentConfig.acceptedFileLabel} file here`,
          }}
          monthDetails={monthDetails}
          showMonthInButton={false}
          validatingMessage="Validating payments file..."
          onUploadSuccess={onPaymentsUploaded}
          onUploadError={(error) => setUploadError(error)}
        />

        <aside className="instruction-card">
          <div className="instruction-step">
            <div className="step-number">1</div>

            <div className="step-content">
              <h3>
                <span>↗</span> {paymentConfig.portalStepTitle}
              </h3>

              <p>{paymentConfig.portalStepDescription}</p>

              <a
                href={paymentConfig.reportUrl || config.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="instruction-link"
              >
                {paymentConfig.portalButtonText} <span>↗</span>
              </a>
            </div>
          </div>

          <div className="instruction-divider" />

          <div className="instruction-step">
            <div className="step-number">2</div>

            <div className="step-content">
              <h3>
                <span>▣</span> Set the Date Range
              </h3>

              <p>
                Set the date range as shown below. The extra 20 days into the
                next month helps capture returns and settlements from the report
                month.
                {monthDetails.isPaymentRangePartial && (
                  <>
                    {" "}
                    Since the full 20-day period is not complete yet, select
                    data only up to today.
                  </>
                )}
              </p>

              <div className="date-range-boxes">
                <div className="date-box">
                  <span>Start Date</span>
                  <strong>{monthDetails.startDate}</strong>
                </div>

                <div className="date-arrow">→</div>

                <div className="date-box">
                  <span>End Date</span>
                  <strong>{monthDetails.paymentEndDate}</strong>
                </div>
              </div>

              <div className="extra-days-note">
                <strong>ⓘ Why Additional 20 days?</strong>
                <p>
                  Amazon settles returns and refunds over the following weeks.
                  Including 20 extra days ensures your report month’s returns
                  are fully accounted for and the profit calculation is
                  accurate.
                </p>
              </div>

              <div className="month-pill">
                Reporting period: {monthDetails.paymentPeriod}
              </div>
            </div>
          </div>
        </aside>
      </section>

      {uploadError && (
        <UploadErrorModal
          title={uploadError.title}
          message={uploadError.message}
          detail={uploadError.detail}
          onClose={() => setUploadError(null)}
        />
      )}
    </div>
  );
}

export default UploadPaymentsReport;
