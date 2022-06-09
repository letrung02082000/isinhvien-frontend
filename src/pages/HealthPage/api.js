import { axiosWrapper } from '../../api';

class GuideApi {
  constructor() {}

  getAllGuides = async (page, limit) => {
    return axiosWrapper.get('/api/health', { params: { page, limit } });
  };
}

export default new GuideApi();
