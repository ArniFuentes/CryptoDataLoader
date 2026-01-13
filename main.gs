function main() {
  try {
    console.log('Starting...');

    validateConfig(properties);

    const data = retry(() => extractData(apiUrl, options));
    console.log(`Extracted ${data.data.length} records from API`);

    const transformedData = transformDataForBigQuery(data);
    console.log(`Transformed ${transformedData.length} records`);

    retry(() => insertToBigQuery(projectId, datasetId, tableId, transformedData));
    console.log(`Inserted ${transformedData.length} rows to BigQuery`);

  } catch (error) {
    MailApp.sendEmail({ to: email, subject: "Error in the script", body: error.message });
    
    throw error;
  }
}
