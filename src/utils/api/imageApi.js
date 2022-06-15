import axios from "axios";
import {instance} from "./index";

export const ImageApi = {
    uploadImgApi(data) {
        return instance.post(`/admin/upload/image`, data).then(res => res.data);
    }
};