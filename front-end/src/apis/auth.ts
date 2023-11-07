import { LoginBody, LoginResponse } from "../types";
import axios from "./axios";

export const loginApi = async (body: LoginBody) => {
  const { data } = await axios.post<LoginResponse>("auth/login", body);
  return data;
};
