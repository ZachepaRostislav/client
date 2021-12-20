import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';

export default class UserService { 
    // функция возвращает промис и ожидает список пользователей IUser[]
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}
