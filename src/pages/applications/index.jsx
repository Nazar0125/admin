import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import {Link} from "react-router-dom"
import {Title} from '../../components/title'
import {FetchApplications, SelectApplications, GetSearchApplication} from '../../store/ducks/applications/actionCreators'
import {LoadingApplications} from '../../components/loading/loadingApplications'
import EditTemplates from '../../img/editTemplates.svg';
import {DeleteApplications} from './deleteApplications';

export const Applications = () => {

    const dispatch = useDispatch();
    const [list, setList] = React.useState([])
    const [curentPage, setCurentPage] = React.useState(0)
    const [page, setPage] = React.useState(1)
    let [isopen, setIsOpen] = React.useState(false)
    let [number, setNumber] = React.useState('Все')
    let numbers = [
        { title: 'Все', id: 0 },
        { title: 'Сайт', id: 1 },
        { title: 'Приложение', id: 2 }        
    ];
    const onOpen = () => {
        setIsOpen(!isopen)
    }
    const selectNumber = (item) => {
        setNumber(item.title)
        setIsOpen(!isopen)
        dispatch(SelectApplications(item.id))
    }
    /*
    React.useEffect(() => {
        dispatch(FetchApplications(page))
    }, []);
    */
    const {applications, pages} = useSelector((state) => {
        return {
            applications: state.applications.selectData,
            pages: state.applications.pages
        }
    });

    React.useEffect(() => {
        let a = []
        for (let i = 1; i <= pages; i++) {
            a.push(i)
        }
        setList(a)
    }, [pages])
    const onNextPage = () => {
        if (curentPage === pages?.length - 1) {
            setCurentPage(pages?.length - 1)
            setPage(pages.length)
        }
        setCurentPage(curentPage + 1)
        setPage(page + 1)
    }

    const onPrevPage = () => {
        if (curentPage === 0) {
            setCurentPage(0)
            setPage(1)
        }
        setPage(page - 1)
        setCurentPage(curentPage - 1)
    }
    const getPage = () => {
        dispatch(FetchApplications(page))
    }
    React.useEffect(() => {
        getPage()
    }, [page])

    const [searchName, setSearchName] = React.useState('');
    const [searchEmail, setSearchEmail] = React.useState('');
    const [searchTel, setSearchTel] = React.useState('');
    
    const onChangeName = (e) => {
        setSearchName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setSearchEmail(e.target.value)
    }
    const onChangeTel = (e) => {
        setSearchTel(e.target.value)
    }
     const onSearch = (e) => {
        e.preventDefault()
        dispatch(GetSearchApplication(searchName, searchEmail, searchTel))
     }

    return (
        <>
            <Helmet>
                <html/>
                <title>
                    Заявки
                </title>
            </Helmet>
            <div className = 'applications-page'>
                <div className = "container">
                    <div className = 'templates-page__head'>
                        <Title title = "Заявки" />
                    </div>
                    <div className="applications">
                        <div className = 'templates-head'>
                            <div className='templates-show'>
                                <div className='templates-show__text'>
                                    Показать
                                </div>
                                <div className='templates-show__number applications-show__number' onClick={onOpen}>
                                    <span>{number}</span>
                                    <svg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.8097 0.4972C11.6612 0.348786 11.4599 0.265411 11.25 0.265411C11.0401 0.265411 10.8387 0.348786 10.6903 0.4972L7.05969 4.12778C6.90917 4.27225 6.70862 4.35293 6.49999 4.35293C6.29135 4.35293 6.0908 4.27225 5.94028 4.12778L2.30969 0.4972C2.16038 0.352992 1.96041 0.273196 1.75284 0.275C1.54526 0.276804 1.3467 0.360062 1.19992 0.506844C1.05314 0.653625 0.969882 0.852185 0.968078 1.05976C0.966274 1.26733 1.04607 1.46731 1.19028 1.61662L4.82007 5.2472C5.04061 5.46778 5.30245 5.64276 5.59062 5.76214C5.8788 5.88152 6.18767 5.94296 6.49959 5.94296C6.81151 5.94296 7.12038 5.88152 7.40856 5.76214C7.69673 5.64276 7.95857 5.46778 8.17911 5.2472L11.8097 1.61662C11.9581 1.46816 12.0415 1.26683 12.0415 1.05691C12.0415 0.846987 11.9581 0.64566 11.8097 0.4972Z" fill="#333333"/>
                                    </svg>
                                    {
                                        isopen &&
                                        <ul className='templates-show__numbers applications-show__numbers'>
                                            {
                                                numbers.map((item, i) => <li key = {i} onClick = {() => selectNumber(item)}> {item.title} </li>)
                                            }
                                        </ul>
                                    }
                                </div>
                            </div>
                        </div>
                                    <form className="applications-search" onSubmit={onSearch}>
                                        <input
                                            type = 'text'
                                            value = {searchName}
                                            onChange = {(e) => onChangeName(e)}
                                            className = 'forms-input'
                                            placeholder = "Имя"
                                        />
                                        <input
                                            type = 'text'
                                            value = {searchEmail}
                                            onChange = {(e) => onChangeEmail(e)}
                                            className = 'forms-input'
                                            placeholder = "email"
                                        />
                                        <input
                                            type = 'text'
                                            value = {searchTel}
                                            onChange = {(e) => onChangeTel(e)}
                                            className = 'forms-input'
                                            placeholder = "Телефон"
                                        />
                                        <button className="applications-search__btn">
                                            Поиск
                                        </button>
                                    </form>
                        <div className = "applications-tabel">
                            <div className = 'applications-tabel__header'>
                                <div className = 'applications-tabel__head'>Дата подачи</div>
                                <div className = 'applications-tabel__head'>Тип</div>
                                <div className = 'applications-tabel__head'>ФИО</div>
                                <div className = 'applications-tabel__head'>E-mail</div>
                                <div className = 'applications-tabel__head'>Телефон</div>
                                <div className = 'applications-tabel__head'>Примечание</div>
                                <div className = 'applications-tabel__head'></div>
                            </div>
                            {   
                                !applications ?
                                <LoadingApplications />
                                :
                                applications.map((item, i) => {
                                    return (
                                        <div className = 'applications-tabel__bodys' key = {item.id}>
                                            <div className = 'applications-tabel__body'>{item.created_date}</div>
                                            <div className = 'applications-tabel__body'>
                                                {item.type.name} {item.app_system?.name}
                                            </div>
                                            <div className = 'applications-tabel__body'>{item.name}</div>
                                            <div className = 'applications-tabel__body'>{item.email}</div>
                                            <div className = 'applications-tabel__body'>{item.phone}</div>
                                            <div className = 'applications-tabel__body'>
                                                <div className="applications-tabel__body-note">
                                                    {
                                                        item.comments.length !== 0 ?
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.99984 9.16666C9.77883 9.16666 9.56687 9.25445 9.41059 9.41073C9.25431 9.56702 9.16651 9.77898 9.16651 9.99999V13.3333C9.16651 13.5543 9.25431 13.7663 9.41059 13.9226C9.56687 14.0789 9.77883 14.1667 9.99984 14.1667C10.2209 14.1667 10.4328 14.0789 10.5891 13.9226C10.7454 13.7663 10.8332 13.5543 10.8332 13.3333V9.99999C10.8332 9.77898 10.7454 9.56702 10.5891 9.41073C10.4328 9.25445 10.2209 9.16666 9.99984 9.16666ZM10.3165 5.89999C10.1136 5.81664 9.88606 5.81664 9.68317 5.89999C9.58088 5.93965 9.48743 5.99912 9.40817 6.07499C9.33457 6.15599 9.27538 6.249 9.23317 6.34999C9.18652 6.44889 9.16369 6.55734 9.16651 6.66666C9.16587 6.77633 9.18689 6.88505 9.22837 6.98658C9.26984 7.08811 9.33094 7.18046 9.40817 7.25832C9.48918 7.33193 9.58219 7.39112 9.68317 7.43332C9.80942 7.48519 9.94648 7.50525 10.0823 7.49175C10.2181 7.47825 10.3485 7.43159 10.4621 7.35588C10.5757 7.28017 10.6689 7.17773 10.7336 7.05755C10.7983 6.93737 10.8325 6.80314 10.8332 6.66666C10.8301 6.44602 10.7438 6.23468 10.5915 6.07499C10.5123 5.99912 10.4188 5.93965 10.3165 5.89999ZM9.99984 1.66666C8.35166 1.66666 6.7405 2.1554 5.37009 3.07108C3.99968 3.98675 2.93158 5.28824 2.30084 6.81096C1.67011 8.33368 1.50509 10.0092 1.82663 11.6257C2.14817 13.2423 2.94185 14.7271 4.10728 15.8925C5.27272 17.058 6.75758 17.8517 8.37409 18.1732C9.9906 18.4947 11.6662 18.3297 13.1889 17.699C14.7116 17.0683 16.0131 16.0002 16.9288 14.6297C17.8444 13.2593 18.3332 11.6482 18.3332 9.99999C18.3332 8.90564 18.1176 7.82201 17.6988 6.81096C17.28 5.79991 16.6662 4.88125 15.8924 4.10743C15.1186 3.33361 14.1999 2.71978 13.1889 2.30099C12.1778 1.8822 11.0942 1.66666 9.99984 1.66666ZM9.99984 16.6667C8.6813 16.6667 7.39237 16.2757 6.29604 15.5431C5.19971 14.8106 4.34523 13.7694 3.84064 12.5512C3.33606 11.333 3.20404 9.99259 3.46127 8.69939C3.71851 7.40618 4.35345 6.2183 5.2858 5.28594C6.21815 4.35359 7.40603 3.71866 8.69924 3.46142C9.99245 3.20419 11.3329 3.33621 12.5511 3.84079C13.7692 4.34538 14.8104 5.19986 15.543 6.29619C16.2755 7.39252 16.6665 8.68145 16.6665 9.99999C16.6665 11.7681 15.9641 13.4638 14.7139 14.714C13.4636 15.9643 11.768 16.6667 9.99984 16.6667Z" fill="#E3C83A"/>
                                                        </svg>
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                            </div>
                                            <div className = 'applications-tabel__body templates-editDelete templates-tabel-delete'>
                                                <Link className = 'templates-tabel-edit' to = {`/applications/${item.id}`}>
                                                    <img src = {EditTemplates} alt = ""/>
                                                </Link>
                                                <DeleteApplications id = {item.id} />
                                            </div>
                                        </div>
                                    )
                                })    
                            }
                        </div>
                        <div className = 'templates-footer'>
                            {
                                applications
                                &&
                                <div className = 'templates-pagination'>                               
                                    <button disabled = {curentPage === 0} className = 'templates-pagination__prev' onClick = {onPrevPage}>
                                        Назад
                                    </button>
                                    <div className = 'templates-pagination__number'>
                                    {list && page} 
                                    </div>
                                    <button disabled = {curentPage === list.length - 1} className = 'templates-pagination__next' onClick = {onNextPage}>
                                        Вперед
                                    </button>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}