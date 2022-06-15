import React from "react";
import {ImageApi} from '../../utils/api/imageApi'
export const SlideOverviewBtn = ({text, getImgs}) => {
    const sendImg = async (e) => {
        try {
            let lists = e.target.files;
            const data = new FormData();
            for (let i = 0; i < lists.length; i++) {
                data.append('file', lists[i])
                let obj = await ImageApi.uploadImgApi(data)
                getImgs(obj.content.url)
                console.log('set img slide')
            }
        } catch(error) {
            console.log('sendImg', error)
        }
    }
    return (
        <label className = "overviewBtn" htmlFor = 'img'>
        <input 
            type = "file"
            className = "forms-input__file"
            accept = ".jpg, .jpeg, .png"
            onChange = {(e) => sendImg(e)}
            id = 'img'
            multiple
        />
            {text}
        </label>
    )
}