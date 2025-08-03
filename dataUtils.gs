const extractData = (apiUrl, options) => {
  if (!apiUrl || !options) {
    throw new Error(
      `extractData error: missing argument(s). apiUrl: ${apiUrl} options: ${JSON.stringify(
        options
      )}`
    );
  }

  try {
    const response = UrlFetchApp.fetch(apiUrl, options);
    const content = response.getContentText();
    const data = JSON.parse(content);
    return data;
  } catch (error) {
    throw new Error(
      `extractData error: Failed to fetch or parse response. Error: ${error.message}`
    );
  }
};


const transformData = (data) => {
  if (!data) throw new Error("Error in transformData - missing argument");

  if (!Array.isArray(data.data)) {
    throw new Error("Error in transformData - data.data must be an array");
  }

  if (data.data.length === 0) {
    throw new Error("Error in transformData - data.data must be a non-empty array");
  }

  const records = data.data;

  const recordsReady = records.map((record) => [
    record.name,
    record.symbol,
    record.slug,
    record.num_market_pairs,
    record.circulating_supply,
    record.cmc_rank,
    record.quote?.USD?.price,
    data.status?.timestampp,
  ]);

  return recordsReady;
};

