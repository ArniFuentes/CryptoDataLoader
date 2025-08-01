const writeToSheet = (transformedData, sheetId, sheetName, headersTable) => {
  if (!transformedData || !sheetId || !sheetName || !headersTable) {
    throw new Error("Error in writeToSheet - Invalid argument(s)");
  }

  const sheet = getSheet(sheetId, sheetName);
  const numRows = transformedData.length;
  const numCols = transformedData[0].length;

  const rangeHeaders = sheet.getRange(1, 1, 1, headersTable[0].length);
  const rangeData = sheet.getRange(2, 1, numRows, numCols);

  rangeHeaders.setValues(headersTable);
  rangeData.setValues(transformedData);
};


const getSheet = (sheetId, sheetName) => {
  if (!sheetId || !sheetName) {
    throw new Error("Error in getSheet - Invalid argument(s)");
  }
  const book = SpreadsheetApp.openById(sheetId);
  const sheet = book.getSheetByName(sheetName);

  if (!sheet) throw new Error(`Sheet '${sheetName}' not found.`);

  return sheet;
};
