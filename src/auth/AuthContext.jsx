import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  completeProfile,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/authApi";

const AuthContext = createContext(null);

const AUTH_CHECK_INTERVAL_MS = 5 * 60 * 1000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const intervalRef = useRef(null);

  const setAuthFromResponse = useCallback((result) => {
    const authData = result?.data;

    setUser(authData?.user || null);
    setNeedsOnboarding(Boolean(authData?.needsOnboarding));
  }, []);

  const clearAuth = useCallback(() => {
    setUser(null);
    setNeedsOnboarding(false);
  }, []);

  const checkAuth = useCallback(
    async ({ silent = false } = {}) => {
      if (!silent) {
        setIsAuthLoading(true);
      }

      try {
        const result = await getCurrentUser();
        setAuthFromResponse(result);
        return {
          ok: true,
          data: result?.data,
        };
      } catch (error) {
        if (error?.status === 401) {
          clearAuth();
        }

        return {
          ok: false,
          error,
        };
      } finally {
        if (!silent) {
          setIsAuthLoading(false);
        }
      }
    },
    [clearAuth, setAuthFromResponse],
  );

  const register = useCallback(
    async ({ email, password, confirmPassword }) => {
      const result = await registerUser({
        email,
        password,
        confirmPassword,
      });

      setAuthFromResponse(result);
      return result;
    },
    [setAuthFromResponse],
  );

  const login = useCallback(
    async ({ email, password }) => {
      const result = await loginUser({
        email,
        password,
      });

      setAuthFromResponse(result);
      return result;
    },
    [setAuthFromResponse],
  );

  const finishOnboarding = useCallback(
    async ({ name, businessName, sellOnAmazon, sellOnFlipkart }) => {
      const result = await completeProfile({
        name,
        businessName,
        sellOnAmazon,
        sellOnFlipkart,
      });

      setAuthFromResponse(result);
      return result;
    },
    [setAuthFromResponse],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  const updateAuthUser = useCallback((result) => {
    const authData = result?.data;

    setUser(authData?.user || null);
    setNeedsOnboarding(Boolean(authData?.needsOnboarding));
  }, []);

  useEffect(() => {
    checkAuth();

    intervalRef.current = window.setInterval(() => {
      checkAuth({ silent: true });
    }, AUTH_CHECK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [checkAuth]);

  const value = useMemo(
    () => ({
      user,
      needsOnboarding,
      isAuthLoading,

      isAuthenticated: Boolean(user),

      checkAuth,
      register,
      login,
      finishOnboarding,
      logout,
      clearAuth,
      updateAuthUser,
    }),
    [
      user,
      needsOnboarding,
      isAuthLoading,
      checkAuth,
      register,
      login,
      finishOnboarding,
      logout,
      clearAuth,
      updateAuthUser,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
