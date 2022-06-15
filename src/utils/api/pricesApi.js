import axios from "axios";
import {instance} from "./index";

export const PricesApi = {
    fetchPriesApi() {
        return instance.get(`/admin/prices`).then(res => res.data);
    },
    updatePriesApi(id, data) {
        return instance.post(`admin/prices/${id}`, data).then(res => res.data);
    },
};

