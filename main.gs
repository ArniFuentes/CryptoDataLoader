const main = () => {
  try {
    console.log("Inicio del flujo principal.");
    const data = extractData();
    console.log("Datos extraídos correctamente.");
    const transformedData = transformData(data);
    console.log("Datos transformados correctamente.");
    loadData(transformedData);
    console.log("Datos cargados correctamente en la hoja de cálculo.");
  } catch (error) {
    console.error(
      "Error en main: Ocurrió un problema durante la ejecución.",
      error
    );
  }
};
