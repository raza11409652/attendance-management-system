import { NewRosterBody, Roster } from "../types";
import axios from "./axios";

export const getRostersApi = async () => {
  const { data } = await axios.get<Roster[]>("rosters");
  return data;
};

export const rosterCreateApi = async (b: NewRosterBody) => {
  const { data } = await axios.post<Roster>("rosters", b);
  return data;
};
