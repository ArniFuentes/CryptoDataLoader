const extractData = () => {
  try {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const params = '?start=1&limit=50&convert=USD';
    const urlPlusParams = url + params;
    const apiKey = getApiKey();
    const headers = { Accept: "application/json", "X-CMC_PRO_API_KEY": apiKey };
    const options = { method: "GET", headers: headers };
    const response = UrlFetchApp.fetch(urlPlusParams, options);
    const data = JSON.parse(response.getContentText());
    return data;
  } catch (error) {
    throw new Error(`extractData - ${error.message}`);
  }
};


const transformData = (data) => {
  try {
    const listObjects = data.data;
    const listOfLists = listObjects.map((object) => [
      // object.id,
      object.name,
      object.symbol,
      object.slug,
      object.num_market_pairs,
      Math.round(object.circulating_supply),
      object.cmc_rank,
      Math.round(object.quote.USD.price),
      data.status.timestamp
    ]);
    return listOfLists;
  } catch (error) {
    throw new Error(`transformData - ${error.message}`);
  }
};


const writeHeaders = () => {
  try {
    const headers = [
      [
        "Name",
        "Symbol",
        "Slug",
        "Market Pairs",
        "Circulating Supply",
        "CMC Rank",
        "Price",
        "Timestamp"
      ]
    ];
    const sheet = setSheet();
    const rangeLimits = "A1:H1";
    const headerRange = sheet.getRange(rangeLimits);
    headerRange.setValues(headers);
  } catch (error) {
    throw new Error(`writeHeaders - ${error.message}`);
  }
}


const setSheet = () => {
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = "Hoja 1";
    const sheet = book.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`La hoja '${sheetName}' no existe.`);
    }
    return sheet;
  } catch (error) {
    throw new Error(`setSheet - ${error.message}`);
  }
}


const loadData = (transformedData) => {
  try {
    const sheet = setSheet();
    const rangeLimits = "A2:H51";
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
