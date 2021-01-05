import axios from "axios";
import { api_url } from "../Utils/constants";
 
export const LOGIN_URL = "auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const FORGOT_PASSWORD_URL = "auth/forgotPassword"
export const CONFIRM_FORGOT_PASSWORD = "auth/confirmForgotPassword"

export const ME_URL = "user/me";

export function login(data) {
  return axios.post(api_url + LOGIN_URL, data);
}
export function forgotPassword(email, hostFront) {
  return axios.post(api_url + FORGOT_PASSWORD_URL, { email, hostFront });
}

export function confirmForgotPassword(email, strConfirm, newPassword) {
  return axios.post(api_url + CONFIRM_FORGOT_PASSWORD, { email, strConfirm, newPassword });
}

export function register(email, fullname, username, password) {
  return axios.post(api_url + REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(api_url + REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken(token) {
  return axios.get(api_url + ME_URL + '?token=' + token);
}
