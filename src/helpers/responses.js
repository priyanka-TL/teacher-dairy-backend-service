/**
 * name : helpers/responses.js
 * author : Priyanka Pradeep
 * Date : 30-Jan-2025
 * Description : Response constants used in this service
 */

const { elevateLog } = require("elevate-logger");
const logger = elevateLog.init();
const successResponse = async ({
  statusCode = 500,
  responseCode = "OK",
  message,
  result = [],
}) => {
  let response = {
    statusCode,
    responseCode,
    message,
    result,
  };
  logger.info("Request Response", { response: response });

  return response;
};

const failureResponse = ({
  message = "Oops! Something Went Wrong.",
  statusCode = 500,
  responseCode,
  result,
}) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.responseCode = responseCode;
  error.data = result || [];

  return error;
};

module.exports = {
  successResponse,
  failureResponse,
};
