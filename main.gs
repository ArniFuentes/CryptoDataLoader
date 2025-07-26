const main = () => {
  console.log("Iniciar ejecución");
  
  try {
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty("spreadsheetId");
    const book = SpreadsheetApp.openById(spreadsheetId);
    const sheet = book.getSheetByName(sheetName);
    const apiKey = PropertiesService.getScriptProperties().getProperty("API_KEY");
    const headersFetch = {
      Accept: "application/json",
      "X-CMC_PRO_API_KEY": apiKey,
    };
    writeHeaders(sheet, rangeHeaders, headers);
    const data = fetchData(api_url, headersFetch);
    const transformedData = transformData(data);
    const numRows = transformedData.length;
    const numColumns = transformedData[0].length;
    const rangeData = sheet.getRange(2, 1, numRows, numColumns);
    writeData(rangeData, transformedData);
  } catch (error) {
    console.error("Error: Ocurrió un problema durante la ejecución.", error);
  }

  console.log("Ejecución finalizada");
};
