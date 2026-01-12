function retry(fn, maxRetries = 3) {
  if (!fn) throw new Error("Error in retry function: missing argument(s)");

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return fn();

    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = 1000 * Math.pow(2, attempt);
      Utilities.sleep(delay);
    }
  }
}
