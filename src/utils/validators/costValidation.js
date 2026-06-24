export const COST_FIELDS = {
    productCost: {
        label: "Product Cost",
        required: true,
        min: 0,
    },
    productGst: {
        label: "Product GST",
        required: false,
        min: 0,
        max: 100,
    },
    packingCost: {
        label: "Packing Cost",
        required: false,
        min: 0,
    },
    packingGst: {
        label: "Packing GST",
        required: false,
        min: 0,
        max: 100,
    },
    otherCost: {
        label: "Other Cost",
        required: false,
        min: 0,
    },
};

export function sanitizeNumberInput(value) {
    if (value === "") return "";

    const cleaned = String(value).replace(/[^\d.]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
        return `${parts[0]}.${parts.slice(1).join("")}`;
    }

    return cleaned;
}

export function validateCostField(field, value) {
    const rules = COST_FIELDS[field];

    if (!rules) {
        return "";
    }

    if (value === "" || value === null || value === undefined) {
        if (rules.required) {
            return `${rules.label} is required`;
        }

        return "";
    }

    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
        return `${rules.label} must be a valid number`;
    }

    if (numberValue < rules.min) {
        return `${rules.label} cannot be negative`;
    }

    if (rules.max !== undefined && numberValue > rules.max) {
        return `${rules.label} cannot be more than ${rules.max}%`;
    }

    return "";
}

export function validateCostRow(row = {}) {
    const errors = {};

    Object.keys(COST_FIELDS).forEach((field) => {
        const error = validateCostField(field, row[field] ?? "");

        if (error) {
            errors[field] = error;
        }
    });

    return errors;
}

export function hasRowErrors(row = {}) {
    return Object.keys(validateCostRow(row)).length > 0;
}

export function hasProductCost(row = {}) {
    return Number(row.productCost || 0) > 0;
}

export function getCostTotal(row = {}) {
    const productCost = Number(row.productCost || 0);
    const productGst = Number(row.productGst || 0);
    const packingCost = Number(row.packingCost || 0);
    const packingGst = Number(row.packingGst || 0);
    const otherCost = Number(row.otherCost || 0);

    const productGstAmount = productCost * (productGst / 100);
    const packingGstAmount = packingCost * (packingGst / 100);

    return (
        productCost +
        productGstAmount +
        packingCost +
        packingGstAmount +
        otherCost
    ).toFixed(2);
}

export function getFirstValidationMessage(errors = {}) {
    const firstField = Object.keys(errors)[0];
    return firstField ? errors[firstField] : "";
}