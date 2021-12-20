import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
    // указываем true что бы к каждому полю cookie цеплялись автоматически
    withCredentials: true,
    baseURL: API_URL,
})
// $api.interceptors на каждый запрос будет цепляться токен
// чтобы header не цеплять вручную каждый раз
// config - инстанс аксиоса
$api.interceptors.request.use((config: any) => {
    // headers.Authorization присваиваем токен который будет храниться в локальном хранилище по ключу token который мы оттуда достаем
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.request.use(
    (config: any) => {
        return config
    },
    (async (error:any) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
           try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`,{ withCredentials: true });
            localStorage.setItem('token',response.data.accessToken);
            return $api.request(originalRequest)
           } catch (error) {
               console.log('Not Authorized')
           }
        }
        throw error;
    })
)

export default $api
