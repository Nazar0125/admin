import React from "react";
import {ImageApi} from '../../utils/api/imageApi'
import { Loading } from "../loading";
export const OverviewBtn = ({text, getImg}) => {
    const [loading, setLoading] = React.useState(false)
    const sendImg = async (e) => {
        try {
            setLoading(true)

            let lists = e.target.files[0];
            const data = new FormData();
            data.append('file', lists)
            let obj = await ImageApi.uploadImgApi(data)
            getImg(obj.content.url)
            setLoading(false)

        } catch(error) {
            console.log('sendImg', error)
            setLoading(false)
        }
    }
    return (
        <>
            {loading ? <Loading /> : 
            <label className = "overviewBtn" htmlFor = 'img'>
            <input 
                type = "file"
                className = "forms-input__file"
                accept = ".jpg, .jpeg, .png"
                onChange = {(e) => sendImg(e)}
                id = 'img'
            />
                {text}
            </label>}
        </>
    )
}