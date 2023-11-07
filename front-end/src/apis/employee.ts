import { CreateEmployee, GetEmployeeApiResponse } from "../types";
import axios from "./axios";

export const getEmployeeListApi = async (page: number) => {
  const { data } = await axios.get<GetEmployeeApiResponse>("users", {
    params: { page },
  });
  return data;
};
export const createEmployeeApi = async (body: CreateEmployee) => {
  const { data } = await axios.post<object>("users", body);
  return data;
};
