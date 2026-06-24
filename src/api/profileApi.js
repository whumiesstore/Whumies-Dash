import { apiRequest } from "./api";

export function updateProfile(payload) {
    return apiRequest("/users/profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export function changePassword(payload) {
    return apiRequest("/users/change-password", {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export function getProfileErrorMessage(errorData) {
    if (Array.isArray(errorData?.details) && errorData.details.length > 0) {
        return errorData.details.map((item) => item.message).join(" ");
    }

    return errorData?.message || "Something went wrong. Please try again.";
}