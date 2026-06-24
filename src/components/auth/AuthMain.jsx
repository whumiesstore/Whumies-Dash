import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "./common/AuthLayout";
import AuthTabs from "./common/AuthTabs";
import CreateAccountForm from "./create-account/CreateAccountForm";
import LoginForm from "./login/LoginForm";

import { useAuth } from "../../auth/AuthContext";
import { getAuthErrorMessage } from "../../auth/authApi";

import {
  validateCreateAccountForm,
  validateLoginForm,
} from "../../auth/authValidation";

import "./auth.css";

const initialAuthForm = {
  email: "",
  password: "",
  confirmPassword: "",
};

function AuthMain() {
  const navigate = useNavigate();
  const { register, login } = useAuth();

  const [activeTab, setActiveTab] = useState("register");
  const [authForm, setAuthForm] = useState(initialAuthForm);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateAuthForm = (field, value) => {
    setAuthForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setServerError("");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setAuthForm(initialAuthForm);
    setErrors({});
    setServerError("");
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    const validationErrors = validateCreateAccountForm(authForm);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({
        email: authForm.email.trim(),
        password: authForm.password,
        confirmPassword: authForm.confirmPassword,
      });

      if (result?.data?.needsOnboarding) {
        navigate("/onboarding", { replace: true });
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setServerError(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(authForm);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await login({
        email: authForm.email.trim(),
        password: authForm.password,
      });

      if (result?.data?.needsOnboarding) {
        navigate("/onboarding", { replace: true });
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setServerError(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <h2>Get Started Today</h2>

        <AuthTabs activeTab={activeTab} onChange={handleTabChange} />

        {activeTab === "register" ? (
          <CreateAccountForm
            form={authForm}
            errors={errors}
            isLoading={isLoading}
            serverError={serverError}
            onChange={updateAuthForm}
            onSubmit={handleCreateAccount}
          />
        ) : (
          <LoginForm
            form={authForm}
            errors={errors}
            isLoading={isLoading}
            serverError={serverError}
            onChange={updateAuthForm}
            onSubmit={handleLogin}
          />
        )}
      </div>
    </AuthLayout>
  );
}

export default AuthMain;
