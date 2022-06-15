import React from "react";
import OpenMenu from '../../img/openMenu.svg'
import CloseMenu from '../../img/closeMenu.svg'
import addMenu from '../../img/addMenu.svg'
import {Link} from "react-router-dom"

export const Menu = ({title, url, data}) => {
    const [isOpen, setOpen] = React.useState(false);
    return (
            <div className="menu-items">
                <div className="menu-title" onClick={() => setOpen(!isOpen)}>
                    <Link to = {`/`}>
                        {title}
                    </Link>
                    {
                        
                        isOpen ?
                        <img src = {OpenMenu} alt = "" />
                        :
                        <img src = {CloseMenu} alt = "" />
                    }
                </div>
                {
                    isOpen &&
                    <>
                        <ul className="menu-ul">
                            {
                                data && data.map((item, i) => {
                                    return <li className="menu-list" key = {item.id}><Link to = {`template/${item.id}`} className = "menu-list__link">{item.name}</Link></li>
                                })
                            }
                        </ul>
                        <Link to = {`/create-template`} className="menu-add">
                            <img src = {addMenu} alt = "" />
                            <span> Добавить шаблон </span>
                        </Link>
                    </>
                }
            </div>
    )
}