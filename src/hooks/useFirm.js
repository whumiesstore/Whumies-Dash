import { useEffect, useState } from "react";
import { useFirms } from "../context/FirmsContext";

function useFirm(firmId) {
    const { getCachedFirm, fetchFirmById } = useFirms();

    const [firm, setFirm] = useState(() => getCachedFirm(firmId));
    const [isFirmLoading, setIsFirmLoading] = useState(Boolean(firmId && !firm));
    const [firmError, setFirmError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadFirm() {
            if (!firmId) {
                if (!isMounted) return;

                setFirm(null);
                setFirmError("Firm ID is missing.");
                setIsFirmLoading(false);
                return;
            }

            const cachedFirm = getCachedFirm(firmId);

            if (cachedFirm) {
                setFirm(cachedFirm);
                setFirmError("");
                setIsFirmLoading(false);
                return;
            }

            setIsFirmLoading(true);
            setFirmError("");

            const result = await fetchFirmById(firmId);

            if (!isMounted) return;

            if (result.ok) {
                setFirm(result.firm);
                setFirmError("");
            } else {
                setFirm(null);
                setFirmError(result.message || "Unable to load firm.");
            }

            setIsFirmLoading(false);
        }

        loadFirm();

        return () => {
            isMounted = false;
        };
    }, [firmId, getCachedFirm, fetchFirmById]);

    return {
        firm,
        firmName: firm?.firmName || "",
        isFirmLoading,
        firmError,
    };
}

export default useFirm;