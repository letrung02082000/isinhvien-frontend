import { axiosWrapper } from '../../api';

class BusApi {
  createBusUser = async (data) => {
    return axiosWrapper.post('/api/bus-user', data);
  };
}

export default new BusApi();
