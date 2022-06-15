import React from "react";
import {useNavigate} from "react-router-dom";

 export const AuthPage = () => {
    let navigate = useNavigate();
    React.useEffect(() => {
        return navigate("/");
    }, [])

    return (
        <div className = "auth">
    
        </div>
    )
}