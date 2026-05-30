import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import FirmReports from "./pages/FirmReports";
import MarketplaceReports from "./pages/MarketplaceReports";
import UploadOrdersReport from "./pages/UploadOrdersReport.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:firmName" element={<FirmReports />} />

        <Route
          path="/dashboard/:firmName/:marketplace/generate-report"
          element={<UploadOrdersReport />}
        />

        <Route
          path="/dashboard/:firmName/:marketplace"
          element={<MarketplaceReports />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
