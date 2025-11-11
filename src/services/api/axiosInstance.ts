import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '/mock',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
})

export default axiosInstance