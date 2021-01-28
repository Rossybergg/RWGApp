import axios from 'axios';
import { serviceURL } from "../constants/serviceURLS";

export const publishEvent = (data, user) => {
    return axios.post(`${serviceURL}/api/events`, {
        content: {
            user,
            data
        }
    });
}

export const getEvents = () => {
    return axios.get(`${serviceURL}/api/events`);
}