import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:8010/proxy'});

instance.interceptors.request.use((conf) => {
    conf.headers['user-key'] = process.env.VUE_APP_API_KEY;
    return conf;
});

export default instance;
