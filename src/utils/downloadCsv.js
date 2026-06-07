function escapeCsvValue(value) {
    if (value === null || value === undefined) return "";

    const stringValue = String(value);

    if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
    ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
}

export function downloadCsv({ fileName, columns, rows }) {
    const headerRow = columns.map((column) => escapeCsvValue(column.label)).join(",");

    const bodyRows = rows.map((row) =>
        columns
            .map((column) => {
                const value =
                    typeof column.value === "function"
                        ? column.value(row)
                        : row[column.value];

                return escapeCsvValue(value);
            })
            .join(",")
    );

    const csvContent = [headerRow, ...bodyRows].join("\n");

    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}