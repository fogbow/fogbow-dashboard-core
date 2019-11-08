import axios from 'axios';
import { env } from '../defaults/api.config';

class VolumesProvider {
  config = {
    headers: {
      'Fogbow-User-Token': localStorage.getItem('token'),
    }
  };

  create(body) {
    return axios.post(env.serverEndpoint + '/volumes', body, this.config);
  }

  get() {
    return axios.get(env.serverEndpoint + '/volumes'.concat('/status'), this.config);
  }

  getData(id) {
    return axios.get(env.serverEndpoint + '/volumes'.concat('/', id), this.config);
  }

  delete(id) {
    return axios.delete(env.serverEndpoint + '/volumes'.concat('/', id), this.config);
  }
}

export default VolumesProvider;
