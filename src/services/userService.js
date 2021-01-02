import axios from 'axios';

export const getUser = () => {
    return axios.get('https://redwinegamingbot.herokuapp.com/api/auth',
        {withCredentials: true}
    );
}