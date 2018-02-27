import axios from "axios";

axios.defaults.headers.post["Accept"] = "*/*";

const instance = axios.create({
  baseURL: "https://lorem-ipsum.online/",
  headers: { Accept: "*/*" }
});

const jsonInstance = axios.create({
  baseURL: "https://lorem-ipsum.online/",
  headers: { "Content-Type": "application/json" }
});

export const setTokenApi = access_token => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};

export const clearTokenApi = () => {
  instance.defaults.headers.common["Authorization"] = undefined;
};

export const login = ({ email, password }) =>
  jsonInstance
    .post("/user_token", { auth: { email, password } })
    .then(response => {
      if (response.data.result === "error") return Promise.reject(response);
      return response;
    });

export const registration = ({ email, password }) =>
  instance
    .post("/users", `email=${email}&password=${password}`)
    .then(response => {
      if (response.data.result === "error") return Promise.reject(response);
      return response;
    });

export const candles = (symbol, offset) =>
  instance.get("/candles", { params: { symbol, offset } });

export const getWallet = () => instance.get("/users/wallet");

export const getUserInfo = () => instance.get("/users/me");

export const buyCurrency = (currency, value) =>
  instance
    .get(`stock/exchange?symbol=${currency}&operation=purchase&sum=${value}`)
    .then(response => {
      if (response.data.result === "error")
        return Promise.reject(response.data.message);
      return response;
    });

export const sellCurrency = (currency, value) =>
  instance
    .get(`stock/exchange?symbol=${currency}&operation=sell&sum=${value}`)
    .then(response => {
      if (response.data.result === "error")
        return Promise.reject(response.data.message);
      return response;
    });
