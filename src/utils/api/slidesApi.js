import axios from "axios";
import {instance} from "./index";

export const SlidesApi = {
    storeSlidesApi(id, data) {
        return instance.post(`/admin/templates/${id}/slides/store`, data).then(res => res.data);
    },
    updateSlidesApi(id, data) {
        return instance.post(`/admin/templates/${id}/slides/update`, data).then(res => res.data);
    },
    deleteSlidesApi(id, data) {
        return instance.post(`/admin/templates/${id}/slides/delete`, data).then(res => res.data);
    },
};