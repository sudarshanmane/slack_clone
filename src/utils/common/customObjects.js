export const internalServerErrorResponse = (error) => {
  return {
    success: false,
    err: error.toString(),
    data: {},
    message: 'Internal Server Error!'
  };
};

export const customErrorResponse = (error) => {
  if (!error.message && !error.explanation) {
    return internalServerErrorResponse(error);
  }

  return {
    success: false,
    err: error.explanation,
    data: {},
    message: error.message
  };
};

export const successReponse = (data, message) => {
  return {
    success: true,
    message,
    data
  };
};
