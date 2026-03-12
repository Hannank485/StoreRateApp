import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
// HANDLE ROUTING TO LOGIN PAGE
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ERROR HANDLING
export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || "Something went wrong";
  }
  return "Something went wrong";
};
export default api;
