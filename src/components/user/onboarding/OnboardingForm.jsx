import AuthAlert from "../common/AuthAlert";

function OnboardingForm({
  form,
  errors,
  isLoading,
  serverError,
  requiredFields,
  onChange,
  onSubmit,
}) {
  const showNameField = requiredFields?.name;
  const showBusinessNameField = requiredFields?.businessName;
  const showMarketplaceField = requiredFields?.marketplaces;

  return (
    <form className="auth-card onboarding-card" onSubmit={onSubmit}>
      <h2>Complete Your Setup</h2>

      <p className="onboarding-subtitle">
        {showNameField && showBusinessNameField && showMarketplaceField
          ? "Tell us a little about your business to personalize your dashboard."
          : "Just a few details are left. This helps us personalize Whumies Dash for your business."}
      </p>

      <AuthAlert type="error">{serverError}</AuthAlert>

      {!showNameField && !showBusinessNameField && showMarketplaceField && (
        <div className="onboarding-soft-note">
          Your name and business name are already saved. Please select where you
          currently sell so we can set up the right tools for you.
        </div>
      )}

      {showNameField && (
        <div className="auth-field">
          <label>Your Name</label>
          <input
            type="text"
            value={form.name}
            placeholder="Your Name"
            className={errors.name ? "has-error" : ""}
            onChange={(e) => onChange("name", e.target.value)}
          />

          {errors.name && (
            <small className="auth-error-text">{errors.name}</small>
          )}
        </div>
      )}

      {showBusinessNameField && (
        <div className="auth-field">
          <label>Business Name</label>
          <input
            type="text"
            value={form.businessName}
            placeholder="Business Name"
            className={errors.businessName ? "has-error" : ""}
            onChange={(e) => onChange("businessName", e.target.value)}
          />

          {errors.businessName && (
            <small className="auth-error-text">{errors.businessName}</small>
          )}
        </div>
      )}

      {showMarketplaceField && (
        <div className="marketplace-question-box">
          <p>Where do you currently sell?</p>

          <span className="marketplace-helper-text">
            Please select at least one marketplace. Whumies Dash needs this to
            create the right dashboard for you.
          </span>

          <label>
            <input
              type="checkbox"
              checked={form.sellOnAmazon}
              onChange={(e) => onChange("sellOnAmazon", e.target.checked)}
            />
            <span>Amazon</span>
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.sellOnFlipkart}
              onChange={(e) => onChange("sellOnFlipkart", e.target.checked)}
            />
            <span>Flipkart</span>
          </label>

          {errors.marketplaces && (
            <small className="auth-error-text">{errors.marketplaces}</small>
          )}
        </div>
      )}

      {!showNameField && !showBusinessNameField && !showMarketplaceField && (
        <div className="onboarding-soft-note success">
          Your onboarding details are already complete. You can continue to your
          dashboard.
        </div>
      )}

      <button type="submit" className="auth-submit-btn" disabled={isLoading}>
        {isLoading ? "Saving..." : "Complete Setup"}
      </button>
    </form>
  );
}

export default OnboardingForm;
