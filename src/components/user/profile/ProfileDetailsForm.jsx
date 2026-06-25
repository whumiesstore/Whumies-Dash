import { useEffect, useState } from "react";
import { updateProfile, getProfileErrorMessage } from "../../../api/profileApi";
import { validateProfileForm } from "../../../utils/validators/profileValidation";

function getInitialForm(user) {
  return {
    name: user?.name || "",
    businessName: user?.businessName || "",
    sellOnAmazon: Boolean(user?.marketplaces?.amazon),
    sellOnFlipkart: Boolean(user?.marketplaces?.flipkart),
  };
}

function ProfileDetailsForm({ user, onProfileUpdated }) {
  const [form, setForm] = useState(getInitialForm(user));
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setForm(getInitialForm(user));
  }, [user]);

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
      marketplaces:
        field === "sellOnAmazon" || field === "sellOnFlipkart"
          ? ""
          : prev.marketplaces,
    }));

    setServerError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProfileForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    setServerError("");
    setSuccessMessage("");

    try {
      const result = await updateProfile({
        name: form.name.trim(),
        businessName: form.businessName.trim(),
        sellOnAmazon: form.sellOnAmazon,
        sellOnFlipkart: form.sellOnFlipkart,
      });

      onProfileUpdated(result);
      setSuccessMessage(result?.message || "Profile updated successfully.");
    } catch (error) {
      setServerError(getProfileErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="profile-card" onSubmit={handleSubmit}>
      <div className="profile-card-header">
        <h2>Profile Details</h2>
        <p>Update your personal and business information.</p>
      </div>

      {serverError && <div className="profile-alert error">{serverError}</div>}
      {successMessage && (
        <div className="profile-alert success">{successMessage}</div>
      )}

      <div className="profile-field">
        <label>Email Address</label>
        <input type="email" value={user?.email || ""} disabled />
        <small>Email cannot be changed right now.</small>
      </div>

      <div className="profile-field">
        <label>Name</label>
        <input
          type="text"
          value={form.name}
          placeholder="Your name"
          className={errors.name ? "has-error" : ""}
          onChange={(e) => updateForm("name", e.target.value)}
        />
        {errors.name && <small className="profile-error">{errors.name}</small>}
      </div>

      <div className="profile-field">
        <label>Business Name</label>
        <input
          type="text"
          value={form.businessName}
          placeholder="Business name"
          className={errors.businessName ? "has-error" : ""}
          onChange={(e) => updateForm("businessName", e.target.value)}
        />
        {errors.businessName && (
          <small className="profile-error">{errors.businessName}</small>
        )}
      </div>

      <div
        className={`profile-marketplace-box ${
          errors.marketplaces ? "has-error" : ""
        }`}
      >
        <p>Marketplaces you sell on</p>

        <span className="profile-marketplace-helper">
          Please keep at least one marketplace selected so Whumies Dash can
          prepare the right tools and reports for your business.
        </span>

        <label>
          <input
            type="checkbox"
            checked={form.sellOnAmazon}
            onChange={(e) => updateForm("sellOnAmazon", e.target.checked)}
          />
          <span>Amazon</span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.sellOnFlipkart}
            onChange={(e) => updateForm("sellOnFlipkart", e.target.checked)}
          />
          <span>Flipkart</span>
        </label>

        {errors.marketplaces && (
          <small className="profile-error">{errors.marketplaces}</small>
        )}
      </div>

      <button type="submit" className="profile-primary-btn" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}

export default ProfileDetailsForm;
