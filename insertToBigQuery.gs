function insertToBigQuery(projectId, datasetId, tableId, results) {
  if (!projectId || !datasetId || !tableId || !results) {
    throw new Error("Error in insertToBigQuery function: missing argument(s)");
  }

  const rows = results.map((row) => ({ json: row }));

  const insertAllRequest = {
    kind: 'bigquery#tableDataInsertAllRequest',
    rows: rows
  };

  const response = BigQuery.Tabledata.insertAll(insertAllRequest, projectId, datasetId, tableId);

  if (response.insertErrors) {
    throw new Error(
      `Error in insertToBigQuery function: ${JSON.stringify(response.insertErrors, null, 2)}`
    );
  }

  console.log(`Inserted ${results.length} rows to BigQuery`);
}
