import { api } from "../api";
import { ENDPOINTS } from "../endpoints";

export const login = async (payload: {
  username: string;
  password: string;
}) => {
  const res = await api.post(ENDPOINTS.AUTH.LOGIN, payload);
  return res.data;
};