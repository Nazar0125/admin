import React from "react";
import { Link } from "react-router-dom";

export const Breadcrumbs = ({id}) => {
    return (
        <ul className = "breadcrumbs">
            <li className = "breadcrumbs-list"><Link to = "/applications"> Все заявки</Link></li>
            <li className = "breadcrumbs-list"><Link to = {`/applications/${id}`}>{id}</Link></li>
        </ul>
    )
}