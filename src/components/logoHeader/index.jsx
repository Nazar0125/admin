import React from "react";
import Logo from './logo.svg' 
import { Link } from "react-router-dom";

export const LogoHeader = () => {
    return (
        <div className="LogoHeader">
            <Link to = "/">
                <img src = {Logo} alt = "" className="LogoHeader-img"/>
            </Link>
        </div>
    )
}