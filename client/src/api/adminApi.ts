import api from "./client";

const adminApi = {
  async dashboard() {
    const response = await api.get("/admin/dashboard");
    return response.data;
  },
  async getUsers() {
    const response = await api.get("/admin/users");
    return response.data;
  },
  async createUser(
    name: string,
    email: string,
    password: string,
    address: string,
    role: string,
  ) {
    await api.post("/admin/users", { name, email, password, address, role });
  },
  async getStore() {
    const response = await api.get("/stores/");
    return response.data;
  },

  async createStore(
    name: string,
    email: string,
    address: string,
    userId: number,
  ) {
    await api.post("/admin/stores", { name, email, address, userId });
  },
};
export default adminApi;
