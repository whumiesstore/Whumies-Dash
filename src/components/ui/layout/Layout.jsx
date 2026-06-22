import Navbar from "./Navbar";
import "./layout.css";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="layout-main">
        <div className="layout-container">{children}</div>
      </main>
    </>
  );
}

export default Layout;