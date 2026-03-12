import api from "./client";

const ownerApi = {
  async getUserStores() {
    const response = await api.get("/stores/me");
    return response.data;
  },
};

export default ownerApi;
