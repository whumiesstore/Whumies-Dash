import { useState } from "react";
import EyeClosed from "../../ui/icons/EyeClosed";
import EyeOpened from "../../ui/icons/EyeOpened";

function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-field">
      <label>{label}</label>

      <div className={`auth-password-wrap ${error ? "has-error" : ""}`}>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
        />

        <button
          type="button"
          className="auth-eye-btn"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeClosed /> : <EyeOpened />}
        </button>
      </div>

      {error && <small className="auth-error-text">{error}</small>}
    </div>
  );
}

export default PasswordInput;
