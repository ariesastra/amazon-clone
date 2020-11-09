import axios from "axios";

// base url to make request
const instance = axios.create({
    // baseURL : "http://localhost:5001/clone-5c7be/us-central1/api",
    baseURL : "https://us-central1-clone-5c7be.cloudfunctions.net/api",
    // mode: 'no-cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

export default instance;