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

export function validateProfileForm(form) {
    const errors = {};

    if (!form.name.trim()) {
        errors.name = "Name is required.";
    }

    if (!form.businessName.trim()) {
        errors.businessName = "Business name is required.";
    }

    if (!form.sellOnAmazon && !form.sellOnFlipkart) {
        errors.marketplaces =
            "Please select at least one marketplace. Whumies Dash needs this to keep your dashboard relevant to your business.";
    }

    return errors;
}

export function validateChangePasswordForm(form) {
    const errors = {};

    if (!form.currentPassword) {
        errors.currentPassword = "Current password is required.";
    }

    if (!form.newPassword) {
        errors.newPassword = "New password is required.";
    } else if (!isStrongPassword(form.newPassword)) {
        errors.newPassword = "Please create a stronger password.";
    }

    if (!form.confirmNewPassword) {
        errors.confirmNewPassword = "Please confirm your new password.";
    } else if (form.newPassword !== form.confirmNewPassword) {
        errors.confirmNewPassword = "New password and confirm password do not match.";
    }

    if (
        form.currentPassword &&
        form.newPassword &&
        form.currentPassword === form.newPassword
    ) {
        errors.newPassword = "New password must be different from current password.";
    }

    return errors;
}