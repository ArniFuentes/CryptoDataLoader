const main = () => {
  try {
    console.log("Iniciar ejecución");
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = "Hoja 1";
    const sheet = book.getSheetByName(sheetName);
    const headers = [
      [
        "Name",
        "Symbol",
        "Slug",
        "Market Pairs",
        "Circulating Supply",
        "CMC Rank",
        "Price",
        "Timestamp",
      ],
    ];
    const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const params = "?start=1&limit=50&convert=USD";
    const apiKey = PropertiesService.getScriptProperties().getProperty("API_KEY");
    const headersFetch = { Accept: "application/json", "X-CMC_PRO_API_KEY": apiKey };

    writeHeaders(sheet, "A1:H1", headers);
    const data = fetchData(url, params, headersFetch);
    const transformedData = transformData(data);
    writeData(sheet, "A2:H51", transformedData);
    console.log("Ejecución finalizada");
  } catch (error) {
    console.error(
      "Error: Ocurrió un problema durante la ejecución.",
      error
    );
  }
};
