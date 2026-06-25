import { apiRequest } from "./api";

export function getFirms() {
    return apiRequest("/firms", {
        method: "GET",
    });
}

export function getFirmById(firmId) {
    return apiRequest(`/firms/${firmId}`, {
        method: "GET",
    });
}

export function createFirm(payload) {
    return apiRequest("/firms", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function updateFirm(firmId, payload) {
    return apiRequest(`/firms/${firmId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export function makeFirmPrimary(firmId) {
    return apiRequest(`/firms/${firmId}/make-primary`, {
        method: "PATCH",
    });
}

export function deleteFirm(firmId) {
    return apiRequest(`/firms/${firmId}`, {
        method: "DELETE",
    });
}

export function getFirmErrorMessage(errorData) {
    if (Array.isArray(errorData?.details) && errorData.details.length > 0) {
        return errorData.details.map((item) => item.message).join(" ");
    }

    return errorData?.message || "Something went wrong. Please try again.";
}