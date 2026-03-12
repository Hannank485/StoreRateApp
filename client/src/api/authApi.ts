import api from "./client";

const authApi = {
  async register(
    name: string,
    email: string,
    password: string,
    address: string,
  ) {
    await api.post("/auth/register", { name, email, password, address });
  },

  async login(email: string, password: string) {
    await api.post("/auth/login", { email, password });
  },

  async checkAuth() {
    const response = await api.get("/auth/me");
    return response.data;
  },
  async logout() {
    await api.post("/auth/logout");
  },
  async updatePassword(password: string) {
    await api.patch("/auth/", { password });
  },
};

export default authApi;
