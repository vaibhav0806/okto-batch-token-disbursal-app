import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const CLIENT_API_KEY = process.env.REACT_APP_CLIENT_API_KEY;

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": CLIENT_API_KEY,
    "Content-Type": "application/json",
  },
});

export const authenticateUser = (idToken: string) => {
  return apiService.post("/api/v1/authenticate", { id_token: idToken });
};

export const setPin = (idToken: string, token: string, reloginPin: string) => {
  return apiService.post("/api/v1/set_pin", {
    id_token: idToken,
    token: token,
    relogin_pin: reloginPin,
    purpose: "set_pin",
  });
};

export const createWallet = (authToken: string) => {
  return apiService.post(
    "/api/v1/wallet",
    {},
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const refreshToken = (
  authToken: string,
  refreshToken: string,
  deviceToken: string
) => {
  return apiService.post(
    "/api/v1/refresh_token",
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "x-refresh-authorization": `Bearer ${refreshToken}`,
        "x-device-token": deviceToken,
      },
    }
  );
};

export const logoutUser = (authToken: string) => {
  return apiService.post(
    "/api/v1/logout",
    {},
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const getUserDetails = (authToken: string) => {
  return apiService.get("/api/v1/user_from_token", {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

export const getWallets = (authToken: string) => {
  return apiService.get("/api/v1/wallet", {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

export const getSupportedNetworks = (authToken: string) => {
  return apiService.get("/api/v1/supported/networks", {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

export const getSupportedTokens = (authToken: string, page = 1, size = 10) => {
  return apiService.get(`/api/v1/supported/tokens?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

export const getUserPortfolio = (authToken: string) => {
  return apiService.get("/api/v1/portfolio", {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

export const getUserPortfolioActivity = (
  authToken: string,
  limit = 10,
  offset = 0
) => {
  return apiService.get(
    `/api/v1/portfolio/activity?limit=${limit}&offset=${offset}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const transferTokens = (authToken: string, data: any) => {
  return apiService.post("/api/v1/transfers/tokens/execute", data, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

export const getOrdersHistory = (
  authToken: string,
  offset = 0,
  limit = 10,
  orderId?: string,
  orderState?: string
) => {
  let url = `/api/v1/orders?offset=${offset}&limit=${limit}`;
  if (orderId) url += `&order_id=${orderId}`;
  if (orderState) url += `&order_state=${orderState}`;

  return apiService.get(url, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

export const executeRawTransaction = (authToken: string, data: any) => {
  return apiService.post("/api/v1/rawtransaction/execute", data, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};
