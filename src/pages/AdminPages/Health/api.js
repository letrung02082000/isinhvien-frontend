import { axiosWrapper } from "../../../api";

class HealthApi {
  createHealthPost = async (data) => {
    return axiosWrapper.post("/api/health", data);
  };

  getAllHealthPostss = async (page, limit) => {
    return axiosWrapper.get("/api/health/all", { params: { page, limit } });
  };

  getHealthPostById = async (id) => {
    return axiosWrapper.get(`/api/health/${id}`);
  };

  updateHealthPosts = async (id, data) => {
    return axiosWrapper.patch(`/api/health/${id}`, data);
  };
}

export default new HealthApi();
