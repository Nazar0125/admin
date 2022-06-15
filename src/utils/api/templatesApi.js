import axios from "axios";
import {instance} from "./index";

export const TemplatesApi = {
    fetchMenuApi() {
        return instance.get(`/admin/dictionaries/templates`).then(res => res.data);
    },
    fetchTemplatesApi(page, limit) {
        return instance.get(`/admin/templates?page=${page}&limit=${limit}`).then(res => res.data);
    },
    fetchFindOne(id) {
        return instance.get(`/admin/templates/${id}`).then(res => res.data);
    },
    storeTemplatesApi(data) {
        return instance.post(`/admin/templates/store`, data).then(res => res.data);
    },
    updateTemplatesApi(id, data) {
        return instance.post('/admin/templates/'+id, data).then(res => res.data);
    },
    searchTemplatesApi(text) {
        return instance.get(`/admin/templates?search=${text}`).then(res => res.data);
    },
    deleteTemplatesApi(id) {
        return instance.delete(`/admin/templates/${id}`).then(res => res.data);
    },
};