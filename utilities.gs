const extractData = () => {
  const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
  const headers = {
    Accept: "application/json",
    "X-CMC_PRO_API_KEY": API_KEY,
  };

  parameters = {
    'convert': 'USD'
  };

  const options = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());
    return data.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
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
      new Date().toISOString()
    ]
    );
  } catch {
    console.error("Error al hacer la transformación:", error);
  }
};

const loadData = (transformedData) => {
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = "Hoja 1";
    const sheet = book.getSheetByName(sheetName);
    if (!sheet) throw new Error(`La hoja '${sheetName}' no existe.`);
    const range = sheet.getDataRange();
    const lastRow = range.getLastRow();
    const numberOfRowsToAdd = transformedData.length;
    const rangeLimits = `A${lastRow + 1}:I${lastRow + numberOfRowsToAdd}`;
    const rangeToAddNewData = sheet.getRange(rangeLimits);
    rangeToAddNewData.setValues(transformedData)
  } catch (error) {
    console.error("Error al cargar datos en la hoja:", error);
  }
};
