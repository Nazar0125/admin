import React from 'react'
import {Link} from "react-router-dom"
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { AddBtn } from '../../components/addBtn'
import { Title } from '../../components/title'
import { ShowNumber } from '../../components/showNumbers';
import EditTemplates  from '../../img/editTemplates.svg';
import {Search} from '../../components/search';
import {LoadingLists} from '../../components/loading/loadingList';
import {DeleteTemplate} from './deleteTemplate'
import {FetchTemplates} from '../../store/ducks/templates/actionCreators'


export const Templates = () => {
    const dispatch = useDispatch()
    const [list, setList] = React.useState([])
    const [curentPage, setCurentPage] = React.useState(0)
    const [page, setPage] = React.useState(1)

    React.useEffect(() => {
        getPage()
    }, [page])
    
    const {templates, pages} = useSelector((state) => {
        return {
            templates: state.templates.data,
            pages: state.templates.pages
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
        if (curentPage === pages.length - 1) {
            setCurentPage(pages.length - 1)
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
        dispatch(FetchTemplates(page, 10))
    }
    
    return (
        <>
            <Helmet>
                <html/>
                <title>
                    Шаблоны
                </title>
            </Helmet>
            <div className = 'templates-page'>
                <div className = "container">
                    <div className = 'templates-page__head'>
                        <Title title = "Шаблоны" />
                        <AddBtn text = {'Добавить шаблоны'}/>
                    </div>
                    <div className = 'templates'>
                        <div className = 'templates-head'>
                            <ShowNumber />
                            <Search />
                        </div>
                        <div className = 'templates-tabel'>
                            <div className = 'templates-tabel__header'>
                                <div className = 'templates-tabel__head'>Id</div>
                                <div className = 'templates-tabel__head'>Название</div>
                                <div className = 'templates-tabel__head'>Тип</div>
                                <div className = 'templates-tabel__head'>Описание</div>
                                <div className = 'templates-tabel__head templates-tabel-delete'></div>
                            </div>
                            {   
                                !templates ?
                                <LoadingLists />
                                :
                                templates.map((item, i) => {
                                    return (
                                        <div className = 'templates-tabel__bodys' key = {i}>
                                            <div className = 'templates-tabel__body'>{item.id}</div>
                                            <div className = 'templates-tabel__body'>{item.name}</div>
                                            <div className = 'templates-tabel__body'>{item.type.name}</div>
                                            <div className = 'templates-tabel__body'>{item.description}</div>
                                            <div className = 'templates-tabel__body templates-editDelete templates-tabel-delete'>
                                                <Link className = 'templates-tabel-edit' to = {`template/${item.id}`}>
                                                    <img src = {EditTemplates} alt = ""/>
                                                </Link>
                                                <DeleteTemplate id = {item.id} />
                                            </div>
                                        </div>
                                    )
                                })    
                            }
                        </div>
                        <div className = 'templates-footer'>
                            {
                                templates
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
