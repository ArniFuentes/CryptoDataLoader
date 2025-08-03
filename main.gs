const main = () => {
  console.log("Start execution");

  try {
    const data = extractData(apiUrl, options);

    const transformedData = transformData(data);

    writeToSheet(transformedData, sheetId, sheetName, tableHeaders);

    console.log("Execution completed");
  } catch (error) {
    throw error;
  }
};
