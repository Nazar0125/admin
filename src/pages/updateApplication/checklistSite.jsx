import React from "react";
import DoneIcon from '@mui/icons-material/Done';

import EditTemplates from '../../img/editTemplates.svg';
import {DeleteModule} from './deleteModule'


export const ChecklistSite = ({item, name, i, register, type, applicationId, remove, errors}) => {
    const [isEdit, setIsEdit] = React.useState(true);
    React.useEffect(() => {
        document.querySelectorAll('textarea').forEach(el => {
            el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
            el.classList.add('auto');
            el.addEventListener('input', e => {
                el.style.height = 'auto';
                el.style.height = (el.scrollHeight) + 'px';
            });
        });
    }, [])
    return (
        <>
        <div className="modules-talel__bodys">
            <div className="modules-talel__body modules-talel__center">
                <p>{i + 1}</p>
            </div>
            
            <div className="modules-talel__body modules-textare__padding modules-talel__center">
                
                    <textarea
                        tabindex="-1"
                        disabled = {isEdit}
                        defaultValue = {item ? item.name : 0}
                        className = {'forms-textarea__module'}
                        name={`${name}[${i}].name`}
                        {...register(`${name}[${i}].name`, { required: true })}
                    />
                          
            </div>
            <div className="modules-talel__body">
                <div className="tabel-body-top">
                    <input
                        disabled = {isEdit}
                        defaultValue = {item ? item.prototype1 : 0}
                        className = {'tabel-body__input forms-input__disabled-bg'}
                        name = {`${name}[${i}].prototype1`}
                        type="number"
                        {...register(`${name}[${i}].prototype1`)}
                    />
                </div>
            </div>
            <div className="modules-talel__body">
                <div className="tabel-body-top">
                    <input
                        disabled = {isEdit}
                        defaultValue = {item ? item.design1 : 0}
                        className = {'tabel-body__input forms-input__disabled-bg'}
                        name = {`${name}[${i}].design1`}
                        type="number"
                        {...register(`${name}[${i}].design1`)}
                    />
                </div>
            </div>
            <div className="modules-talel__body">
                <div className="tabel-body-top">
                    <input
                        disabled = {isEdit}
                        defaultValue = {item ? item.design1 : 0}
                        className = {'tabel-body__input forms-input__disabled-bg'}
                        name = {`${name}[${i}].frontend1`}
                        type="number"
                        {...register(`${name}[${i}].frontend1`)}
                    />
                </div>
            </div>
            <div className="modules-talel__body">
                <div className="tabel-body-top">
                    <input
                        disabled = {isEdit}
                        defaultValue = {item ? item.backend1 : 0}
                        className = {'tabel-body__input forms-input__disabled-bg'}
                        name = {`${name}[${i}].backend1`}
                        type="number"
                        {...register(`${name}[${i}].backend1`)}
                    />
                </div>
            </div>
            <div className="modules-talel__body">
                <div className="tabel-body-top">
                    <input
                        disabled = {isEdit}
                        defaultValue = {item ? item.api1 : 0}
                        className = {'tabel-body__input forms-input__disabled-bg'}
                        name = {`${name}[${i}].api1`}
                        type="number"
                        {...register(`${name}[${i}].api1`)}
                    />
                </div>
            </div>
            <div className="modules-talel__body">
                <div className="tabel-body-top">
                    <input
                        disabled = {isEdit}
                        defaultValue = {item ? item.ios1 : 0}
                        className = {'tabel-body__input forms-input__disabled-bg'}
                        name = {`${name}[${i}].ios1`}
                        type="number"
                        {...register(`${name}[${i}].ios1`)}
                    />
                </div>
            </div>
            <div className="modules-talel__body">
                <div className="tabel-body-top">
                    <input
                        disabled = {isEdit}
                        defaultValue = {item ? item.android1 : 0}
                        className = {'tabel-body__input forms-input__disabled-bg'}
                        name = {`${name}[${i}].android1`}
                        type="number"
                        {...register(`${name}[${i}].android1`)}
                    />
                </div>
            </div>
            <div className="modules-talel__body modules-panel">
                <div className = "modul-edit">
                    {
                        isEdit ?
                        <img src = {EditTemplates} alt = "" onClick={() => setIsEdit(false)} /> 
                        :
                        <DoneIcon onClick={() => setIsEdit(true)} />
                    }
                </div>
                <DeleteModule applicationId = {applicationId} id = {item && item.id} i = {i} remove = {remove}/>
            </div>
        </div>
        </>    
    );
}