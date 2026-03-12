import api from "./client";

const userApi = {
  async getStores() {
    const response = await api.get("/stores/");
    return response.data;
  },
  async rateStores(id: number, rating: number) {
    await api.post(`/rating/${id}`, { rating });
  },
};
export default userApi;
