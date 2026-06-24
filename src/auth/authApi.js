const API_BASE_URL = "http://localhost:5050/api/auth";

async function authRequest(endpoint, options = {}) {
    let response;

    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            credentials: "include",
        });
    } catch {
        throw {
            success: false,
            message: "Unable to connect to server. Please try again.",
            details: null,
            status: 0,
        };
    }

    const result = await response.json().catch(() => null);

    if (!response.ok) {
        throw {
            ...(result || {}),
            status: response.status,
            message: result?.message || "Something went wrong.",
        };
    }

    return result;
}

export function registerUser(payload) {
    return authRequest("/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function loginUser(payload) {
    return authRequest("/login", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function getCurrentUser() {
    return authRequest("/me", {
        method: "GET",
    });
}

export function completeProfile(payload) {
    return authRequest("/complete-profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export function logoutUser() {
    return authRequest("/logout", {
        method: "POST",
    });
}

export function getAuthErrorMessage(errorData) {
    if (Array.isArray(errorData?.details) && errorData.details.length > 0) {
        return errorData.details.map((item) => item.message).join(" ");
    }

    return errorData?.message || "Something went wrong. Please try again.";
}