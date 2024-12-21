const fetchData = (url, params, headers) => {
  try {
    const urlPlusParams = url + params;
    const options = { method: "GET", headers };
    const response = UrlFetchApp.fetch(urlPlusParams, options);
    const data = JSON.parse(response.getContentText());
    return data
  } catch (error) {
    throw new Error(`fetchData - ${error.message}`);
  }
};

const writeHeaders = (sheet, range, headers) => {
  try {
    sheet.getRange(range).setValues(headers);
  } catch (error) {
    throw new Error(`writeHeaders - ${error.message}`);
  }
};

const writeData = (sheet, range, data) => {
  try {
    sheet.getRange(range).setValues(data);
  } catch {
    throw new Error(`writeData - ${error.message}`);
  }
};

const transformData = (data) => {
  if (!data || !Array.isArray(data.data)) {
    throw new Error("Error en transformData - Datos inválidos");
  }
  const listObjects = data.data;
  return listObjects.map((object) => [
    object.name,
    object.symbol,
    object.slug,
    object.num_market_pairs,
    Math.round(object.circulating_supply),
    object.cmc_rank,
    Math.round(object.quote.USD.price),
    data.status.timestamp
  ]);
};
