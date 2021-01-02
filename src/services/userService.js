import axios from 'axios';

export const getUser = () => {
    return axios.get('http://localhost:4000/api/auth',
        {withCredentials: true}
    );
}