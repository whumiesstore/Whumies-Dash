import { getPasswordChecks } from "../../../auth/authValidation";

function PasswordChecklist({ password }) {
  const checks = getPasswordChecks(password);

  const rules = [
    {
      key: "length",
      label: "8-16 characters",
    },
    {
      key: "uppercase",
      label: "One uppercase letter",
    },
    {
      key: "lowercase",
      label: "One lowercase letter",
    },
    {
      key: "number",
      label: "One number",
    },
    {
      key: "special",
      label: "One special character",
    },
  ];

  return (
    <div className="password-checklist">
      {rules.map((rule) => (
        <div
          key={rule.key}
          className={`password-check-item ${
            checks[rule.key] ? "valid" : "invalid"
          }`}
        >
          <span>{checks[rule.key] ? "✓" : "○"}</span>
          {rule.label}
        </div>
      ))}
    </div>
  );
}

export default PasswordChecklist;
