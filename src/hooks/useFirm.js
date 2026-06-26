import { useCallback, useEffect, useState } from "react";
import { getFirmById, getFirmErrorMessage } from "../api/firmApi";

function useFirm(firmId) {
    const [firm, setFirm] = useState(null);
    const [isFirmLoading, setIsFirmLoading] = useState(Boolean(firmId));
    const [firmError, setFirmError] = useState("");

    const fetchFirm = useCallback(async () => {
        if (!firmId) {
            setFirm(null);
            setFirmError("Firm ID is missing.");
            setIsFirmLoading(false);
            return;
        }

        setIsFirmLoading(true);
        setFirmError("");

        try {
            const result = await getFirmById(firmId);
            const fetchedFirm = result?.data?.firm || result?.data;

            if (!fetchedFirm?.id) {
                throw {
                    message: "Firm details were not found.",
                };
            }

            setFirm(fetchedFirm);
        } catch (error) {
            setFirm(null);
            setFirmError(getFirmErrorMessage(error));
        } finally {
            setIsFirmLoading(false);
        }
    }, [firmId]);

    useEffect(() => {
        fetchFirm();
    }, [fetchFirm]);

    return {
        firm,
        firmName: firm?.firmName || "",
        isFirmLoading,
        firmError,
        refetchFirm: fetchFirm,
    };
}

export default useFirm;