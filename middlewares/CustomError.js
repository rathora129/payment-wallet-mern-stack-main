class CustomError extends Error {
  httpStatusCode;
  timeStamp;
  documentationUrl;

  constructor(message, httpStatusCode, documentationUrl) {
    if (message) {
      supper(message);
    } else {
      super("An error occurred");
    }
    this.httpStatusCode = httpStatusCode;
    this.timeStamp = new Date().toISOString();
    this.documentationUrl = documentationUrl;

    Error.captureStackTrace(this, this.constructor);
    // what is stack trace
    // The stack property of new Error().stack is a string that represents the point in the code at which the Error was instantiated.
  }
}

export default CustomError;
