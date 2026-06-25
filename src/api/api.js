const API_BASE_URL = "http://localhost:5050/api";

export async function apiRequest(endpoint, options = {}) {
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