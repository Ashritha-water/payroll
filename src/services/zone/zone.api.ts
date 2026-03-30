import { api } from "../api";
import { ENDPOINTS } from "../endpoints";

export const getZones = async () => {
  const res = await api.get(ENDPOINTS.ZONE.LIST);
  return res.data;
};