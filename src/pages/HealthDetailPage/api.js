import { axiosWrapper } from '../../api';

class GuideApi {
  getGuideById = async (id) => {
    return axiosWrapper.get(`/api/health/${id}`);
  };
}

export default new GuideApi();
