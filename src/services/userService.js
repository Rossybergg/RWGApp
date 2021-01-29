import axios from 'axios';
import { serviceURL } from "../constants/serviceURLS";

export const getUser = () => {
    return axios.get(`${serviceURL}/api/auth`,
        {withCredentials: true}
    );
}

export const getAvatars = (userIds) => {
    return axios.post(`${serviceURL}/api/users/avatar`, {
        users: userIds
    })
}