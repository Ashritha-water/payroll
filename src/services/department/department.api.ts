import { api } from "../api";
import { ENDPOINTS } from "../endpoints";

export const getDepartments = async () => {
  const res = await api.get(ENDPOINTS.DEPARTMENT.LIST);
  return res.data;
};