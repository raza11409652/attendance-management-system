import { LoginBody, LoginResponse, RegisterBody } from "../types";
import axios from "./axios";

export const loginApi = async (body: LoginBody) => {
  const { data } = await axios.post<LoginResponse>("auth/login", body);
  return data;
};

export const registerApi = async (body: RegisterBody) => {
  const { data } = await axios.post<object>("auth/register", body);
  return data;
};
