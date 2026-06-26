import { useState } from "react";
import ReportBreadcrumb from "../../shared/ReportBreadcrumb";
import UploadBox from "../../shared/UploadBox";
import UploadErrorModal from "../../shared/UploadErrorModal";

function UploadPaymentsReport({
  firmId,
  firmName,
  selectedMarketplace,
  config,
  monthDetails,
  uploadConfig,
  reportMonthDetails,
  onPaymentsUploaded,
}) {
  const [uploadError, setUploadError] = useState(null);

  const displayMonthDetails = reportMonthDetails || monthDetails;

  const uploadButtonText =
    uploadConfig.customUploadButtonText ||
    `${uploadConfig.uploadButtonText} — ${displayMonthDetails.displayMonth}`;

  return (
    <div className="generate-report-page">
      <ReportBreadcrumb
        firmId={firmId}
        firmName={firmName}
        selectedMarketplace={selectedMarketplace}
        marketplaceTitle={config.title}
        monthDetails={monthDetails}
        color={config.color}
      />

      <section className="generate-report-heading">
        <h1>{uploadConfig.heading}</h1>

        <p>
          {uploadConfig.description}{" "}
          <strong style={{ color: config.color }}>
            ({displayMonthDetails.displayMonth})
          </strong>
        </p>
      </section>

      <section className="generate-report-layout">
        <UploadBox
          config={config}
          uploadConfig={{
            ...uploadConfig,
            uploadButtonText,
          }}
          monthDetails={displayMonthDetails}
          showMonthInButton={false}
          validatingMessage={`Validating ${
            uploadConfig.validatingLabel || "payments file"
          }...`}
          onUploadSuccess={onPaymentsUploaded}
          onUploadError={(error) => setUploadError(error)}
        />

        <aside className="instruction-card">
          <div className="instruction-step">
            <div className="step-number">1</div>

            <div className="step-content">
              <h3>
                <span>↗</span> {uploadConfig.portalStepTitle}
              </h3>

              <p>{uploadConfig.portalStepDescription}</p>

              <a
                href={uploadConfig.reportUrl || config.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="instruction-link"
              >
                {uploadConfig.portalButtonText} <span>↗</span>
              </a>
            </div>
          </div>

          <div className="instruction-divider" />

          <div className="instruction-step">
            <div className="step-number">2</div>

            <div className="step-content">
              <h3>
                <span>▣</span>{" "}
                {uploadConfig.dateStepTitle || "Set the Date Range"}
              </h3>

              <p>{uploadConfig.dateStepDescription}</p>

              <div className="date-range-boxes">
                <div className="date-box">
                  <span>Start Date</span>
                  <strong>{displayMonthDetails.startDate}</strong>
                </div>

                <div className="date-arrow">→</div>

                <div className="date-box">
                  <span>End Date</span>
                  <strong>
                    {uploadConfig.usePaymentEndDate
                      ? monthDetails.paymentEndDate
                      : displayMonthDetails.endDate}
                  </strong>
                </div>
              </div>

              {uploadConfig.extraNote && (
                <div className="extra-days-note">
                  <strong>ⓘ {uploadConfig.extraNoteTitle}</strong>
                  <p>{uploadConfig.extraNote}</p>
                </div>
              )}

              <div className="month-pill">
                {uploadConfig.monthPillPrefix}:{" "}
                {uploadConfig.usePaymentPeriod
                  ? monthDetails.paymentPeriod
                  : displayMonthDetails.displayMonth}
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
