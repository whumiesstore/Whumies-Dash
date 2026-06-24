import AuthSidePanel from "./AuthSidePanel";

function AuthLayout({ children }) {
  return (
    <>
      <main className="auth-page">
        <section className="auth-shell">
          <AuthSidePanel />

          <div className="auth-right-panel">{children}</div>
        </section>
      </main>
    </>
  );
}

export default AuthLayout;
