import React from "react";
import {ErrorText} from '../forms/errorText'
import DeleteIcon from '../../img/delete.svg';
import {CheckBoxList} from './checkboxList'
import {SlidesApi} from '../../utils/api/slidesApi';
import {ImageApi} from '../../utils/api/imageApi';
import {LinearIndeterminate} from '../../components/loading/linearProgress';
import { useForm, useFieldArray} from "react-hook-form";


let renderCount = 0;

export const CreateSlide = ({dataTabel, deleteSlide, addSlideDB, i, slideID, deleteID, isSite}) => {
    const { register, control, getValues, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
            checkboxes : []
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "checkboxes"
    });
    
    renderCount++;
    
    const [checkBoxItem, setCheckBoxItem] = React.useState([]);
    const [loadingImg, setLoadingImg] = React.useState(false)
    const [counter, setCounter] = React.useState(0);

   

    //delete slide
    const onDeleteSlide = (idDeleteSlide) => {
        console.log('idDeleteSlide', idDeleteSlide)
        deleteSlide(idDeleteSlide)
    }
    const [images, setImages] = React.useState([])
    //save slide
    const setSlide = async () => {
      try {
        let data = {}
        data.name = getValues('name')
        data.description = getValues('description')
        data.checkboxes = getValues('checkboxes')
        data.photos = images
        const obj =  await SlidesApi.storeSlidesApi(slideID, data)
        console.log(obj)
      } catch(error) {
          console.log('setSlide', error)
      }
    }

    //save img
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
            setLoadingImg(false)

        } catch(error) {
            console.log('sendImg', error)
            setLoadingImg(true)
        }
    }
    const addSlide = () => {
        //
        setCounter(counter + 1)
        setCheckBoxItem([{counter: counter}, ...checkBoxItem])
        setImages([])
        append({
            title: ""
        })
    }
    React.useEffect(() => {
        setImages([])
    }, [])
    React.useEffect(() => {
      if (slideID !== undefined) {
        addSlideDB(setSlide())
      }
    }, [slideID])

    const onDeleteImg = (deleteImg) => {
        const newImgs = images.filter((item) => {
            return item !== deleteImg
        })
        setImages(newImgs)
    }
    
 


    return (
        <article className = "slide">
        <div className = "slide-header">
            <p className = "slide-header__title">Слайд #{i + 1}</p>
            <div className = "deleteBtn" onClick={() => onDeleteSlide(deleteID)}>
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2.66667H10.9334C10.7786 1.91428 10.3693 1.23823 9.77421 0.752479C9.17916 0.266727 8.43484 0.000969683 7.66671 0L6.33337 0C5.56524 0.000969683 4.82092 0.266727 4.22587 0.752479C3.63083 1.23823 3.22144 1.91428 3.06671 2.66667H1.00004C0.82323 2.66667 0.65366 2.7369 0.528636 2.86193C0.403612 2.98695 0.333374 3.15652 0.333374 3.33333C0.333374 3.51014 0.403612 3.67971 0.528636 3.80474C0.65366 3.92976 0.82323 4 1.00004 4H1.66671V12.6667C1.66777 13.5504 2.0193 14.3976 2.64419 15.0225C3.26908 15.6474 4.11631 15.9989 5.00004 16H9.00004C9.88377 15.9989 10.731 15.6474 11.3559 15.0225C11.9808 14.3976 12.3323 13.5504 12.3334 12.6667V4H13C13.1769 4 13.3464 3.92976 13.4714 3.80474C13.5965 3.67971 13.6667 3.51014 13.6667 3.33333C13.6667 3.15652 13.5965 2.98695 13.4714 2.86193C13.3464 2.7369 13.1769 2.66667 13 2.66667ZM6.33337 1.33333H7.66671C8.08022 1.33384 8.48346 1.46225 8.82112 1.70096C9.15877 1.93967 9.41432 2.27699 9.55271 2.66667H4.44737C4.58576 2.27699 4.84131 1.93967 5.17897 1.70096C5.51662 1.46225 5.91986 1.33384 6.33337 1.33333ZM11 12.6667C11 13.1971 10.7893 13.7058 10.4143 14.0809C10.0392 14.456 9.53047 14.6667 9.00004 14.6667H5.00004C4.46961 14.6667 3.9609 14.456 3.58583 14.0809C3.21075 13.7058 3.00004 13.1971 3.00004 12.6667V4H11V12.6667Z" fill="#EC8383"/>
                </svg>
                <span>
                    Удалить слайд
                </span>
            </div>
        </div>
        <form>
        <div className = "slide-items">
            <div className = "slide-item">
                <div className="slide-item__list">
                    <p className="slide-item__title">Название слайд</p>
                    <input                             
                        placeholder = "Текст.."
                        className = "forms-input"
                        {...register("name")}
                    />
                    <ErrorText text = {errors.name?.message}/>
                </div>
                <div className="slide-item__list">
                    <p className="slide-item__title">Описание</p>
                    <textarea
                        name = "description"
                        placeholder = "Текст.."
                        className = {errors.description ? 'forms-textarea forms-textarea__error' : "forms-textarea"}
                        {...register("description")}
                    />
                </div>
            </div>
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
                                images.map((item, i) => {
                                    return (
                                        <div className="slide-item__uploaded-item" key = {i}>
                                            <img src = {item} alt = "" className = 'slide-item__upload-photo'/>
                                            <div className="slide-item__uploaded-delete" onClick={() => onDeleteImg(item)}>
                                                <img src = {DeleteIcon} alt="" className = 'slide-item__upload-delete__icon'/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
        <div className = "slide-item__tabel">
            <div className = "slide-item__tabel-head">
                <div className="tabel-head-name"> Название чек-боксов </div>
                <div className="tabel-head"> Prototype </div>
                <div className="tabel-head"> Design </div>
                <div className="tabel-head"> Frontend </div>
                <div className="tabel-head"> Backend </div>
                <div className="tabel-head"> API </div>
                <div className="tabel-head"> IOS </div>
                <div className="tabel-head"> Android </div>
                <div className="tabel-head__delete">  </div>
            </div>

            {fields.map((item, index) => {
                return (
                    <CheckBoxList 
                    item = {item}
                    register = {register}
                    name = {`checkboxes.${index}`}
                    isSite = {isSite}
                    i = {index}
                    remove = {remove}
                    key = {index}/>
                );
            })}
                <div className = "slide-item__tabel-fotter">
                    <div className = "tabel-fotter">
                        <div className = "tabel-fotter__top" onClick={() => {
                            append({ 
                                title: "", prototype: "", prototype2: "", design: "", design2: "",
                                frontend: "", frontend2: "", backend: "", backend2: "",api: "", api2: "", ios: "",
                                ios2: "", android: "", android2: ""
                            });
                        }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16667 4.16667H5.83333V0.833333C5.83333 0.61232 5.74554 0.400358 5.58926 0.244078C5.43297 0.0877975 5.22101 0 5 0C4.77899 0 4.56702 0.0877975 4.41074 0.244078C4.25446 0.400358 4.16667 0.61232 4.16667 0.833333V4.16667H0.833333C0.61232 4.16667 0.400358 4.25446 0.244078 4.41074C0.0877975 4.56702 0 4.77899 0 5C0 5.22101 0.0877975 5.43297 0.244078 5.58926C0.400358 5.74554 0.61232 5.83333 0.833333 5.83333H4.16667V9.16667C4.16667 9.38768 4.25446 9.59964 4.41074 9.75592C4.56702 9.9122 4.77899 10 5 10C5.22101 10 5.43297 9.9122 5.58926 9.75592C5.74554 9.59964 5.83333 9.38768 5.83333 9.16667V5.83333H9.16667C9.38768 5.83333 9.59964 5.74554 9.75592 5.58926C9.9122 5.43297 10 5.22101 10 5C10 4.77899 9.9122 4.56702 9.75592 4.41074C9.59964 4.25446 9.38768 4.16667 9.16667 4.16667Z" fill="#194AA2"/>
                            </svg>
                            <span>
                                Добавить чекбокс
                            </span>
                        </div>
                        <div className = "tabel-fotter__bottom">
                            *Часы работы с мобильной версией
                        </div>
                    </div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                </div>
            </div>
            </form>
        </article>
    )
}