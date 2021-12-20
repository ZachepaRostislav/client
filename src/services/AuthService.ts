import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";


export default class AuthService {
    static async login(email:string,password:string): Promise<AxiosResponse<AuthResponse>> {
        // первый параметр указывается ендпоинт '/login'  второй это тело запроса {email,password} 
        // AuthResponse дженерик указывается для прозрачности объекта data
        return $api.post<AuthResponse>('/login',{email,password}) 
    }

    static async registration(email:string,password:string): Promise<AxiosResponse<AuthResponse>> {
        // первый параметр указывается ендпоинт '/registration'  второй это тело запроса {email,password} 
        // AuthResponse дженерик указывается для прозрачности объекта data
        return $api.post<AuthResponse>('/registration',{email,password})               
    }
    // неважно что данная функция возвращает поэтому void , так как для logout нужно просто нажать на кнопку
    static async logout(): Promise<void> {
            return $api.post('/logout')
    }     
 }