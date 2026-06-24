import { useState } from "react";
import PasswordInput from "../common/PasswordInput";
import PasswordChecklist from "../common/PasswordChecklist";

import { changePassword, getProfileErrorMessage } from "../../../api/profileApi";
import { validateChangePasswordForm } from "../../../utils/validators/profileValidation";

const initialForm = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

function ChangePasswordForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setServerError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateChangePasswordForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    setServerError("");
    setSuccessMessage("");

    try {
      const result = await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmNewPassword,
      });

      setForm(initialForm);
      setSuccessMessage(result?.message || "Password changed successfully.");
    } catch (error) {
      setServerError(getProfileErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="profile-card" onSubmit={handleSubmit}>
      <div className="profile-card-header">
        <h2>Change Password</h2>
        <p>Use a strong password to keep your account secure.</p>
      </div>

      {serverError && <div className="profile-alert error">{serverError}</div>}
      {successMessage && (
        <div className="profile-alert success">{successMessage}</div>
      )}

      <PasswordInput
        label="Current Password"
        value={form.currentPassword}
        placeholder="Current password"
        autoComplete="current-password"
        error={errors.currentPassword}
        onChange={(value) => updateForm("currentPassword", value)}
      />

      <PasswordInput
        label="New Password"
        value={form.newPassword}
        placeholder="New password"
        autoComplete="new-password"
        error={errors.newPassword}
        onChange={(value) => updateForm("newPassword", value)}
      />

      <PasswordChecklist password={form.newPassword} />

      <PasswordInput
        label="Confirm New Password"
        value={form.confirmNewPassword}
        placeholder="Confirm new password"
        autoComplete="new-password"
        error={errors.confirmNewPassword}
        onChange={(value) => updateForm("confirmNewPassword", value)}
      />

      <button type="submit" className="profile-primary-btn" disabled={isSaving}>
        {isSaving ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
}

export default ChangePasswordForm;
