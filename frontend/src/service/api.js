const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getDashboard = () => API.get("/admin/dashboard");
export const getUsers = () => API.get("/users");