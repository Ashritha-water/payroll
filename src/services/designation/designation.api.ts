import { api } from "../api";
import { ENDPOINTS } from "../endpoints";

export const getDesignations = async () => {
  const res = await api.get(ENDPOINTS.DESIGNATION.LIST);
  return res.data;
};

export const getCadreByDesignation = async (id: number) => {
  const res = await api.get(ENDPOINTS.DESIGNATION.CADRE(id));
  return res.data;
};