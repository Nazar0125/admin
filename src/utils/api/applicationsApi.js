import axios from "axios";
import {instance} from "./index";


export const applicationsApi = {
    fetchApplicationsApi(page) {
        return instance.get(`/admin/applications?page=${page}`).then(res => res.data);
    },
    fetchFindOne(id) {
        return instance.get(`/admin/applications/${id}`).then(res => res.data);
    },
    updateApplicationsApi(id, data) {
        return instance.post('/admin/applications/'+id, data).then(res => res.data);
    },
    deleteApplicationsApi(id) {
        return instance.delete(`/admin/applications/${id}`).then(res => res.data);
    },
    storeModulesApi(id, module) {
        return instance.post(`/admin/applications/${id}/modules/store`, module).then(res => res.data);
    },
    updateModulesApi(id, module ) {
        return instance.post(`/admin/applications/${id}/modules/update`, module).then(res => res.data);
    },
    deleteModulesApi(id, data) {
        return instance.post(`/admin/applications/${id}/modules/delete`, data).then(res => res.data);
    },
    getPfg(id) {
        return instance.get(`/admin/applications/${id}/generatePdf`).then(res => res.data);
    },
    searchApplicationsApi(searchName, searchEmail, searchTel) {
        return instance.get(`/admin/applications?name=${searchName}&email=${searchEmail}&phone=${searchTel}`).then(res => res.data);
    },
};