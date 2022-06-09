import { axiosWrapper } from "../../../api";

class GuideApi {
  createGuide = async (data) => {
    return axiosWrapper.post("/api/guide", data);
  };

  getAllGuides = async (page, limit) => {
    return axiosWrapper.get("/api/guide/all", { params: { page, limit } });
  };

  getGuideById = async (id) => {
    return axiosWrapper.get(`/api/guide/${id}`);
  };

  updateGuide = async (id, data) => {
    return axiosWrapper.patch(`/api/guide/${id}`, data);
  };
}

export default new GuideApi();
