import axios from 'axios';

export const getUser = () => {
    return axios.get('https://service.redwinegaming.com/api/auth',
        {withCredentials: true}
    );
}