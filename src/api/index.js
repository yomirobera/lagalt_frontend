import axios from "axios";
import keycloak from "../components/keycloak/keycloak";

/**
 * Set the Authorization header to be they keycloak Token
 * @param { AxiosRequestHeaders } headers
 * @param { Keycloak } keycloak
 * @returns { import("axios").AxiosRequestHeaders } header
 */
const setAuthorizationHeader = (headers, keycloak) => {
  const { token } = keycloak;
  return {
    ...headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

axios.interceptors.request.use(async (config) => {
  // No keycloak auth exists - Assume public path
  if (!keycloak.authenticated) {
    return config;
  }

  if (!keycloak.isTokenExpired()) {
    return {
      ...config,
      headers: setAuthorizationHeader(config.headers, keycloak),
    };
  }

  // Token is expired, prepare to refresh.
  const HOUR_IN_SECONDS = 3;

  try {
    await keycloak.updateToken(HOUR_IN_SECONDS);
  } catch (error) {
    console.log("Could not refresh Keycloak Token:  Axios Interceptor");
  }

  // Return with updated token
  return {
    ...config,
    headers: setAuthorizationHeader(config.headers, keycloak),
  };
});

/** @type { Axios } */
export default axios;