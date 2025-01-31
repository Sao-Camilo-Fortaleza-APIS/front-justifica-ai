import axios from "axios";
import Cookies from "js-cookie";


const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`
});

/**
 * Intercepta a resposta e verifica se o status é 401, caso seja, remove o token e redireciona para a página de login
 */
api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 401) {
        Cookies.remove('j.ai.token')
        Cookies.remove('j.ai.user')
        window.location.href = '/manager/login'
        console.log('Erro 401', error)
    }
    return Promise.reject(error)
})

/**
 * Intercepta a requisição e adiciona o token de autenticação para enviar ao backend
 */
api.interceptors.request.use((config) => {
    const token = Cookies.get('j.ai.token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;