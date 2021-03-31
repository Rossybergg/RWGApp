import axios from 'axios';
import { serviceURL } from "../constants/serviceURLS";


export const getUser = () => {
    return axios.get(`${serviceURL}/api/auth`,
        {withCredentials: true}
    );
}

export const getUserData = (userIds) => {
    return axios.post(`${serviceURL}/api/users/profiles`, {
        users: userIds
    })
}

export const getAllUserData = () => {
    return axios.get(`${serviceURL}/api/users/profiles`)
}

export const getAvatars = (userIds) => {
    return axios.post(`${serviceURL}/api/users/avatar`, {
        users: userIds
    })
}

export const changeCasinoStatus = (userID, status) => {
    return axios.post(`${serviceURL}/api/users/casino/${userID}`, {
        newStatus: status
    }, {withCredentials: true})
}