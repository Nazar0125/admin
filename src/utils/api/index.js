import axios from "axios";

const instance = axios.create({
    baseURL: "https://brief.panama.kz/api",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'language': 'ru'
    }
})

export {
    instance,
}