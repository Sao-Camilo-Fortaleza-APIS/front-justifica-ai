import axios from "axios";
import Cookies from "js-cookie";


const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`
});

api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 401) {
        Cookies.remove('j.ai.token')
        Cookies.remove('j.ai.user')
        window.location.href = '/'
    }
    return Promise.reject(error)
})

export default api;