const { default: axios } = require("axios");
const endpoint = "http://34.67.179.74:3000/";
const connectAPI = async ({ method, service, headers = {}, params, body, withCredentials=false  }) => {
  try {
    headers["Content-Type"] = "application/json";
    const response = await axios({
      method: method,
      url: endpoint + service,
      params,
      data: body,
      headers,
      withCredentials
    });
    return response.data;
  } catch (error) {
    console.log('error::: ', error);
    const errorBody = {
      error: true,
      status: 400,
      message: error.message
    }
    if (error.response) {
      console.log(error.response, ' ;;;;;; response');
      errorBody.status = error.response.status;
      errorBody.message = error.response.data.message;
    } else if (error.request) {
      errorBody.status = 500;
      errorBody.message = error.request;
    }

    return errorBody;
  }
}


export default connectAPI;
