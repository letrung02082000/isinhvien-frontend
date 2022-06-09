import { axiosWrapper } from '../../api';

class GuideApi {
  constructor() {}

  getGuideById = async (id) => {
    return axiosWrapper.get('/api/guide', { params: { page, limit } });
  };
}

export default new GuideApi();
