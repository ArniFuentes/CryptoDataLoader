const main = () => {
  const data = extractData();
  const transformedData = transformToArray(data);
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName("Hoja 1");
  const range = sheet.getDataRange();
  const lastRow = range.getLastRow(); 
  const numberOfRowsToAdd = transformedData.length; 
  const rangeLimits = `A${lastRow + 1}:I${lastRow + numberOfRowsToAdd}`;
  const rangeToAddNewData = sheet.getRange(rangeLimits);
  rangeToAddNewData.setValues(transformedData)
};

