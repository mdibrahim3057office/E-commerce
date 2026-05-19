import axiosInstance from "../../utils/axiosInstance";

// Admin login API
export const loginAdminAPI = async (credentials) => {
  const res = await axiosInstance.post("/auth/login", credentials);
  return res.data;
};
