import axios, { AxiosError } from "axios"
import { GetAllUserData, GetUserDataWithoutId, GetUsersData, UserData } from "./custom"

export async function postUserData(data: FormData):Promise<UserData> {
    return axios
        .post<UserData>("http://localhost:3000/register", data)
        .then(res => res.data)
        .catch(err => err.data)
}

export async function getUsersData():Promise<GetUsersData[]> {
    return axios
        .get<GetUsersData[]>("http://localhost:3000/users")
        .then(res => res.data)
        .catch(err => err.data)
}

export async function getUserData(param: string):Promise<GetUserDataWithoutId> {
    return axios
        .get<GetUserDataWithoutId>(`http://localhost:3000/user/${param}`)
        .then(res => res.data)
        .catch(err => err.data)
}

export async function UpdateUserData({data, param}: { data: FormData, param: string }):Promise<GetAllUserData | AxiosError> {
    return axios
        .put(`http://localhost:3000/user/${param}`, data)
        .then(res => res.data)
        .catch(err => {
            const axiosErr = err as AxiosError
            return axiosErr.response?.data
        })
}

export async function deleteUserData(param: string) {
    return axios
        .delete(`http://localhost:3000/user/${param}`)
        .then(res => res.data)
        .catch(err => {
            const axiosErr = err as AxiosError
            return axiosErr.response?.data
        })
}