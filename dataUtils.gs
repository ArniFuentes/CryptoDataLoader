const extractData = (apiUrl, options) => {
  if (!apiUrl || !options) throw new Error("Error in extractData function: missing argument(s)");

  try {
    const response = UrlFetchApp.fetch(apiUrl, options);
    const content = response.getContentText();
    const data = JSON.parse(content);
    return data;
  } catch (error) {
    error.message = `Error in extractData function: ${error.message}`;
    throw error;
  }
};


const transformDataForBigQuery = (data) => {
  if (!data) throw new Error("Error in transformDataForBigQuery - missing argument");

  if (!Array.isArray(data.data)) throw new Error("Error in transformDataForBigQuery - data.data must be an array");

  if (data.data.length === 0) throw new Error("Error in transformDataForBigQuery - data.data must be a non-empty array");

  try {
    const records = data.data;

    const recordsReady = records.map((record) => ({
      name: record.name,
      symbol: record.symbol,
      slug: record.slug,
      num_market_pairs: record.num_market_pairs,
      circulating_supply: record.circulating_supply,
      cmc_rank: record.cmc_rank,
      price: record.quote.USD.price,
      timestamp: data.status.timestamp,
    }));

    return recordsReady;
  } catch (error) {
    error.message = `Error in transformDataForBigQuery function: ${error.message}`;
    throw error;
  }
};
