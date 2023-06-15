import Cookies from "js-cookie"

const URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};
const CONTENT_HEADERS = {
  "Accept": "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
};

const AUTH_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh";
const FINGERPRINT_KEY = "fingerprint";
const USER_ID = "user_id";

const METHODS = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  put: "PUT",
};

const ROUTES = {
  login: "/api/v1/login",
  register: "/api/v1/register",
  refresh: "/api/v1/refresh",
  profile: "/api/v1/users/profile",
  pushToken: "/api/v1/users/push_token",
  // product
  checkProductLink: "/api/v1/product/page/check",
  addProduct: "/api/v1/product/page",
  indexProducts: "/api/v1/products",
  productStatus: "/api/v1/products/:id/toggle_status",
  productPlan: "/api/v1/products/:id/strategy",
  // search
  checkSearchesLink: "/api/v1/search/page/check",
  addSearch: "/api/v1/search/page",
  indexSearches: "/api/v1/searches",
  searchStatus: "/api/v1/searches/:id/toggle_status",
  searchPlan: "/api/v1/products/:id/strategy",
};

const PLANS = ["basic", "medium", "advanced", "enthusiast", "extreme"];

function formatUrl(url, params) {
  return Object
    .keys(params)
    .reduce(
      (acc, key) => acc.replaceAll(`:${key}`, params[key]),
      url
    )
}

function saveTokens(result) {
  Cookies.set(AUTH_TOKEN_KEY, result.token)
  Cookies.set(REFRESH_TOKEN_KEY, result.refresh)
}

function saveSessionData(result) {
  Cookies.set(USER_ID, result.id)
}

function deleteTokens() {
  Cookies.remove(AUTH_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
}

function getAuthToken() {
  return Cookies.get(AUTH_TOKEN_KEY);
}

function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN_KEY);
}

function getFingerprint() {
  return Cookies.get(FINGERPRINT_KEY);
}

function getSessionData() {
  return {
    [USER_ID]: Cookies.get(USER_ID),
    [FINGERPRINT_KEY]: Cookies.get(FINGERPRINT_KEY),
  };
}

function canCallAuthEndpoints() {
  return getAuthToken() && getRefreshToken();
}

function authHeaders() {
  return {authorization: `Bearer ${getAuthToken()}`};
}

function availableProductPages() {
  return ["Amazon"];
}

function availableSearchPages() {
  return ["Amazon"];
}

async function request({method, path, body, headers}) {
  const response = await fetch(URL + path, {
    method,
    body: JSON.stringify(body),
    headers: Object.assign(DEFAULT_HEADERS, headers),
  });
  const {status, url, ok} = response;
  if (status === 204) {
    body = {};
  } else {
    body = await response.json();
  }
  return {body, status, url, ok};
}

async function authRequest({method, path, body, headers}) {
  if (!canCallAuthEndpoints()) {
    return {status: 500}
  }

  let result = await request({method, path, body, headers: Object.assign(authHeaders(), headers)});
  if (result.status === 401) {
    const refresh_token = getRefreshToken();
    if (refresh_token) {
      result = await request({method: METHODS.post, path: ROUTES.refresh, body: {refresh_token}});
      if (result.status === 200) {
        saveTokens(result.body);
        return await request({method, path, body, headers: Object.assign(authHeaders(), headers)});
      }
    }
  }
  return result;
}

async function login(email, password) {
  const result = await request({method: METHODS.post, path: ROUTES.login, body: {email, password}});
  if (result.status === 200) {
    saveTokens(result.body);
    return result;
  }
  return null;
}

function logout() {
  deleteTokens();
}

async function register(firstName, lastName, email, password) {
  return await request({method: METHODS.post, path: ROUTES.register, body: {first_name: firstName, last_name: lastName, email, password}});
}

async function checkProductLink(link) {
  return await request({method: METHODS.post, path: ROUTES.checkProductLink, body: {link}});
}

async function profile() {
  const response = await authRequest({method: METHODS.get, path: ROUTES.profile, headers: CONTENT_HEADERS});
  if (response.status === 200) {
    saveSessionData(response.body.data);
  }
  return response;
}

async function pushToken(token) {
  const device_fingerprint = getFingerprint();
  return await authRequest({method: METHODS.post, path: ROUTES.pushToken, body: {device_fingerprint, token}});
}

async function allProducts() {
  return await authRequest({method: METHODS.get, path: ROUTES.indexProducts, headers: CONTENT_HEADERS});
}

async function toggleProductStatus(id) {
  const path = formatUrl(ROUTES.productStatus, {id});
  return await authRequest({method: METHODS.patch, path, body: {data: {attributes:{}}}});
}

async function addProduct(code) {
  return await authRequest({method: METHODS.post, path: ROUTES.addProduct, body: {code}});
}

async function changeProductPlan(id, plan) {
  if (PLANS.indexOf(plan) < 0) {
    return {status: 500};
  }

  const path = formatUrl(ROUTES.productPlan, {id});
  return await authRequest({method: METHODS.patch, path, body: {data: {attributes:{check_strategy: plan}}}});
}

async function allSearches() {
  return await authRequest({method: METHODS.get, path: ROUTES.indexSearches, headers: CONTENT_HEADERS});
}

async function checkSearchesLink(link) {
  return await request({method: METHODS.post, path: ROUTES.checkSearchesLink, body: {link}});
}

async function toggleSearchStatus(id) {
  const path = formatUrl(ROUTES.searchStatus, {id});
  return await authRequest({method: METHODS.patch, path, body: {data: {attributes:{}}}});
}

async function addSearch(code) {
  return await authRequest({method: METHODS.post, path: ROUTES.addSearch, body: {code}});
}

async function changeSearchPlan(id, plan) {
  if (PLANS.indexOf(plan) < 0) {
    return {status: 500};
  }

  const path = formatUrl(ROUTES.searchPlan, {id});
  return await authRequest({method: METHODS.patch, path, body: {data: {attributes:{check_strategy: plan}}}});
}

const api = {
  login,
  logout,
  register,
  profile,
  pushToken,
  getSessionData,
  // general products
  availableProductPages,
  availableSearchPages,
  // products
  checkProductLink,
  allProducts,
  toggleProductStatus,
  addProduct,
  changeProductPlan,
  // searches
  checkSearchesLink,
  allSearches,
  toggleSearchStatus,
  addSearch,
  changeSearchPlan,
};

export default api;
