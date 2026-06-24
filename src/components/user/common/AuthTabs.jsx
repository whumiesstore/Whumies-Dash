function AuthTabs({ activeTab, onChange }) {
  return (
    <div className="auth-tabs">
      <button
        type="button"
        className={activeTab === "register" ? "active" : ""}
        onClick={() => onChange("register")}
      >
        Create Account
      </button>

      <button
        type="button"
        className={activeTab === "login" ? "active" : ""}
        onClick={() => onChange("login")}
      >
        Login
      </button>
    </div>
  );
}

export default AuthTabs;
