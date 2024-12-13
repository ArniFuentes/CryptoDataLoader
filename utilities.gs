const extractData = () => {
  try {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const apiKey = getApiKey();
    const headers = { Accept: "application/json", "X-CMC_PRO_API_KEY": apiKey };
    const options = { method: "GET", headers: headers };
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());
    return data.data;
  } catch (error) {
    throw new Error(`extractData - ${error.message}`);
  }
};

const transformData = (data) => {
  try {
    return data.map((object) => [
      object.id,
      object.name,
      object.symbol,
      object.slug,
      object.num_market_pairs,
      Math.round(object.circulating_supply),
      object.cmc_rank,
      Math.round(object.quote.USD.price),
      new Date().toISOString(),
    ]);
  } catch (error) {
    throw new Error(`transformData - ${error.message}`);
  }
};

const loadData = (transformedData) => {
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = "Hoja 1";
    const sheet = book.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`La hoja '${sheetName}' no existe.`);
    }
    const range = sheet.getDataRange();
    const lastRow = range.getLastRow();
    const numberOfRowsToAdd = transformedData.length;
    const rangeLimits = `A${lastRow + 1}:I${lastRow + numberOfRowsToAdd}`;
    const rangeToAddNewData = sheet.getRange(rangeLimits);
    rangeToAddNewData.setValues(transformedData);
  } catch (error) {
    throw new Error(`loadData - ${error.message}`);
  }
};

const getApiKey = () => {
  const apiKey = PropertiesService.getScriptProperties().getProperty("API_KEY");
  if (!apiKey) {
    throw new Error(
      "La clave de la API no está configurada. Por favor, asegúrate de establecerla en la configuración del proyecto."
    );
  }
  return apiKey;
};
