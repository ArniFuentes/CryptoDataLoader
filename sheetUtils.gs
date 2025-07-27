const writeToSheet = (transformedData, sheetId, sheetName, headersTable) => {
  if (!transformedData || !sheetId || !sheetName || !headersTable) {
    throw new Error("Error en writeToSheet - Argumento/s inválidos");
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
    throw new Error("Error en getSheet - Argumento/s inválidos");
  }
  const book = SpreadsheetApp.openById(sheetId);
  const sheet = book.getSheetByName(sheetName);
  if (!sheet) throw new Error(`Hoja '${sheetName}' no encontrada.`);
  return sheet;
};
