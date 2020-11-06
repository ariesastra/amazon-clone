import axios from 'axios';

// base url to make request
const instance = axios.create({
    baseURL : "...",
    mode: 'no-cors',
});

export default instance;