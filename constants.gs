const sheetName = "api_data";

const apiUrl = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

const apiKey = PropertiesService.getScriptProperties().getProperty("API_KEY");

const sheetId = PropertiesService.getScriptProperties().getProperty("spreadsheetId");

const headers = {
  Accept: "application/json",
  "X-CMC_PRO_API_KEY": apiKey,
};

const options = { method: "GET", headers };

const tableHeaders = [
  [
    "Name",
    "Symbol",
    "Slug",
    "Market Pairs",
    "Circulating Supply",
    "CMC Rank",
    "Price",
    "Timestamp",
  ],
];
