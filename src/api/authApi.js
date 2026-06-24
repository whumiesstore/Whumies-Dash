import { apiRequest } from "./api";

export function registerUser(payload) {
    return apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function loginUser(payload) {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function getCurrentUser() {
    return apiRequest("/auth/me", {
        method: "GET",
    });
}

export function completeProfile(payload) {
    return apiRequest("/auth/complete-profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export function logoutUser() {
    return apiRequest("/auth/logout", {
        method: "POST",
    });
}

export function getAuthErrorMessage(errorData) {
    if (Array.isArray(errorData?.details) && errorData.details.length > 0) {
        return errorData.details.map((item) => item.message).join(" ");
    }

    return errorData?.message || "Something went wrong. Please try again.";
}