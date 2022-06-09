import axiosClient from './axiosClient';

class Api {
  getBranchs = async (page, limit) => {
    return axiosClient.get('/branchs', {
      params: { page, limit },
    });
  };

  createBranch = async (data) => {
    return axiosClient.post('/branchs', data);
  };

  updateBranch = async (id, data) => {
    console.log(id);
    return axiosClient.patch(`/branchs/${id}`, data);
  };
}

export default new Api();
