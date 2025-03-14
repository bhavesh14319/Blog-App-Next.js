import axios from "axios";

const instance = axios.create({
    // baseURL : "http://localhost:4000/api/v1",
    baseURL: "https://blog-app-next-js-one.vercel.app/api/v1",
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})

export default instance;
