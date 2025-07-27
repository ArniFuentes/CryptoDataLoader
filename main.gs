const main = () => {
  console.log("Iniciar ejecución");

  try {
    const data = extractData(apiUrl, options);

    const transformedData = transformData(data);

    writeToSheet(transformedData, sheetId, sheetName, headersTable);
  } catch (error) {
    console.error("Error durante la ejecución:", error);
  }

  console.log("Ejecución finalizada");
};
