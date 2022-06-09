import { axiosWrapper } from '../../api';

class GuideApi {
  constructor() {}

  getAllGuides = async (page, limit) => {
    return axiosWrapper.get('/api/guide', { params: { page, limit } });
  };
}

export default new GuideApi();
