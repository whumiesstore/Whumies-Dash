import { useState } from "react";
import ReportBreadcrumb from "../../shared/ReportBreadcrumb";
import UploadBox from "../../shared/UploadBox";
import UploadErrorModal from "../../shared/UploadErrorModal";

function UploadAdsReport({
  firmId,
  firmName,
  selectedMarketplace,
  config,
  monthDetails,
  reportMonthDetails,
  uploadConfig,
  onAdsUploaded,
  onSkipAds,
}) {
  const [uploadError, setUploadError] = useState(null);

  const displayMonthDetails = reportMonthDetails || monthDetails;

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
        <h1>
          {uploadConfig.heading}{" "}
          <span className="optional-heading-text">
            {uploadConfig.optionalText}
          </span>
        </h1>

        <p>
          {uploadConfig.description}{" "}
          <strong style={{ color: config.color }}>
            ({displayMonthDetails.displayMonth})
          </strong>
        </p>
      </section>

      <section className="generate-report-layout">
        <div className="ads-upload-left">
          <UploadBox
            config={config}
            uploadConfig={{
              ...uploadConfig,
              uploadButtonText:
                uploadConfig.uploadButtonText ||
                `Upload Ads Report — ${displayMonthDetails.displayMonth}`,
            }}
            monthDetails={displayMonthDetails}
            showMonthInButton={false}
            validatingMessage={`Validating ${
              uploadConfig.validatingLabel || "ads report"
            }...`}
            onUploadSuccess={onAdsUploaded}
            onUploadError={(error) => setUploadError(error)}
          />

          <button
            type="button"
            className="skip-ads-report-btn"
            onClick={onSkipAds}
          >
            {uploadConfig.skipButtonText ||
              "⊘ I don't run ads — skip this step"}
          </button>
        </div>

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
                {uploadConfig.dateStepTitle ||
                  "Set the Date Range — Analysis Month"}
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
                  <strong>{displayMonthDetails.endDate}</strong>
                </div>
              </div>

              <div className="month-pill">
                {uploadConfig.monthPillPrefix || "Ads Report"}:{" "}
                {displayMonthDetails.displayMonth}
              </div>
            </div>
          </div>

          {uploadConfig.footerNote && (
            <>
              <div className="instruction-divider" />

              <div className="instruction-footer-note">
                {uploadConfig.footerNote}
              </div>
            </>
          )}
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

export default UploadAdsReport;
