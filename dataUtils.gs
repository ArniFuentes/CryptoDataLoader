const extractData = (apiUrl, options) => {
  if (!apiUrl || !options) {
    throw new Error("Error in extractData - Invalid argument(s)");
  }
  const response = UrlFetchApp.fetch(apiUrl, options);
  const data = JSON.parse(response.getContentText());
  return data
};


const transformData = (data) => {
  if (!data || !data.data || !Array.isArray(data.data)) {
    throw new Error("Error in transformData - Invalid argument(s)");
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
