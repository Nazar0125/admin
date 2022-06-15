import React from "react";
import {Title} from '../../components/title'
import {yupResolver} from '@hookform/resolvers/yup';
import {createValidation} from '../../utils/schemmas/createValidation'
import {ErrorText} from '../../components/forms/errorText'
import {OverviewBtn} from "../../components/overviewBtn";
import { Helmet } from "react-helmet";
import {TemplatesApi} from '../../utils/api/templatesApi'
import {Notifications} from '../../components/notifications'
import {ErrorNotifications} from '../../components/notifications/errorNotifications.jsx'
import DeleteIcon from '../../img/delete.svg';
import CustomizedProgressBars from '../../components/loading/CustomizedProgressBars';
import { useForm, useFieldArray } from "react-hook-form";
import {CheckBoxList} from '../../components/slide/checkboxList';
import {SlidesApi} from '../../utils/api/slidesApi';
import { useParams } from 'react-router-dom';
import {ImgBlog} from './imgBlog'
import {useDispatch} from 'react-redux';
import {LogOffAc} from '../../store/ducks/user/actionCreators';
import {FetchMenu} from '../../store/ducks/menu/actionCreators';
import equal from 'deep-equal'


export const UpdateTemplate = () => {
    const {id} = useParams()
    const [data, setData] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [notifications, setNotifications] = React.useState(false);
    const [imgTemplate, setImgTemplate] = React.useState();
    const [isSite, setIsSite] = React.useState(true)
    const [imagesShow, setImagesShow] = React.useState([]);
    const [addSlide, setAddSlide] = React.useState(false);
    const dispatch = useDispatch();
    const [isErrorDate, setIsErrorDate] = React.useState(false);
    const [errorDate, setErrorDate] = React.useState();
    const [isErrorModule, setIsErrorModule] = React.useState(false);
    const [errorModule, setErrorModule] = React.useState();
    const [isErrorStoreModule, setIsErrorStoreModule] = React.useState(false);
    const [errorStoreModule, setErrorStoreModule] = React.useState();

    React.useEffect(() => {
        setTimeout(() => {
            setNotifications(false)
        }, 15000)
    }, [notifications])
      React.useEffect(() => {
        setTimeout(() => {
            setIsErrorDate(false)
        }, 30000)
    }, [isErrorDate])
    React.useEffect(() => {
        setTimeout(() => {
            setIsErrorModule(false)
        }, 30000)
    }, [isErrorModule])
    React.useEffect(() => {
        setTimeout(() => {
            setIsErrorStoreModule(false)
        }, 30000)
    }, [isErrorStoreModule])
    
    const onIsSite = (check) => {
        if (check.target.value === '1') {
            setIsSite(true)
        } else if (check.target.value === '2') {
            setIsSite(false)
        }
    }

    const getData = async () => {
        try {
            const obj = await TemplatesApi.fetchFindOne(id);
            setData(obj.content)
            reset({
                name: obj.content.name,
                description: obj.content.description,
                type: obj.content.type.id,
            })
            setValue('slides', obj.content.slides)
            setImagesShow(obj.content.slides)
            setImgTemplate(obj.content.image)
            if (obj.content.type.id === 1) {
                setIsSite(true)
            } else if (obj.content.type.id === 2) {
                setIsSite(false)
            }
        } catch(error) {
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch(LogOffAc())
                }
            }
        }
    }

    React.useEffect(() => {
        getData()
    }, [id, addSlide])

    const { register, control, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(createValidation),
        defaultValues: data
    });
    
    const { fields, remove, append } = useFieldArray({
        control,
        name: "slides",
        keyName: "key",
    });
    
    const getImg = (photo) => {
        setImgTemplate(photo)
    }
    
    const onAddSlide = () => {
        let slide = {
            checkboxes: [],
            description: "",
            name: "",
            photos: [],
        }
        append(slide)
    }
  
    const imgDelete = () => {
        setImgTemplate()
    }

    const updateSubmit = async (data) => {
        try {
            setLoading(true)
            let newSlide = {
                name: data.name,
                description: data.description,
                image: imgTemplate,
                type: data.type,
                slides: []
            }
            updateTemplates(newSlide)
            if (data.slides) {
                updataSlide(data.slides)
            }
        } catch(error) {

        }
    }

    const updateTemplates = async(newSlide) => {
        try {
            let update = await TemplatesApi.updateTemplatesApi(data.id, newSlide)
            if (update.statusCode === 200) {
                dispatch(FetchMenu())
                setNotifications(true)
            }
            setLoading(false)
        } catch(error) {
            console.log('updateTemplates', updateTemplates)
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch(LogOffAc())
                }
                if (error.response.status === 400) {
                    setIsErrorDate(true)
                    setErrorDate(error.response.data.message)
                }
            }
        }
    }

    const updataSlide = (slides) => {
        slides.forEach((item, i) => {
            let updateSlide = {
                checkboxes: item.checkboxes,
                description: item.description,
                name: item.name,
                photos: item.picture,
            }
            if (item.id) {
                updateSlide.slide_id = item.id
                let dataSlide = data.slides;
                    dataSlide.forEach((item, i) => {
                        if (item.id === updateSlide.slide_id) {
                            delete updateSlide.slide_id;
                            updateSlide.id = item.id
                            let a = equal(item, updateSlide);
                            if (a !== true) {
                                updateSlide.slide_id = item.id
                                editSlide(updateSlide)
                            }
                        }
                            
                    })
            } else if (!item.id) {
                sendSlide(item)
            }
        })
    }
    const onDeleteSlide = async (idDeleteSlide, item) => {
        remove(idDeleteSlide)
        let newSlides = imagesShow.filter((slideItem, i) => {
            return slideItem.id != item.id
        })
        setImagesShow(newSlides)
        try {
            if (data.slides) {
                const deleteSlideItem = {
                    slide_id: data.slides[idDeleteSlide].id
                }
                await SlidesApi.deleteSlidesApi(data.id, deleteSlideItem)
            }            
        } catch(error) {
            console.log('onDeleteSlide', error)
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch(LogOffAc())
                }
            }
        }
    }


    function isObject(object) {
        return object != null && typeof object === 'object';
    }

    const editSlide = async (dataEdit) => {
       try {
            await SlidesApi.updateSlidesApi(data.id, dataEdit)
        } catch(error) {
            console.log('editSlide', error)
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch(LogOffAc())
                }
                if (error.response.status === 400) {
                    setIsErrorModule(true)
                    setErrorModule(error.response.data.message)
                }
            }
        }
    }

    const sendSlide = async (dataSlid) => {
        try {
            let newSlide = {
                name: dataSlid.name,
                description: dataSlid.description,
                checkboxes: dataSlid.checkboxes,
                photos: dataSlid.picture,
            }
            await SlidesApi.storeSlidesApi(data.id, newSlide);
            setAddSlide(true)
        } catch(error) {
            console.log('sendSlide', error)
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch(LogOffAc())
                }
                if (error.response.status === 400) {
                    setIsErrorStoreModule(true)
                    setErrorStoreModule(error.response.data.message)
                }
            }
        }
    }

    return (
        <>
            <Helmet>
                <html/>
                <title>
                    Редактирование шаблон
                </title>
            </Helmet>
            <div className = "createTemplate">
                    <div className = "container">
                        <Title title = "Редактирование шаблон"/>
                        <div className='notifications-block'>
                            {notifications && <Notifications />}
                            {isErrorDate && <ErrorNotifications text = {errorDate}/>} 
                            {isErrorModule && <ErrorNotifications text = {errorModule}/>}  
                            {isErrorStoreModule && <ErrorNotifications text = {errorStoreModule}/>}                                    
                        </div>
                        
                    <form onSubmit = {handleSubmit(updateSubmit)}>
                        <article className = "createTemplate-block mt-38">
                            <div className="mt-38"></div>
                                <div className = "slide-items">
                                    
                                        <div className = "slide-item">
                                            <div className="slide-item__list">
                                                <p className="slide-item__title">Название шаблона</p>
                                                <input 
                                                    name = "name"
                                                    placeholder = "Текст.."
                                                    className = {errors.name?.message ? 'forms-input forms-input__error': 'forms-input'}
                                                    {...register('name')}
                                                />
                                                <ErrorText text = {errors.name?.message}/>
                                            </div>
                                            <div className="slide-item__list">
                                                <p className="slide-item__title">Тип шаблона</p>
                                                <select
                                                    type = {'type'}
                                                    defaultValue = {null}
                                                    onClick={(e) => onIsSite(e)}
                                                    className = {errors.type?.message ? 'forms-select forms-input__error': 'forms-select'}
                                                    {...register('type', {required: 'Поле обязательно для заполнения'})}
                                                >
                                                    <option value = {null} className = "option-delete"> </option>
                                                    <option value = '1' className="forms-select__option"> Сайт</option>
                                                    <option value = '2' className="forms-select__option"> Приложение </option>
                                                </select>
                                                <ErrorText text = {errors.type?.message}/>
                                            </div>
                                            <div className="slide-item__list">
                                                <p className="slide-item__title">Описание</p>
                                                <textarea
                                                    name = "description"
                                                    placeholder = "Текст.."
                                                    className = {errors.description ? 'forms-textarea forms-textarea__error' : "forms-textarea"}
                                                    {...register('description')}
                                                />
                                                <ErrorText text = {errors.description?.message}/>
                                            </div>
                                        </div>
                                        
                                        <div className = "slide-item">
                                            <p className = "slide-item__title"> Фото шаблона </p>
                                            <div className = 'slide-item__upload-img'>
                                                {
                                                    imgTemplate ?
                                                    <div className = 'slide-item__upload-blog'>
                                                        <img src={imgTemplate} alt="" className = 'slide-item__upload-photo' />
                                                        <div className="slide-item__upload-delete">
                                                            <img src = {DeleteIcon} alt = "" onClick = {imgDelete}/>
                                                        </div>
                                                    </div>
                                                    :
                                                    <OverviewBtn text = "Обзор.." getImg = {getImg} />
                                                }
                                            </div>
                                        </div>
                                    
                                </div>
                        </article>
                        <div className = {fields.length === 0 ? "" : "createTemplate-block"}>
                            {
                                fields.map((item, index) => {
                                    return (
                                        <article className = "slide" key = {index}>
                                            <div className = "slide-header">
                                                <p className = "slide-header__title">Слайд #{index + 1}</p>
                                                <div className = "deleteBtn" onClick={() => onDeleteSlide(index, item)}>
                                                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 2.66667H10.9334C10.7786 1.91428 10.3693 1.23823 9.77421 0.752479C9.17916 0.266727 8.43484 0.000969683 7.66671 0L6.33337 0C5.56524 0.000969683 4.82092 0.266727 4.22587 0.752479C3.63083 1.23823 3.22144 1.91428 3.06671 2.66667H1.00004C0.82323 2.66667 0.65366 2.7369 0.528636 2.86193C0.403612 2.98695 0.333374 3.15652 0.333374 3.33333C0.333374 3.51014 0.403612 3.67971 0.528636 3.80474C0.65366 3.92976 0.82323 4 1.00004 4H1.66671V12.6667C1.66777 13.5504 2.0193 14.3976 2.64419 15.0225C3.26908 15.6474 4.11631 15.9989 5.00004 16H9.00004C9.88377 15.9989 10.731 15.6474 11.3559 15.0225C11.9808 14.3976 12.3323 13.5504 12.3334 12.6667V4H13C13.1769 4 13.3464 3.92976 13.4714 3.80474C13.5965 3.67971 13.6667 3.51014 13.6667 3.33333C13.6667 3.15652 13.5965 2.98695 13.4714 2.86193C13.3464 2.7369 13.1769 2.66667 13 2.66667ZM6.33337 1.33333H7.66671C8.08022 1.33384 8.48346 1.46225 8.82112 1.70096C9.15877 1.93967 9.41432 2.27699 9.55271 2.66667H4.44737C4.58576 2.27699 4.84131 1.93967 5.17897 1.70096C5.51662 1.46225 5.91986 1.33384 6.33337 1.33333ZM11 12.6667C11 13.1971 10.7893 13.7058 10.4143 14.0809C10.0392 14.456 9.53047 14.6667 9.00004 14.6667H5.00004C4.46961 14.6667 3.9609 14.456 3.58583 14.0809C3.21075 13.7058 3.00004 13.1971 3.00004 12.6667V4H11V12.6667Z" fill="#EC8383"/>
                                                    </svg>
                                                    <span>
                                                        Удалить слайд
                                                    </span>
                                                </div>
                                            </div>
                                            <div className = "slide-items">
                                                <div className = "slide-item">
                                                    <div className="slide-item__list">
                                                        <p className="slide-item__title">Название слайд</p>
                                                        <input                             
                                                            placeholder = "Текст.."
                                                            className = "forms-input"
                                                            {...register(`slides.${index}.name`)}
                                                        />
                                                        <ErrorText text = {errors.name?.message}/>
                                                    </div>
                                                    <div className="slide-item__list">
                                                        <p className="slide-item__title">Описание</p>
                                                        <textarea
                                                            name = "description"
                                                            placeholder = "Текст.."
                                                            className = {errors.description ? 'forms-textarea forms-textarea__error' : "forms-textarea"}
                                                            {...register(`slides.${index}.description`)}
                                                        />
                                                    </div>
                                                </div>
                                                <ImgBlog 
                                                    imagesShow = {imagesShow}
                                                    index = {index}
                                                    register = {register}
                                                    setValue = {setValue}
                                                    name = {`slides`}
                                                    getValues = {getValues}
                                                />
                                            </div>
                                            <CheckBoxList nestIndex={index} isSite = {isSite} {...{ control, register }} />
                                        </article>
                                    )
                                })
                            }
                        </div>
                        <div className = "createTemplate-footer">
                            <button type = "submit" className = "saveBtn">
                                {loading ? "Сохранение" : "Сохранить"}
                            </button>
                            {
                                loading &&
                                <div className = "preservation">
                                    <CustomizedProgressBars />
                                </div>
                            }
                            <div className = "addBtn" onClick = {() => onAddSlide()}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 5H7V1C7 0.734784 6.89464 0.48043 6.70711 0.292893C6.51957 0.105357 6.26522 0 6 0C5.73478 0 5.48043 0.105357 5.29289 0.292893C5.10536 0.48043 5 0.734784 5 1V5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7H5V11C5 11.2652 5.10536 11.5196 5.29289 11.7071C5.48043 11.8946 5.73478 12 6 12C6.26522 12 6.51957 11.8946 6.70711 11.7071C6.89464 11.5196 7 11.2652 7 11V7H11C11.2652 7 11.5196 6.89464 11.7071 6.70711C11.8946 6.51957 12 6.26522 12 6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5Z" fill="#00AEEF"/>
                                </svg>
                                <span>
                                    Добавить слайд
                                </span>
                            </div>
                        </div>
                    </form> 
                </div>
            </div>
        </>
    );
}