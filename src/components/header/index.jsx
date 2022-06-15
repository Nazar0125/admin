import React from "react";
import { Link } from "react-router-dom";
import { LogoHeader } from "../logoHeader";
import {Menu} from "../menu"
import {LogOff} from '../logOff'
import { useSelector, useDispatch } from 'react-redux';
import {FetchMenu} from '../../store/ducks/menu/actionCreators'

export const Header = () => {
    const dispatch = useDispatch();
    const {templates} = useSelector((state) => {
        return {
            templates: state.menu.menu,
        }
    });
    React.useEffect(() => {
        dispatch(FetchMenu())
    }, [])

    return (
        <header className="header">
            <div className="header-fixed">
                <LogoHeader/>
                <nav className="menu">
                    <Menu title = 'Шаблоны' url = {'/'} data = {templates}/>
                    <div className="menu-items">
                        <Link to = "applications" className="menu-title">
                            Заявки
                        </Link>
                    </div>
                    <div className="menu-items">
                        <Link to = "prices" className="menu-title">
                            Цена
                        </Link>
                    </div>
                </nav>
                <LogOff />
            </div>
        </header>
    )
}