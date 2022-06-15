import React from "react";
import {Title} from '../../components/title'
import {yupResolver} from '@hookform/resolvers/yup';
import { Helmet } from "react-helmet";
import {Notifications} from '../../components/notifications'
import {ErrorNotifications} from '../../components/notifications/errorNotifications.jsx'
import CustomizedProgressBars from '../../components/loading/CustomizedProgressBars';
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from 'react-router-dom';
import {Breadcrumbs} from './breadcrumbs'
import {applicationsApi} from '../../utils/api/applicationsApi'
import {applicationValidation} from '../../utils/schemmas/applicationValidation.js'
import {Comments} from './comments';
import {Total} from './total';
import {DeleteApplication} from './deleteApplication';
import {Checklist} from './checklist';
import {ChecklistSite} from './checklistSite'
import {PricesApi} from '../../utils/api/pricesApi'
import {LoadingApplicationsEdit} from '../../components/loading/loadingApplicationsEdit'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {LogOffAc} from '../../store/ducks/user/actionCreators';
import equal from 'deep-equal'

export const UpdateApplication = () => {
    const {id} = useParams()
    const [data, setData] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [type, setType] = React.useState(null);
    const [hours, setHours] = React.useState(null);
    const [price, setPrice] = React.useState(0);
    const [prices, setPrices] = React.useState(0);
    const [pdfLink, setPdfLink] = React.useState();
    const [native, setNative] = React.useState();

    const [notifications, setNotifications] = React.useState(false);

    const [isErrorDate, setIsErrorDate] = React.useState(false);
    const [errorDate, setErrorDate] = React.useState();
    const [isErrorModule, setIsErrorModule] = React.useState(false);
    const [errorModule, setErrorModule] = React.useState();
    const [isErrorStoreModule, setIsErrorStoreModule] = React.useState(false);
    const [errorStoreModule, setErrorStoreModule] = React.useState();

    const dispatch = useDispatch();
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
    const getData = async () => {
        try {
            const obj = await applicationsApi.fetchFindOne(id);
            console.log(obj)
            setData(obj.content)
            if (obj.content.id) {
                getPdf(obj.content.id)
            }
            if (obj.content.type.id === 1) {
                setType(false)
            } else {
                setType(true)
            }
            if (obj.content.app_system) {
                if (obj.content.app_system.id === 2) {
                    setNative(true)
                } else {
                    setNative(false)
                }
            }
            
            reset({
                name: obj.content.name,
                phone: obj.content.phone,
                email: obj.content.email,
                modules: obj.content.modules
            })
            const obj1 = await PricesApi.fetchPriesApi();
            setPrices(obj1.content.items)

        } catch(error) {
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch(LogOffAc())
                }
            }
        }
    }

    const countHours = () => {
        let sum = 0;
        data && data.modules.forEach((item) => {
            let newItem = {
                android2 : item.android2,
                api2: item.api2,
                backend2: item.backend2,
                design2: item.design2,
                frontend2: item.frontend2,
                ios2: item.ios2,
                prototype2: item.prototype2,
                android1 : item.android1,
                api1: item.api1,
                backend1: item.backend1,
                design1: item.design1,
                frontend1: item.frontend1,
                ios1: item.ios1,
                prototype1: item.prototype1,
            }
            if (native || !type) {
                delete newItem.android2
                delete newItem.api2
                delete newItem.backend2
                delete newItem.design2
                delete newItem.frontend2
                delete newItem.ios2
                delete newItem.prototype2
                const values = Object.values(newItem)
                values.forEach((i) => {
                    sum += i
                })
            } else if (!native) {
                delete newItem.android1
                delete newItem.api1
                delete newItem.backend1
                delete newItem.design1
                delete newItem.frontend1
                delete newItem.ios1
                delete newItem.prototype1
                const values = Object.values(newItem)
                values.forEach((i) => {
                    sum += i
                })
            } else {
                const values = Object.values(newItem)
                values.forEach((i) => {
                    sum += i
                })
            }
        })
        setHours(sum)
    }

    const countPrice = () => {
        let sumAndroid1 = 0;
        let sumAndroid2 = 0;
        let sumApi1 = 0;
        let sumApi2 = 0;
        let sumBackend1 = 0;
        let sumBackend2 = 0;
        let sumDesign1 = 0;
        let sumDesign2 = 0;
        let sumFrontend1 = 0;
        let sumFrontend2 = 0;
        let sumIos1 = 0;
        let sumIos2 = 0;
        let sumPrototype1 = 0;
        let sumPrototype2 = 0;
        let total = 0
        data && data.modules.forEach((item) => {
            for (let a in item) {
                if ('android1' === a) {
                    sumAndroid1 += item[a]
                } else if ('android2' === a) {
                    sumAndroid2 += item[a]
                } else if ('api1' === a) {
                    sumApi1 += item[a]
                } else if ('api2' === a) {
                    sumApi2 += item[a]
                } else if ('backend1' === a) {
                    sumBackend1 += item[a]
                } else if ('backend2' === a) {
                    sumBackend2 += item[a]
                } else if ('design1' === a) {
                    sumDesign1 += item[a]
                } else if ('design2' === a) {
                    sumDesign2 += item[a]
                } else if ('frontend1' === a) {
                    sumFrontend1 += item[a]
                } else if ('frontend2' === a) {
                    sumFrontend2 += item[a]
                } else if ('ios1' === a) {
                    sumIos1 += item[a]
                } else if ('ios2' === a) {
                    sumIos2 += item[a]
                } else if ('prototype1' === a) {
                    sumPrototype2 += item[a]
                } else if ('prototype2' === a) {
                    sumPrototype2 += item[a]
                }
            }
        })
        if (prices) {
            total = ((sumAndroid1 + sumAndroid2) * prices[6].price) + 
                ((sumApi1 + sumApi2) * prices[4].price) +
                ((sumBackend1 + sumBackend2) * prices[3].price) +
                ((sumDesign1 + sumDesign2) * prices[1].price) +
                ((sumFrontend1 + sumFrontend2) * prices[2].price) +
                ((sumIos1 + sumIos2) * prices[5].price) +
                ((sumPrototype1 + sumPrototype2) * prices[0].price);
            setPrice(total)
        }
    }

    React.useEffect(() => {
        countHours()
        countPrice()
    }, [prices])
        

    React.useEffect(() => {
        getData()
        countHours()
        countPrice()
    }, [id])
    
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: data,
        resolver: yupResolver(applicationValidation)
    });

    const { fields, remove, append } = useFieldArray({
        control,
        name: 'modules',
        keyName: "key",
    });

    const updateSubmit = async (application) => {
        console.log('application', application)
        try {
            setLoading(true )
            let newApplication = {
                email: application.email,
                name: application.name,
                phone: application.phone,
                status: data.status.id,
                total_hours: data.total_hours,
                total_price: data.total_price,
                type: data.type.id
            }
            let update = await applicationsApi.updateApplicationsApi(data.id, newApplication)
            application.modules.forEach((item, i) => {
                if (item.id === null) {
                    storeModules(item)
                } else {
                    let modules = data.modules;
                    modules.forEach((list, l) => {
                        if (item.id === list.id) {
                            let a = equal(item, list);
                            if (a !== true) {
                                updateModules(item) 
                            }
                        }
                            
                    })
                }
            })
            if (update.statusCode === 200) {
                setNotifications(true)
            }
            setLoading(false)
        } catch(error) {
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

    const addModules = () => {
        const site = {
            "id": null, 
            "name": null,
            "android1": null,
            "api1": null,
            "backend1": null,
            "design1": null,
            "frontend1": null,
            "ios1": null,
            "prototype1": null,
        }
        const app = {
            "id": null, "name": null,
            "android1": null, "android2": null,
            "api1": null, "api2": null,
            "backend1": null, "backend2": null,
            "design1": null, "design2": null,
            "frontend1": null, "frontend2": null,
            "ios1": null, "ios2": null,
            "prototype1": null, "prototype2": null,
        }
        if (type === false) {
            append(site)
        } else {
            append(app)
        }
    }
    

    const storeModules = async (module) => {
        try {
            delete module.id
            if (data.app_system) {
                if (native) {
                    module.android2 = 0;
                    module.design2 = 0;
                    module.backend2 = 0;
                    module.api2 = 0;
                    module.ios2 = 0;
                    module.frontend2 = 0;
                    module.prototype2 = 0;
                } else {
                    module.android1 = 0;
                    module.design1 = 0;
                    module.backend1 = 0;
                    module.api1 = 0;
                    module.ios1 = 0;
                    module.frontend1 = 0;
                    module.prototype1 = 0;
                }
            }
            await applicationsApi.storeModulesApi(data.id, module)
        } catch (error) {
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


    const updateModules = async (module) => {
        try {
            if (data.app_system) {
                if (native) {
                    module.android2 = 0;
                    module.design2 = 0;
                    module.backend2 = 0;
                    module.api2 = 0;
                    module.ios2 = 0;
                    module.frontend2 = 0;
                    module.prototype2 = 0;
                } else {
                    module.android1 = 0;
                    module.design1 = 0;
                    module.backend1 = 0;
                    module.api1 = 0;
                    module.ios1 = 0;
                    module.frontend1 = 0;
                    module.prototype1 = 0;
                }
            }
            module.module_id = module.id
            await applicationsApi.updateModulesApi(data.id, module)
        } catch (error) {
            console.log('updateModules', error)
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

    const deleteModal = (id) => {
        remove(id)
    }

    const valueChange = (v) => {
       let sum = 0;       
        v && v.modules.forEach((item) => {
            let newItem = {
                android2 : item.android2,
                api2: item.api2,
                backend2: item.backend2,
                design2: item.design2,
                frontend2: item.frontend2,
                ios2: item.ios2,
                prototype2: item.prototype2,
                android1 : item.android1,
                api1: item.api1,
                backend1: item.backend1,
                design1: item.design1,
                frontend1: item.frontend1,
                ios1: item.ios1,
                prototype1: item.prototype1,
            }
            if (native || !type) {
                delete newItem.android2
                delete newItem.api2
                delete newItem.backend2
                delete newItem.design2
                delete newItem.frontend2
                delete newItem.ios2
                delete newItem.prototype2
                const values = Object.values(newItem)
                values.forEach((i) => {
                    sum += parseInt(i)
                })
            } else if (!native) {
                delete newItem.android1
                delete newItem.api1
                delete newItem.backend1
                delete newItem.design1
                delete newItem.frontend1
                delete newItem.ios1
                delete newItem.prototype1
                const values = Object.values(newItem)
                values.forEach((i) => {
                    sum += parseInt(i)
                })
            } else {
                const values = Object.values(newItem)
                values.forEach((i) => {
                    sum += parseInt(i)
                })
            }
        })
        setHours(sum)
        changePrice(v)
    }

    const changePrice = (p) => {
        let sumAndroid1 = 0;
        let sumAndroid2 = 0;
        let sumApi1 = 0;
        let sumApi2 = 0;
        let sumBackend1 = 0;
        let sumBackend2 = 0;
        let sumDesign1 = 0;
        let sumDesign2 = 0;
        let sumFrontend1 = 0;
        let sumFrontend2 = 0;
        let sumIos1 = 0;
        let sumIos2 = 0;
        let sumPrototype1 = 0;
        let sumPrototype2 = 0;
        let total = 0
        p && p.modules.forEach((item) => {
            for (let a in item) {
                if ('android1' === a) {
                    sumAndroid1 += parseInt(item[a])
                } else if ('android2' === a) {
                    sumAndroid2 += parseInt(item[a])
                } else if ('api1' === a) {
                    sumApi1 += parseInt(item[a])
                } else if ('api2' === a) {
                    sumApi2 += parseInt(item[a])
                } else if ('backend1' === a) {
                    sumBackend1 += parseInt(item[a])
                } else if ('backend2' === a) {
                    sumBackend2 += parseInt(item[a])
                } else if ('design1' === a) {
                    sumDesign1 += parseInt(item[a])
                } else if ('design2' === a) {
                    sumDesign2 += parseInt(item[a])
                } else if ('frontend1' === a) {
                    sumFrontend1 += parseInt(item[a])
                } else if ('frontend2' === a) {
                    sumFrontend2 += parseInt(item[a])
                } else if ('ios1' === a) {
                    sumIos1 += parseInt(item[a])
                } else if ('ios2' === a) {
                    sumIos2 += parseInt(item[a])
                } else if ('prototype1' === a) {
                    sumPrototype2 += parseInt(item[a])
                } else if ('prototype2' === a) {
                    sumPrototype2 += parseInt(item[a])
                }
            }
        })
        if (prices) {
            total = ((sumAndroid1 + sumAndroid2) * prices[6].price) + 
                    ((sumApi1 + sumApi2) * prices[4].price) +
                    ((sumBackend1 + sumBackend2) * prices[3].price) +
                    ((sumDesign1 + sumDesign2) * prices[1].price) +
                    ((sumFrontend1 + sumFrontend2) * prices[2].price) +
                    ((sumIos1 + sumIos2) * prices[5].price) +
                    ((sumPrototype1 + sumPrototype2) * prices[0].price);
                    console.log(total)
            setPrice(total)
        }
    }

    const getPdf = async(id) => {
        try {
            if (id) {
                let obj = await applicationsApi.getPfg(id)
                if(obj.content.url) {
                    setPdfLink(obj.content.url)
                }
                
            }
        } catch (error) {
            console.log('getPdf', error.response?.status)
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch(LogOffAc())
                }
            }
        }
    }

    const openPdg = () => {
        if(pdfLink) {
            window.open(pdfLink, "_blank")
        }
    }

    return (
        <>
            <Helmet>
                <html/>
                <title>
                    Редактирование Заявки
                </title>
            </Helmet>
            <div className = "update-application">
                <div className = "container">
                    <div className = 'templates-page__head'>
                        <Title title = "Заявки" />
                    </div>
                        
                        <div className='notifications-block'>
                            {notifications && <Notifications />}
                            {isErrorDate && <ErrorNotifications text = {errorDate}/>} 
                            {isErrorModule && <ErrorNotifications text = {errorModule}/>}  
                            {isErrorStoreModule && <ErrorNotifications text = {errorStoreModule}/>}                                    
                        </div>
                    
                    <Breadcrumbs id = {data && data.id}/>
                    {
                        !data ?
                        <LoadingApplicationsEdit />
                        :
                    <form onSubmit = {handleSubmit(updateSubmit)} onChange = {handleSubmit(valueChange)}>
                        {
                            data ?
                            <>
                                <div className = "user-datas">
                                    <div className = "user-data">
                                        <p className = "user-data__title">
                                            Заявка
                                        </p>
                                        <div className = "user-data__list">
                                            <p className = "user-data__text">Тип заявки</p>
                                            <input 
                                                className = 'forms-input forms-input__disabled'
                                                disabled = {true}
                                                defaultValue = {data.type.name}
                                            />
                                        </div>
                                        <div className = "user-data__list">
                                            <p className = "user-data__text">Тип шаблона</p>
                                            <input 
                                                className = 'forms-input forms-input__disabled'
                                                disabled = {true}
                                                defaultValue = {data.type.name}
                                            />
                                        </div>
                                        {
                                            data.app_system &&
                                            <div className = "user-data__list">
                                                <p className = "user-data__text">Тип приложение</p>
                                                <input 
                                                    className = 'forms-input forms-input__disabled'
                                                    disabled = {true}
                                                    defaultValue = {data.app_system.name}
                                                />
                                            </div>
                                        }
                                    </div>
                                    <div className="user-data">
                                        <p className = "user-data__title">
                                            Данные клиента
                                        </p>
                                        <div className = "user-data__list">
                                            <p className = "user-data__text">ФИО</p>
                                            <input 
                                                name = 'name'
                                                className = {errors.name?.message ? 'forms-input forms-input__error': 'forms-input'}
                                                {...register('name')}
                                            />
                                        </div>
                                        <div className = "user-data__list">
                                            <p className = "user-data__text">Телефон</p>
                                            <input 
                                                name = 'phone'
                                                className = {errors.phone?.message ? 'forms-input forms-input__error': 'forms-input'}
                                                {...register('phone')}
                                            />
                                        </div>
                                        <div className = "user-data__list">
                                            <p className = "user-data__text">E-mail</p>
                                            <input 
                                                name = 'email'
                                                className = {errors.email?.message ? 'forms-input forms-input__error': 'forms-input'}
                                                {...register('email')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className = "modules">
                                    <p className = "comments-title">Модули</p>
                                    <div className="modules-tabel">
                                        <div className="modules-talel__header">
                                            <div className="modules-talel__head">№</div>
                                            <div className="modules-talel__head">Название модуля</div>
                                            <div className="modules-talel__head">Prototype</div>
                                            <div className="modules-talel__head">Design</div>
                                            <div className="modules-talel__head">Frontend</div>
                                            <div className="modules-talel__head">Backend</div>
                                            <div className="modules-talel__head">API</div>
                                            <div className="modules-talel__head">IOS</div>
                                            <div className="modules-talel__head">Android</div>
                                            <div className="modules-talel__head"></div>
                                        </div>
                                        {
                                            type ?
                                            fields && fields.map((item, i) => {
                                                return (
                                                    <Checklist item = {item} name = {'modules'} i = {i} register = {register} type = {type} applicationId = {data.id} remove = {deleteModal} native = {native} errors = {errors}  key = {i} />
                                                )
                                            })
                                            :
                                            fields && fields.map((item, i) => {
                                                return (
                                                    <ChecklistSite item = {item} name = {'modules'} i = {i} register = {register} type = {type} applicationId = {data.id} remove = {deleteModal} native = {native} errors = {errors}  key = {i} />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className = "modules-footer">
                                        <div className = "addBtn" onClick={addModules}>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 5H7V1C7 0.734784 6.89464 0.48043 6.70711 0.292893C6.51957 0.105357 6.26522 0 6 0C5.73478 0 5.48043 0.105357 5.29289 0.292893C5.10536 0.48043 5 0.734784 5 1V5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7H5V11C5 11.2652 5.10536 11.5196 5.29289 11.7071C5.48043 11.8946 5.73478 12 6 12C6.26522 12 6.51957 11.8946 6.70711 11.7071C6.89464 11.5196 7 11.2652 7 11V7H11C11.2652 7 11.5196 6.89464 11.7071 6.70711C11.8946 6.51957 12 6.26522 12 6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5Z" fill="#00AEEF"/>
                                            </svg>
                                            <span>
                                                Добавить модуль
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Comments comments = {data.comments}/>
                                <Total hours = {hours} price = {price}/>
                                <div className = "application-footer">
                                    <div className = "application-footer__left">
                                        <Link to = {''} onClick={() => openPdg()} className = "addBtn mr-20">
                                            <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 7.44C17.9896 7.34813 17.9695 7.25763 17.94 7.17V7.08C17.8919 6.97718 17.8278 6.88267 17.75 6.8L11.75 0.8C11.6673 0.722216 11.5728 0.658081 11.47 0.61C11.4402 0.60576 11.4099 0.60576 11.38 0.61C11.2784 0.551741 11.1662 0.514344 11.05 0.5H7C6.20435 0.5 5.44129 0.816071 4.87868 1.37868C4.31607 1.94129 4 2.70435 4 3.5V4.5H3C2.20435 4.5 1.44129 4.81607 0.87868 5.37868C0.316071 5.94129 0 6.70435 0 7.5V17.5C0 18.2956 0.316071 19.0587 0.87868 19.6213C1.44129 20.1839 2.20435 20.5 3 20.5H11C11.7956 20.5 12.5587 20.1839 13.1213 19.6213C13.6839 19.0587 14 18.2956 14 17.5V16.5H15C15.7956 16.5 16.5587 16.1839 17.1213 15.6213C17.6839 15.0587 18 14.2956 18 13.5V7.5C18 7.5 18 7.5 18 7.44ZM12 3.91L14.59 6.5H13C12.7348 6.5 12.4804 6.39464 12.2929 6.20711C12.1054 6.01957 12 5.76522 12 5.5V3.91ZM12 17.5C12 17.7652 11.8946 18.0196 11.7071 18.2071C11.5196 18.3946 11.2652 18.5 11 18.5H3C2.73478 18.5 2.48043 18.3946 2.29289 18.2071C2.10536 18.0196 2 17.7652 2 17.5V7.5C2 7.23478 2.10536 6.98043 2.29289 6.79289C2.48043 6.60536 2.73478 6.5 3 6.5H4V13.5C4 14.2956 4.31607 15.0587 4.87868 15.6213C5.44129 16.1839 6.20435 16.5 7 16.5H12V17.5ZM16 13.5C16 13.7652 15.8946 14.0196 15.7071 14.2071C15.5196 14.3946 15.2652 14.5 15 14.5H7C6.73478 14.5 6.48043 14.3946 6.29289 14.2071C6.10536 14.0196 6 13.7652 6 13.5V3.5C6 3.23478 6.10536 2.98043 6.29289 2.79289C6.48043 2.60536 6.73478 2.5 7 2.5H10V5.5C10 6.29565 10.3161 7.05871 10.8787 7.62132C11.4413 8.18393 12.2044 8.5 13 8.5H16V13.5Z" fill="#00AEEF"/>
                                            </svg>
                                            <span>
                                                Сформировать PDF
                                            </span>
                                        </Link>
                                        <DeleteApplication id = {data.id} />
                                    </div>
                                    <div className = "application-footer__rigth">
                                        <button type = "submit" className = "application-save">
                                            {loading ? "Сохранение" : "Сохранить"}
                                        </button>
                                    </div>
                                    {
                                        loading &&
                                        <div className = "preservation">
                                            <CustomizedProgressBars />
                                        </div>
                                    }
                                </div>
                            </>
                            :
                            <></>
                        }
                    </form>
                    }          
                </div>
            </div>
        </>
    );
}