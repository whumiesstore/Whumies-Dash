import AuthAlert from "../common/AuthAlert";

function OnboardingForm({
  form,
  errors,
  isLoading,
  serverError,
  onChange,
  onSubmit,
}) {
  return (
    <form className="auth-card onboarding-card" onSubmit={onSubmit}>
      <h2>Complete Your Profile</h2>

      <p className="onboarding-subtitle">
        Tell us a little about your business to personalize your dashboard.
      </p>

      <AuthAlert type="error">{serverError}</AuthAlert>

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

      <div className="marketplace-question-box">
        <p>Where do you currently sell?</p>

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
      </div>

      <button type="submit" className="auth-submit-btn" disabled={isLoading}>
        {isLoading ? "Saving..." : "Complete Profile"}
      </button>
    </form>
  );
}

export default OnboardingForm;
