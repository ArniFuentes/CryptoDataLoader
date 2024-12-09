const extractData = () => {
  const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
  const headers = {
    Accept: "application/json",
    "X-CMC_PRO_API_KEY": API_KEY,
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
  return data.map((object) => [
    object.id,
    object.name,
    object.symbol,
    object.slug,
    object.num_market_pairs,
    object.circulating_supply,
    object.cmc_rank,
    object.quote.USD.price,
    new Date().toISOString()
  ]
  );
};

const loadData = (transformedData) => {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName("Hoja 1");
  const range = sheet.getDataRange();
  const lastRow = range.getLastRow(); 
  const numberOfRowsToAdd = transformedData.length; 
  const rangeLimits = `A${lastRow + 1}:I${lastRow + numberOfRowsToAdd}`;
  const rangeToAddNewData = sheet.getRange(rangeLimits);
  rangeToAddNewData.setValues(transformedData)
};
