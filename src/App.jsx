import { Routes, Route } from "react-router-dom";

import Layout from "./components/ui/layout/Layout";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard";
import FirmReports from "./pages/FirmReports";
import MarketplaceReports from "./pages/MarketplaceReports";
import GenerateReport from "./pages/GenerateReport.jsx";
import ReportDisplay from "./pages/ReportDisplay.jsx";
import "./app.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:firmName" element={<FirmReports />} />

        <Route
          path="/dashboard/:firmName/:marketplace/generate-report"
          element={<GenerateReport />}
        />

        <Route
          path="/dashboard/:firmName/:marketplace/:year/:month"
          element={<ReportDisplay />}
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
