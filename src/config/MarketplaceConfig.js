export const marketplaceConfig = {
    amazon: {
        title: "Amazon",
        subtitle: "Seller Central",
        color: "#ff9800",

        helpText: "How to calculate report",
        externalText: "Seller Central",
        externalUrl: "https://sellercentral.amazon.in/",

        flow: [
            "upload-orders-report",
            "sku-cost",
            "upload-amazon-payments-report",
            "report-ready",
        ],

        upload: {
            orders: {
                reportName: "Orders Report",
                acceptedFileTypes: ".txt",
                acceptedFileLabel: ".txt",
                uploadButtonText: "Upload Orders File",
                validatingLabel: "orders file",
                dragDropText: "or drag & drop your orders .txt file here",
                acceptedText:
                    "Only .txt files exported from Amazon Seller Central are accepted.",

                heading: "Upload Your Orders Report",
                description:
                    "Follow the steps below to download your orders file from Amazon Seller Central and upload it here.",

                portalStepTitle: "Go to Amazon Seller Central",
                portalStepDescription:
                    "Log in to your Amazon Seller Central account, then open the Orders Report page.",
                portalButtonText: "Open Orders Report Page",
                reportUrl:
                    "https://sellercentral.amazon.in/order-reports-and-feeds/reports/allOrders#",

                dateStepTitle: "Set the Date Range",
                dateStepDescription:
                    "In the report settings, set the date range to cover the entire month:",
                monthPillPrefix: "Reporting month",

                successTitle: "Orders File Processed Successfully!",
                successNote:
                    "Please verify this month. Next, you’ll enter product costs.",

                parserType: "amazon-orders-report-txt",
            },

            payments: {
                reportName: "Payments Report",
                acceptedFileTypes: ".csv",
                acceptedFileLabel: ".csv",
                uploadButtonText: "Upload Payments File",
                validatingLabel: "payments file",

                heading: "Upload Your Payments Report",
                description:
                    "Now download the payment settlements report from Amazon and upload it here.",

                dragDropText: "or drag & drop your payments .csv file here",
                acceptedText:
                    "Only .csv payment transaction files from Amazon Seller Central are accepted.",

                portalStepTitle: "Go to Payments Reports Repository",
                portalStepDescription:
                    "Log in to Amazon Seller Central and open the Payments Reports Repository.",
                portalButtonText: "Download Payments Report Here",
                reportUrl:
                    "https://sellercentral.amazon.in/payments/reports-repository",

                dateStepTitle: "Set the Date Range",
                dateStepDescription:
                    "Set the date range as shown below. The extra 20 days into the next month ensures all returns and settlements from the report month are fully captured.",
                monthPillPrefix: "Reporting period",

                extraNoteTitle: "Why Additional 20 days?",
                extraNote:
                    "Amazon settles returns and refunds over the following weeks. Including 20 extra days ensures your report month’s returns are fully accounted for and the profit calculation is accurate.",

                usePaymentEndDate: true,
                usePaymentPeriod: true,

                parserType: "amazon-payments-report-csv",
            }
        },

        profitLossSectionInfo: {
            sales: {
                title: "Sales (Inc GST)",
                description:
                    "Total amount you earned from all Amazon orders including GST. This is the gross revenue before any deductions from Amazon.",
            },
            refundsFees: {
                title: "Refunds, Cancellations, and Fees (Inc GST)",
                description:
                    "Total amount deducted from your sales which includes refunds, cancellations, commissions, referral fees, and other charges. These are taken out by Amazon before settlement.",
            },
            netSettlement: {
                title: "Net Settlement Received (Inc GST)",
                description:
                    "Total amount Amazon settles to you after deducting refunds, fees, and charges from your total sales. This includes GST.",
            },
            purchaseCost: {
                title: "Purchase Cost",
                description:
                    "Total cost of all products you bought to fulfill Amazon orders. If you included GST in your purchase price, this reflects the total with GST. If not, you'll pay GST separately from your profit.",
            },
            profit: {
                title: "Profit",
                description:
                    "This profit doesn't include GST. Here's how GST works: When you buy from suppliers, you pay GST. When customers buy from you, they pay GST included in price. You can use the GST you paid suppliers as a credit. Platforms also give you credit for GST on shipping and ads. But after using all these credits, some GST still remains that you have to pay to the government from this profit.",
            }
        }
    },

    flipkart: {
        title: "Flipkart",
        subtitle: "Seller Hub",
        color: "#2874f0",

        helpText: "How to calculate report",
        externalText: "Seller Hub",
        externalUrl: "https://seller.flipkart.com/",

        flow: [
            "upload-orders-report",
            "upload-flipkart-payments-report-1",
            "upload-flipkart-payments-report-2",
            "upload-flipkart-ads-report",
            "sku-cost",
            "report-ready",
        ],

        upload: {
            orders: {
                reportName: "Orders Report",
                acceptedFileTypes: ".xlsx,.xls",
                acceptedFileLabel: ".xlsx",
                uploadButtonText: "Upload Orders File",
                validatingLabel: "orders file",
                dragDropText: "or drag & drop your orders .xlsx file here",
                acceptedText:
                    "Only .xlsx files exported from Flipkart Seller Hub are accepted.",

                heading: "Upload Your Orders Report",
                description:
                    "Follow the steps below to download your orders file from Flipkart Seller Hub and upload it here.",

                portalStepTitle: "Go to Flipkart Seller Hub",
                portalStepDescription:
                    "Log in to your Flipkart Seller Hub account, then open the Orders Report section.",
                portalButtonText: "Download Order File Here",
                reportUrl:
                    "https://seller.flipkart.com/index.html#dashboard/metrics/report-centre?query=%7B%22one_time_request%22%3A%7B%22reportGroup%22%3Anull%2C%22reportName%22%3Anull%2C%22enable%22%3Atrue%2C%22status%22%3Anull%7D%2C%22repeat_request%22%3A%7B%22repeat_report_group_name%22%3Anull%2C%22repeat_report_name%22%3Anull%2C%22repeat_enable%22%3Afalse%7D%2C%22pagination%22%3A%7B%22page_size%22%3A10%2C%22starting_page%22%3A1%7D%2C%22request_report%22%3A%7B%22create_request%22%3Atrue%2C%22report_type%22%3A%22Fulfilment%20Reports%22%2C%22report_subtype%22%3A%22Orders%22%2C%22repeat_report%22%3Afalse%7D%7D",

                successTitle: "Orders File Processed Successfully!",
                successNote:
                    "Please verify if this matches your intended analysis month.",

                parserType: "flipkart-orders-report-xlsx",
            },

            payments1: {
                reportName: "Payment File 1",
                acceptedFileTypes: ".xlsx,.xls",
                acceptedFileLabel: ".xlsx",
                uploadButtonText: "Upload Payment File",
                validatingLabel: "payment file",

                heading: "Upload Payment File 1",
                description:
                    "Download the Settled Transactions report for the analysis month and upload it here.",

                dragDropText: "or drag & drop your payment .xlsx file here",
                acceptedText:
                    "Only .xlsx Settled Transactions files from Flipkart are accepted.",

                portalStepTitle: "Go to Flipkart Seller Hub",
                portalStepDescription:
                    "Log in and open the Payment Reports section in Report Centre.",
                portalButtonText: "Download Payment File here",
                reportUrl: "https://seller.flipkart.com/",

                dateStepTitle: "Set the Date Range",
                dateStepDescription:
                    "Set the date range to cover the entire analysis month:",
                monthPillPrefix: "File 1",

                parserType: "flipkart-payments-report-1-xlsx",
            },

            payments2: {
                reportName: "Payment File 2",
                acceptedFileTypes: ".xlsx,.xls",
                acceptedFileLabel: ".xlsx",
                uploadButtonText: "Upload Payment File",
                validatingLabel: "payment file",

                heading: "Upload Payment File 2",
                description:
                    "Now download the Settled Transactions report for the following month to capture return settlements.",

                dragDropText: "or drag & drop your payment .xlsx file here",
                acceptedText:
                    "Only .xlsx Settled Transactions files from Flipkart are accepted.",

                portalStepTitle: "Go to Flipkart Seller Hub",
                portalStepDescription:
                    "Open the same Payment Reports section in Report Centre.",
                portalButtonText: "Download Payment File here",
                reportUrl: "https://seller.flipkart.com/",

                dateStepTitle: "Set the Date Range — Next Month",
                dateStepDescription:
                    "Set the date range from the 1st until the 20th of the following month:",
                monthPillPrefix: "File 2",

                extraNoteTitle: "Why a second file?",
                extraNote:
                    "Flipkart settles returns from the last week of the analysis month in the following month’s payment cycle. This file ensures those are fully captured.",

                parserType: "flipkart-payments-report-2-xlsx",
            },

            ads: {
                reportName: "Ads Report",
                optionalText: "(Optional)",
                acceptedFileTypes: ".csv",
                acceptedFileLabel: ".csv",
                uploadButtonText: "Upload Ads Report (.csv)",
                validatingLabel: "ads report",
                dragDropText: "or drag & drop your campaign .csv file here",
                acceptedText: "Only .csv Flipkart Campaign reports are accepted.",

                heading: "Upload Ads Report",
                description:
                    "Upload your Flipkart Campaign report to deduct ad spend from your profit calculation.",

                portalStepTitle: "Go to Flipkart Seller Hub — Ads",
                portalStepDescription: "Navigate to Side Menu → Advertising",
                portalButtonText: "Open Flipkart Ads",
                reportUrl: "https://seller.flipkart.com/",

                dateStepTitle: "Set the Date Range — Analysis Month",
                dateStepDescription:
                    "Set the date range to cover the full analysis month:",
                monthPillPrefix: "Ads Report",

                footerNote:
                    "The Ad Spend column across all campaigns will be totalled and deducted from your profit. If you don’t run ads, click the skip button below the upload zone.",

                skipButtonText: "⊘ I don't run ads — skip this step",

                parserType: "flipkart-ads-report-csv",
            },
        },

        profitLossSectionInfo: {
            sales: {
                title: "Sale",
                description:
                    "Total income from your sales including all payments, offers, commissions, and adjustments. This is the gross amount before any deductions.",
            },
            otherCharges: {
                title: "Other Charges",
                description:
                    "All charges deducted by Flipkart including marketplace fees, taxes, protection fund, refunds, and cancellations. These are costs associated with selling on the platform.",
            },
            netSettlement: {
                title: "Net Settlement",
                description:
                    "Total amount Flipkart settles to you after deducting all charges, fees, and taxes from your sales. This is the net amount credited to your account.",
            },
            adSpend: {
                title: "Ad Spend",
                description:
                    "Total amount you spent on Flipkart ads to promote your products. When you create campaigns and run ads, you pay for clicks or impressions. All these costs are deducted from your settlement.",
            },
            purchasePrice: {
                title: "Purchase Price",
                description:
                    "Total cost of all products you bought to fulfill Flipkart orders. If you included GST in your purchase price, this reflects the total with GST. If not, you'll pay GST separately from your profit.",
            },
            profit: {
                title: "Profit",
                description:
                    "This profit doesn't include GST. Here's how GST works: When you buy from suppliers, you pay GST. When customers buy from you, they pay GST included in price. You can use the GST you paid suppliers as a credit. Platforms also give you credit for GST on shipping and ads. But after using all these credits, some GST still remains that you have to pay to the government from this profit.",
            },
        }
    },
};