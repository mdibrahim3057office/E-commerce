import axiosInstance from "../../utils/axiosInstance";

// Register user
export const registerUserAPI = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

// Login user
export const loginUserAPI = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};
