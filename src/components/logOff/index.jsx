import React from "react";
import {useDispatch} from 'react-redux'
import {LogOffAc} from '../../store/ducks/user/actionCreators';

export const LogOff = () => {
    const dispatch = useDispatch();
    const onLogOff = () => {
        dispatch(LogOffAc())
        localStorage.setItem('token', null);
    }
    return (
        <div className="logOff" onClick={onLogOff}>
            Выход 
        </div>
    )
}