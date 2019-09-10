import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:11057/api'});

export default instance;
