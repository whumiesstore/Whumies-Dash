import { useState } from "react";
import ReportBreadcrumb from "../../shared/ReportBreadcrumb";
import UploadBox from "../../shared/UploadBox";
import UploadErrorModal from "../../shared/UploadErrorModal";
import UploadSuccessModal from "../../shared/UploadSuccessModal";

function UploadOrdersReport({
  firmId,
  firmName,
  selectedMarketplace,
  config,
  monthDetails,
  uploadConfig,
  onOrdersUploaded,
}) {
  const [uploadError, setUploadError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
            ({monthDetails.displayMonth})
          </strong>
        </p>
      </section>

      <section className="generate-report-layout">
        <UploadBox
          config={config}
          uploadConfig={uploadConfig}
          monthDetails={monthDetails}
          showMonthInButton={true}
          validatingMessage="Validating orders file..."
          onUploadSuccess={() => setShowSuccessModal(true)}
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
                <span>▣</span> Set the Date Range
              </h3>

              <p>
                In the report settings, set the date range to cover the{" "}
                <strong>entire month:</strong>
              </p>

              <div className="date-range-boxes">
                <div className="date-box">
                  <span>Start Date</span>
                  <strong>{monthDetails.startDate}</strong>
                </div>

                <div className="date-arrow">→</div>

                <div className="date-box">
                  <span>End Date</span>
                  <strong>{monthDetails.endDate}</strong>
                </div>
              </div>

              <div className="month-pill">
                Reporting month: {monthDetails.displayMonth}
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

      {showSuccessModal && (
        <UploadSuccessModal
          monthDetails={monthDetails}
          title={
            uploadConfig.successTitle || "Orders File Processed Successfully!"
          }
          note={
            uploadConfig.successNote ||
            "Please verify this month before continuing."
          }
          onReupload={() => setShowSuccessModal(false)}
          onContinue={() => {
            setShowSuccessModal(false);
            onOrdersUploaded();
          }}
        />
      )}
    </div>
  );
}

export default UploadOrdersReport;
