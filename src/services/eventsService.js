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

export const getEvent = (eventId) => {
    return axios.get(`${serviceURL}/api/events/${eventId}`);
}

export const signUp = (user, eventId) => {
    return axios.post(`${serviceURL}/api/events/signup`, {
        content: {
            user,
            eventId
        }
    });
}