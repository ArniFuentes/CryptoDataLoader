const writeToSheet = (transformedData, sheetId, sheetName, headersTable) => {
  if (!transformedData || !sheetId || !sheetName || !headersTable) {
    throw new Error("Error in writeToSheet - missing argument(s)");
  }

  if (!Array.isArray(headersTable) || !Array.isArray(headersTable[0])) {
    throw new Error("writeToSheet error: 'headersTable' must be a 2D array.");
  }

  const sheet = getSheet(sheetId, sheetName);
  const numRows = transformedData.length;
  const numCols = transformedData[0].length;

  const rangeHeaders = sheet.getRange(1, 1, 1, headersTable[0].length);
  const rangeData = sheet.getRange(2, 1, numRows, numCols);

  sheet.clearContents();

  rangeHeaders.setValues(headersTable);
  rangeData.setValues(transformedData);
};


const getSheet = (sheetId, sheetName) => {
  if (!sheetId || !sheetName) {
    throw new Error("Error in getSheet - missing argument(s)");
  }

  try {
    const book = SpreadsheetApp.openById(sheetId);
    const sheet = book.getSheetByName(sheetName);

    if (!sheet) throw new Error(`Sheet '${sheetName}' not found.`);

    return sheet;
  } catch (error) {
    throw new Error(
      `getSheet error: Failed to open sheet. book ID: ${sheetId} sheet Name: ${sheetName} Message: ${error.message}`
    );
  }
};
