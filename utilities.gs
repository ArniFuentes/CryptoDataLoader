const fetchData = (api_url, headers) => {
  if (!api_url || !headers) {
    throw new Error("Error en la función fetchData - Argumento/s inválidos");
  }
  const options = { method: "GET", headers };
  const response = UrlFetchApp.fetch(api_url, options);
  const data = JSON.parse(response.getContentText());
  return data
};

const writeHeaders = (sheet, range, headers) => {
  if (!sheet || !range || !headers) {
    throw new Error("Error en la función writeHeaders - Argumento/s inválidos");
  }
  sheet.getRange(range).setValues(headers);
};

const writeData = (range, data) => {
  if (!range || !data) {
    throw new Error("Error en la función writeData - Argumento/s inválidos");
  }
  range.setValues(data);
};

const transformData = (data) => {
  if (!data || !data.data || !Array.isArray(data.data)) {
    throw new Error("Error en transformData - Argumento/s inválidos");
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