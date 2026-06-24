import PasswordInput from "../common/PasswordInput";
import PasswordChecklist from "../common/PasswordChecklist";
import AuthAlert from "../common/AuthAlert";

function CreateAccountForm({
  form,
  errors,
  isLoading,
  serverError,
  onChange,
  onSubmit,
}) {
  return (
    <form className="auth-form-inner" onSubmit={onSubmit}>
      <AuthAlert type="error">{serverError}</AuthAlert>

      <div className="auth-field">
        <label>Email Address</label>
        <input
          type="email"
          value={form.email}
          placeholder="Email Address"
          autoComplete="email"
          className={errors.email ? "has-error" : ""}
          onChange={(e) => onChange("email", e.target.value)}
        />

        {errors.email && (
          <small className="auth-error-text">{errors.email}</small>
        )}
      </div>

      <PasswordInput
        label="Password"
        value={form.password}
        placeholder="Password"
        autoComplete="new-password"
        error={errors.password}
        onChange={(value) => onChange("password", value)}
      />

      <PasswordChecklist password={form.password} />

      <PasswordInput
        label="Confirm Password"
        value={form.confirmPassword}
        placeholder="Confirm Password"
        autoComplete="new-password"
        error={errors.confirmPassword}
        onChange={(value) => onChange("confirmPassword", value)}
      />

      <button type="submit" className="auth-submit-btn" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="auth-terms">
        By signing in, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
}

export default CreateAccountForm;
