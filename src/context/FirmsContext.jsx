import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  createFirm,
  deleteFirm,
  getFirmById,
  getFirmErrorMessage,
  getFirms,
  makeFirmPrimary,
  updateFirm,
} from "../api/firmApi";

const FirmsContext = createContext(null);

function sortFirms(firms) {
  return [...firms].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;

    return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
  });
}

export function FirmsProvider({ children }) {
  const [firms, setFirms] = useState([]);
  const [firmCache, setFirmCache] = useState({});

  const [isFirmsLoading, setIsFirmsLoading] = useState(false);
  const [firmsError, setFirmsError] = useState("");

  const saveFirmToCache = useCallback((firm) => {
    if (!firm?.id) return;

    setFirmCache((prev) => ({
      ...prev,
      [firm.id]: firm,
    }));
  }, []);

  const saveFirmsToState = useCallback((nextFirms) => {
    const sorted = sortFirms(nextFirms || []);

    setFirms(sorted);

    setFirmCache((prev) => {
      const nextCache = { ...prev };

      sorted.forEach((firm) => {
        if (firm?.id) {
          nextCache[firm.id] = firm;
        }
      });

      return nextCache;
    });
  }, []);

  const fetchFirms = useCallback(
    async ({ silent = false } = {}) => {
      if (!silent) {
        setIsFirmsLoading(true);
      }

      setFirmsError("");

      try {
        const result = await getFirms();
        const fetchedFirms = result?.data?.firms || [];

        saveFirmsToState(fetchedFirms);

        return {
          ok: true,
          firms: fetchedFirms,
        };
      } catch (error) {
        const message = getFirmErrorMessage(error);
        setFirmsError(message);

        return {
          ok: false,
          error,
          message,
        };
      } finally {
        if (!silent) {
          setIsFirmsLoading(false);
        }
      }
    },
    [saveFirmsToState],
  );

  const fetchFirmById = useCallback(
    async (firmId, { force = false } = {}) => {
      if (!firmId) {
        return {
          ok: false,
          firm: null,
          message: "Firm ID is missing.",
        };
      }

      if (!force && firmCache[firmId]) {
        return {
          ok: true,
          firm: firmCache[firmId],
        };
      }

      try {
        const result = await getFirmById(firmId);
        const firm = result?.data?.firm || result?.data;

        if (!firm?.id) {
          throw {
            message: "Firm details were not found.",
          };
        }

        saveFirmToCache(firm);

        setFirms((prev) => {
          const exists = prev.some((item) => item.id === firm.id);

          if (!exists) {
            return sortFirms([...prev, firm]);
          }

          return sortFirms(
            prev.map((item) => (item.id === firm.id ? firm : item)),
          );
        });

        return {
          ok: true,
          firm,
        };
      } catch (error) {
        return {
          ok: false,
          firm: null,
          error,
          message: getFirmErrorMessage(error),
        };
      }
    },
    [firmCache, saveFirmToCache],
  );

  const addFirm = useCallback(
    async ({ firmName, isPrimary }) => {
      const result = await createFirm({
        firmName: firmName.trim(),
        isPrimary,
      });

      await fetchFirms({ silent: true });

      return result;
    },
    [fetchFirms],
  );

  const editFirm = useCallback(
    async (firmId, { firmName, isPrimary }) => {
      const result = await updateFirm(firmId, {
        firmName: firmName.trim(),
        isPrimary,
      });

      await fetchFirms({ silent: true });

      return result;
    },
    [fetchFirms],
  );

  const setPrimaryFirm = useCallback(
    async (firmId) => {
      const result = await makeFirmPrimary(firmId);

      await fetchFirms({ silent: true });

      return result;
    },
    [fetchFirms],
  );

  const removeFirm = useCallback(
    async (firmId) => {
      const result = await deleteFirm(firmId);

      setFirmCache((prev) => {
        const next = { ...prev };
        delete next[firmId];
        return next;
      });

      await fetchFirms({ silent: true });

      return result;
    },
    [fetchFirms],
  );

  const getCachedFirm = useCallback(
    (firmId) => {
      if (!firmId) return null;

      return (
        firmCache[firmId] || firms.find((firm) => firm.id === firmId) || null
      );
    },
    [firmCache, firms],
  );

  const value = useMemo(
    () => ({
      firms,
      firmCache,
      isFirmsLoading,
      firmsError,

      fetchFirms,
      fetchFirmById,
      getCachedFirm,

      addFirm,
      editFirm,
      setPrimaryFirm,
      removeFirm,
    }),
    [
      firms,
      firmCache,
      isFirmsLoading,
      firmsError,
      fetchFirms,
      fetchFirmById,
      getCachedFirm,
      addFirm,
      editFirm,
      setPrimaryFirm,
      removeFirm,
    ],
  );

  return (
    <FirmsContext.Provider value={value}>{children}</FirmsContext.Provider>
  );
}

export function useFirms() {
  const context = useContext(FirmsContext);

  if (!context) {
    throw new Error("useFirms must be used inside FirmsProvider");
  }

  return context;
}
