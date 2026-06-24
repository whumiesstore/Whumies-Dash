import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "./common/AuthLayout";
import OnboardingForm from "./onboarding/OnboardingForm";

import { useAuth } from "../../auth/AuthContext";
import { getAuthErrorMessage } from "../../auth/authApi";
import { validateOnboardingForm } from "../../auth/authValidation";

const initialOnboardingForm = {
  name: "",
  businessName: "",
  sellOnAmazon: false,
  sellOnFlipkart: false,
};

function OnboardingMain() {
  const navigate = useNavigate();
  const { finishOnboarding } = useAuth();

  const [form, setForm] = useState(initialOnboardingForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateOnboardingForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

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
        onChange={updateForm}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
}

export default OnboardingMain;
