function AuthAlert({ type = "error", children }) {
  if (!children) return null;

  return <div className={`auth-alert ${type}`}>{children}</div>;
}

export default AuthAlert;
