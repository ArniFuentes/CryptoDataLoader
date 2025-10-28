const apiUrl = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

const apiKey = PropertiesService.getScriptProperties().getProperty("API_KEY");

const projectId = PropertiesService.getScriptProperties().getProperty("projectId");
const datasetId = PropertiesService.getScriptProperties().getProperty("datasetId");
const tableId = PropertiesService.getScriptProperties().getProperty("tableId");


// const sheetId = PropertiesService.getScriptProperties().getProperty("spreadsheetId");

const headers = {
  Accept: "application/json",
  "X-CMC_PRO_API_KEY": apiKey,
};

const options = { method: "GET", headers };
