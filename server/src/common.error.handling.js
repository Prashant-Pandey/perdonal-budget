function internalServerError(error) {
  return {
    err: {
      status: 500,
      message: error
    }
  };
}

function clientBasedError(error) {
  return {
    err: {
      status: 400,
      message: error
    }
  };
}

module.exports = {
  internalServerError,
  clientBasedError
};
