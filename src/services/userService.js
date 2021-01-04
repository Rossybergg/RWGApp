import axios from 'axios';

export const getUser = () => {
    return axios.get('http://service.redwinegaming.com/api/auth',
        {withCredentials: true}
    );
}