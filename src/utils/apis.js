import axios from "axios";
import { header } from "./header";

const api = axios.create({
    // baseURL: 'https://jsonplaceholder.typicode.com',
     // baseURL: process.env.REACT_APP_BASE_URL,
    // baseURL: 'http://103.29.70.46:15001/api/v1',
    baseURL: 'https://sahakka-api.kshrd-ite.com/api/v1',
    headers: header(),

    
    // baseURL: process.env.REACT_APP_BASE_URL,
});

export default api