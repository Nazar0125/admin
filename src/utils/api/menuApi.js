import axios from "axios";
import {instance} from "./index";

export const MenuApi = {
    fetchMenuApi() {
        return instance.get(`/admin/dictionaries/templates`).then(res => res.data);
    },
};