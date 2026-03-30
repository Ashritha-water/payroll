import { api } from "../api";
import { ENDPOINTS } from "../endpoints";

type QualificationPayload = {
  degree: string;
  specialization: string;
  institution: string;
  year_of_passing: number;
  percentage: number;
  is_primary_qualification: boolean;
};

export const createEmployee = async (payload:any) => {
  const res = await api.post(ENDPOINTS.EMPLOYEE.CREATE,payload);
  return res.data
}

export const getEmployees = async () => {
  const res = await api.get(ENDPOINTS.EMPLOYEE.CREATE);
  return res.data;
};

export const getEmployeeById = async (id: string) => {
  const res = await api.get(ENDPOINTS.EMPLOYEE.GET(id));
  return res.data;
};

export const getEmployeeProfileOverview = async (id: string) => {
  const res = await api.get(ENDPOINTS.EMPLOYEE.PROFILE_OVERVIEW(id));
  return res.data;
}

export const getEmployeServiceHistory = async (id: string) => {
  const res = await api.get(ENDPOINTS.EMPLOYEE.SERVICE_HISTORY(id));
  return res.data;
};

export const getEmployeQualifications = async (id: string) => {
  const res = await api.get(ENDPOINTS.EMPLOYEE.QUALIFICATIONS(id));
  return res.data;
};

export const addEmployeQualifications = async (id: string,payload:QualificationPayload) => {
  const res = await api.post(ENDPOINTS.EMPLOYEE.ADD_QUALIFICATION(id),payload);
  return res.data;
};