const apiUrl = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

const properties = PropertiesService.getScriptProperties();

const apiKey = properties.getProperty("API_KEY");
const projectId = properties.getProperty("projectId");
const datasetId = properties.getProperty("datasetId");
const tableId = properties.getProperty("tableId");
const email = properties.getProperty("email");


const headers = {
  Accept: "application/json",
  "X-CMC_PRO_API_KEY": apiKey,
};

const options = { method: "GET", headers };
