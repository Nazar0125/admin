import React from "react";
import {ImageApi} from '../../utils/api/imageApi';
import DeleteIcon from '../../img/delete.svg';
import {LinearIndeterminate} from '../../components/loading/linearProgress';
import {useDispatch} from 'react-redux';
import {LogOffAc} from '../../store/ducks/user/actionCreators';

export const ImgBlog = ({imagesShow, index, register, setValue, name, getValues}) => {
    const [images, setImages] = React.useState([])
    const dispatch = useDispatch();

    React.useEffect(() => {
       if (imagesShow[index]?.photos) {
        setImages(imagesShow[index]?.photos)
       }
    }, [imagesShow,index])

    const [loadingImg, setLoadingImg] = React.useState(false)

    setValue(`${name}.${index}.picture`, images)


    const sendImgSlide = async (e) => {
        try {
            setLoadingImg(true)
            let lists = e.target.files;
            const data = new FormData();
            let newImg = []
            for (let i = 0; i < lists.length; i++) {
                data.append('file', lists[i])
                let obj = await ImageApi.uploadImgApi(data)
                newImg.push(obj.content.url)
            }
            setImages([...newImg, ...images])
            setValue(`${name}.${index}.picture`, [...newImg, ...images])
            setLoadingImg(false)
        } catch(error) {
            setLoadingImg(true)
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch(LogOffAc())
                }
            }
        }
    }
    const onDeleteImg = (deleteImg) => {
        const newImgs = images.filter((item) => {
            return item !== deleteImg
        })
        setImages(newImgs)
        setValue(`${name}.${index}.picture`, newImgs)
    }

    
    return (
        <div className = "slide-item">
            <p className ="slide-item__title"> Фото шаблона </p>
            <label className = "overviewBtn" htmlFor = 'img'>
                <input 
                    type = "file"
                    className = "forms-input__file"
                    accept = ".jpg, .jpeg, .png"
                    onChange = {(e) => sendImgSlide(e)}
                    id = 'img'
                    multiple
                />
                    Обзор..
            </label>
            <input {...register(`${name}.${index}.picture`)} type = "text" className="forms-input__none"/>
            {
                loadingImg &&
                <LinearIndeterminate />
            }
            {
                images.length === 0 ?
                <></>
                :
                <div className="slide-item__uploaded">
                    <p className ="slide-item__title"> Загруженные </p>
                    <div className="slide-item__uploaded-items">
                        {
                            images && images.map((item, i) => {
                                return (
                                    <div className="slide-item__uploaded-item" key = {i}>
                                        <img src = {item} alt = '' className = 'slide-item__upload-photo'/>
                                        <div className="slide-item__uploaded-delete" onClick={() => onDeleteImg(item)}>
                                            <img src = {DeleteIcon} alt = '' className = 'slide-item__upload-delete__icon'/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );
}