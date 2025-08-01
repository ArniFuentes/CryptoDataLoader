const main = () => {
  console.log("Start execution");

  try {
    const data = extractData(apiUrl, options);

    const transformedData = transformData(data);

    writeToSheet(transformedData, sheetId, sheetName, headersTable);
  } catch (error) {
    console.log("Error during execution:", error.message);
  }

  console.log("Execution completed");
};
