const main = () => {
  const data = extractData();
  const transformedData = transformData(data);
  loadData(transformedData);
};

