function validateConfig(properties) {
  const required = ['API_KEY', 'projectId', 'datasetId', 'tableId', 'email'];

  const missing = required.filter((key) => !properties.getProperty(key));

  if (missing.length > 0) throw new Error(`Missing required properties: ${missing.join(', ')}`);
}
