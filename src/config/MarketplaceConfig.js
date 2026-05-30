export const marketplaceConfig = {
    amazon: {
        title: "Amazon",
        subtitle: "Seller Central",
        color: "#ff9800",

        helpText: "How to calculate report",
        externalText: "Seller Central",
        externalUrl: "https://sellercentral.amazon.in/",

        upload: {
            orders: {
                reportName: "Orders Report",
                acceptedFileTypes: ".txt",
                acceptedFileLabel: ".txt",
                uploadButtonText: "Upload Orders File",
                dragDropText: "or drag & drop your orders .txt file here",
                acceptedText:
                    "Only .txt files exported from Amazon Seller Central are accepted.",
                portalStepTitle: "Go to Amazon Seller Central",
                portalStepDescription:
                    "Log in to your Amazon Seller Central account, then open the Orders Report page.",
                portalButtonText: "Open Orders Report Page",
                reportUrl:
                    "https://sellercentral.amazon.in/order-reports-and-feeds/reports/allOrders#",
                parserType: "amazon-orders-txt",
            },

            payments: {
                reportName: "Payments Report",
                acceptedFileTypes: ".csv",
                acceptedFileLabel: ".csv",
                uploadButtonText: "Upload Payments File",
                dragDropText: "or drag & drop your payments .csv file here",
                acceptedText:
                    "Only .csv payment transaction files from Amazon Seller Central are accepted.",
                portalStepTitle: "Go to Payments Reports Repository",
                portalStepDescription:
                    "Log in to Amazon Seller Central and open the Payments Reports Repository.",
                portalButtonText: "Download Payments Report Here",
                reportUrl:
                    "https://sellercentral.amazon.in/payments/reports-repository",
                parserType: "amazon-payments-csv",
            },
        },
    },

    flipkart: {
        title: "Flipkart",
        subtitle: "Seller Hub",
        color: "#2874f0",

        helpText: "How to calculate report",
        externalText: "Seller Hub",
        externalUrl: "https://seller.flipkart.com/",

        upload: {
            orders: {
                reportName: "Orders Report",
                acceptedFileTypes: ".xlsx,.xls",
                acceptedFileLabel: ".xlsx",
                uploadButtonText: "Upload Orders File",
                dragDropText: "or drag & drop your orders .xlsx file here",
                acceptedText:
                    "Only .xlsx files exported from Flipkart Seller Hub are accepted.",
                portalStepTitle: "Go to Flipkart Seller Hub",
                portalStepDescription:
                    "Log in to your Flipkart Seller Hub account, then open the Orders Report section.",
                portalButtonText: "Download Order File Here",
                reportUrl: "https://seller.flipkart.com/index.html#dashboard/metrics/report-centre?query=%7B%22one_time_request%22%3A%7B%22reportGroup%22%3Anull%2C%22reportName%22%3Anull%2C%22enable%22%3Atrue%2C%22status%22%3Anull%7D%2C%22repeat_request%22%3A%7B%22repeat_report_group_name%22%3Anull%2C%22repeat_report_name%22%3Anull%2C%22repeat_enable%22%3Afalse%7D%2C%22pagination%22%3A%7B%22page_size%22%3A10%2C%22starting_page%22%3A1%7D%2C%22request_report%22%3A%7B%22create_request%22%3Atrue%2C%22report_type%22%3A%22Fulfilment%20Reports%22%2C%22report_subtype%22%3A%22Orders%22%2C%22repeat_report%22%3Afalse%7D%7D",
                parserType: "flipkart-orders-xlsx",
            },

            payments: {
                reportName: "Payments Report",
                acceptedFileTypes: ".xlsx,.xls",
                acceptedFileLabel: ".xlsx",
                uploadButtonText: "Upload Payments File",
                dragDropText: "or drag & drop your payments .xlsx file here",
                acceptedText:
                    "Only .xlsx payment files exported from Flipkart Seller Hub are accepted.",
                portalStepTitle: "Go to Flipkart Seller Hub",
                portalStepDescription:
                    "Log in to Flipkart Seller Hub and download the payment settlement report.",
                portalButtonText: "Download Payments Report Here",
                reportUrl: "https://seller.flipkart.com/",
                parserType: "flipkart-payments-xlsx",
            },
        },
    },
};