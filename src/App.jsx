import { Routes, Route } from "react-router-dom";

import Layout from "./components/ui/layout/Layout";

import ProtectedRoute from "./auth/ProtectedRoute";
import PublicOnlyRoute from "./auth/PublicOnlyRoute";
import OnboardingRoute from "./auth/OnboardingRoute";
import LoggedInRoute from "./auth/LoggedInRoute.jsx";

import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/user/auth/AuthPage.jsx";
import OnboardingPage from "./pages/user/onboarding/OnboardingPage.jsx";
import ProfilePage from "./pages/user/profile/ProfilePage.jsx";

import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import FirmReportsPage from "./pages/firm-reports/FirmReportsPage.jsx";
import MarketplaceReportsPage from "./pages/marketplace-reports/MarketplaceReportsPage.jsx";
import GenerateReportPage from "./pages/generate-report/GenerateReportPage.jsx";
import ReportDisplayPage from "./pages/report-display/ReportDisplayPage.jsx";

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

        {/* Profile page route - do not need onboarding */}
        <Route element={<LoggedInRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            path="/dashboard/firms/:firmId"
            element={<FirmReportsPage />}
          />

          <Route
            path="/dashboard/firms/:firmId/:marketplace/generate-report"
            element={<GenerateReportPage />}
          />

          <Route
            path="/dashboard/firms/:firmId/:marketplace/:year/:month"
            element={<ReportDisplayPage />}
          />

          <Route
            path="/dashboard/firms/:firmId/:marketplace"
            element={<MarketplaceReportsPage />}
          />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
