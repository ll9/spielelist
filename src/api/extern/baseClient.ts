import axios from 'axios';

const instance = axios.create({baseURL: process.env.VUE_APP_PROXY_URL});

instance.interceptors.request.use((conf) => {
    conf.headers['user-key'] = process.env.VUE_APP_API_KEY;
    return conf;
});

export default instance;
