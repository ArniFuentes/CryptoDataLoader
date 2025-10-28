function main() {
  try {
    const data = extractData(apiUrl, options);

    const transformedDataForBigQuery = transformDataForBigQuery(data);
    
    insertToBigQuery(projectId, datasetId, tableId, transformedDataForBigQuery);
  } catch (error) {
    throw error;
  }
}
