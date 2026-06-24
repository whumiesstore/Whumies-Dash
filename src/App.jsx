import { Routes, Route } from "react-router-dom";

import Layout from "./components/ui/layout/Layout";

import ProtectedRoute from "./auth/ProtectedRoute";
import PublicOnlyRoute from "./auth/PublicOnlyRoute";
import OnboardingRoute from "./auth/OnboardingRoute";

import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/login/AuthPage.jsx";
import OnboardingPage from "./pages/onboarding/OnboardingPage.jsx";

import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import FirmReportsPage from "./pages/dashboard/FirmReportsPage.jsx";
import MarketplaceReportsPage from "./pages/dashboard/MarketplaceReportsPage.jsx";
import GenerateReportPage from "./pages/dashboard/GenerateReportPage.jsx";
import ReportDisplayPage from "./pages/dashboard/ReportDisplayPage.jsx";

import "./app.css";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<HomePage />} />

        {/* Login/Register route */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<AuthPage />} />
        </Route>

        {/* Onboarding route */}
        <Route element={<OnboardingRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/:firmName" element={<FirmReportsPage />} />

          <Route
            path="/dashboard/:firmName/:marketplace/generate-report"
            element={<GenerateReportPage />}
          />

          <Route
            path="/dashboard/:firmName/:marketplace/:year/:month"
            element={<ReportDisplayPage />}
          />

          <Route
            path="/dashboard/:firmName/:marketplace"
            element={<MarketplaceReportsPage />}
          />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
