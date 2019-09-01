import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:8010/proxy'});

instance.interceptors.request.use((conf) => {
    conf.headers['user-key'] = '9c07fe47a184edfab6eb1ca1107443e8';
    return conf;
});

export default instance;
