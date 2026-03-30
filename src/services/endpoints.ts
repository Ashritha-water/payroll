export const ENDPOINTS = {
  EMPLOYEE: {
    CREATE: "/employees",
    GET: (id: string) => `/employees/${id}`,
    PROFILE_OVERVIEW: (id: string) => `/employees/${id}/profile-overview`,
    SERVICE_HISTORY:(id:string) => `/employees/service/${id}`,
    QUALIFICATIONS:(id: string) => `/employees/education/${id}`,
    ADD_QUALIFICATION:(id:string) => `/employees/education/${id}`
  },
  DESIGNATION:{ 
    LIST: '/designations',
    CADRE: (id: number) => `/designations/${id}/cadre`,
  },

  ZONE: {
    LIST: '/zones',
  },

  DEPARTMENT: {
    LIST: '/departments'
  },

  PAYROLL: {
    LIST: "/payroll",
  },

  AUTH: {
    LOGIN: "/auth/login",
  },
};