import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../common/AuthLayout";
import OnboardingForm from "./OnboardingForm";

import { useAuth } from "../../../auth/AuthContext";
import { getAuthErrorMessage } from "../../../api/authApi";
import { validateOnboardingForm } from "../../../utils/validators/authValidation";
import "../auth/auth.css";
import "./onboarding.css";

function getInitialOnboardingForm(user) {
  return {
    name: user?.name || "",
    businessName: user?.businessName || "",
    sellOnAmazon: Boolean(user?.marketplaces?.amazon),
    sellOnFlipkart: Boolean(user?.marketplaces?.flipkart),
  };
}

function OnboardingMain() {
  const navigate = useNavigate();
  const { user, finishOnboarding } = useAuth();

  const [form, setForm] = useState(() => getInitialOnboardingForm(user));
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const requiredFields = useMemo(
    () => ({
      name: !user?.name?.trim(),
      businessName: !user?.businessName?.trim(),
      marketplaces:
        !user?.marketplaces?.amazon && !user?.marketplaces?.flipkart,
    }),
    [user],
  );

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
      marketplaces: "",
    }));

    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateOnboardingForm(form, requiredFields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      await finishOnboarding({
        name: form.name.trim(),
        businessName: form.businessName.trim(),
        sellOnAmazon: form.sellOnAmazon,
        sellOnFlipkart: form.sellOnFlipkart,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setServerError(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <OnboardingForm
        form={form}
        errors={errors}
        isLoading={isLoading}
        serverError={serverError}
        requiredFields={requiredFields}
        onChange={updateForm}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
}

export default OnboardingMain;
