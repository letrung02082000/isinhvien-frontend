import { axiosWrapper } from '../../api';

class GuideApi {
  getGuideById = async (id) => {
    return axiosWrapper.get(`/api/guide/${id}`);
  };
}

export default new GuideApi();
