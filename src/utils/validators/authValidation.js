export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getPasswordChecks(password) {
    return {
        length: password.length >= 8 && password.length <= 16,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };
}

export function isStrongPassword(password) {
    return Object.values(getPasswordChecks(password)).every(Boolean);
}

export function getErrorMessage(errorData) {
    if (Array.isArray(errorData?.details) && errorData.details.length > 0) {
        return errorData.details.map((item) => item.message).join(" ");
    }

    return errorData?.message || "Something went wrong. Please try again.";
}

export function validateCreateAccountForm(form) {
    const errors = {};

    if (!form.email.trim()) {
        errors.email = "Email address is required.";
    } else if (!isValidEmail(form.email.trim())) {
        errors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
        errors.password = "Password is required.";
    } else if (!isStrongPassword(form.password)) {
        errors.password = "Please create a stronger password.";
    }

    if (!form.confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
}

export function validateLoginForm(form) {
    const errors = {};

    if (!form.email.trim()) {
        errors.email = "Email address is required.";
    } else if (!isValidEmail(form.email.trim())) {
        errors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
        errors.password = "Password is required.";
    }

    return errors;
}

export function validateOnboardingForm(form, requiredFields = {}) {
    const errors = {};

    if (requiredFields.name && !form.name.trim()) {
        errors.name = "Please enter your name.";
    }

    if (requiredFields.businessName && !form.businessName.trim()) {
        errors.businessName = "Please enter your business name.";
    }

    if (!form.sellOnAmazon && !form.sellOnFlipkart) {
        errors.marketplaces =
            "Please select at least one marketplace where you sell. This helps us personalize your dashboard.";
    }

    return errors;
}