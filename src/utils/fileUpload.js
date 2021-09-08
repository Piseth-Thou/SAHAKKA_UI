import axios from "axios";

const fileUploadApi = axios.create({
    // baseURL: 'https://jsonplaceholder.typicode.com',
    baseURL: 'http://103.29.70.46:15001/',


    // baseURL: process.env.REACT_APP_BASE_URL,

});

export default fileUploadApi