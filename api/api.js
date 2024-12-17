import axios from "axios";
import Cookies from "js-cookie";

const generateDeviceToken = () => {
  return "device_" + Math.random().toString(12) + Date.now();
};

const getDeviceToken = () => {
  let device_token = Cookies.get("device_token");
  if (!device_token) {
    device_token = generateDeviceToken();
    Cookies.set("device_token", device_token, { expires: 365 });
  }
  return device_token;
};

const getCustomerToken = () => {
  let customer_token = Cookies.get("customer_token");
  if (!customer_token) {
    customer_token = getDeviceToken();
    Cookies.set("customer_token", customer_token, { expires: 365 });
  }

  return customer_token;
};

const makeRequest = async (method, path, payload, token) => {
  let device_token = getDeviceToken();
  let customer_token = getCustomerToken();

  try {
    const response = await axios({
      method: method,
      url: process.env.API_URL + path.replace(/^\//, ""),
      headers: {
        "device-token": device_token,
        "customer-token": token ?? customer_token,
      },
      data: payload,
      cache: "no-store",
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const get = async (path, customer_token = null) => {
  return makeRequest("GET", path, null, customer_token);
};

export const put = async (path, payload) => {
  return makeRequest("PUT", path, payload);
};

export const post = async (path, payload) => {
  return makeRequest("POST", path, payload);
};

export const list = async (path, payload, id) => {
  return makeRequest("LIST", path, { ...payload, id });
};

export const deleteMethod = async (path) => {
  return makeRequest("DELETE", path);
};

export const fetch = async (path, payload) => {
  return makeRequest("FETCH", path, payload);
};

