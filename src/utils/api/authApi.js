import axios from "axios";

export const AuthApi = {
    fetchLogin(data) {
        return axios.post('https://brief.panama.kz/api/admin/auth/login', data, {
            headers: {
                'language': 'ru'
            }
        }).then(({data}) => data);
    }
};