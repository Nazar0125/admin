import React from "react";
import { useFieldArray } from "react-hook-form";

export const Modules = ({ control, register }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: 'modules'
    });

    console.log('fields', fields)
    return (
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
                                            fields && fields.map((item, i) => {
                                                return (
                                                    <div className="modules-talel__bodys">
                                                        <div className="modules-talel__body">
                                                            <input
                                                                defaultValue = {item ? item.id : ''}
                                                                className = {'tabel-body__input tabel-body__input-title'}
                                                                name={`modules[${i}].id`}
                                                                {...register(`modules[${i}].id`)}
                                                            />
                                                        </div>
                                                        <div className="modules-talel__body">
                                                            <input
                                                                defaultValue = {item ? item.name : ''}
                                                                className = {'tabel-body__input tabel-body__input-title'}
                                                                name={`modules[${i}].name`}
                                                                {...register(`modules[${i}].name`)}
                                                            />
                                                        </div>
                                                        <div className="modules-talel__body">Prototype</div>
                                                        <div className="modules-talel__body">Design</div>
                                                        <div className="modules-talel__body">Frontend</div>
                                                        <div className="modules-talel__body">Backend</div>
                                                        <div className="modules-talel__body">API</div>
                                                        <div className="modules-talel__body">IOS</div>
                                                        <div className="modules-talel__body">Android</div>
                                                        <div className="modules-talel__body"></div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className = "modules-footer">
                                        <div className = "addBtn">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 5H7V1C7 0.734784 6.89464 0.48043 6.70711 0.292893C6.51957 0.105357 6.26522 0 6 0C5.73478 0 5.48043 0.105357 5.29289 0.292893C5.10536 0.48043 5 0.734784 5 1V5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7H5V11C5 11.2652 5.10536 11.5196 5.29289 11.7071C5.48043 11.8946 5.73478 12 6 12C6.26522 12 6.51957 11.8946 6.70711 11.7071C6.89464 11.5196 7 11.2652 7 11V7H11C11.2652 7 11.5196 6.89464 11.7071 6.70711C11.8946 6.51957 12 6.26522 12 6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5Z" fill="#00AEEF"/>
                                            </svg>
                                            <span>
                                                Добавить модуль
                                            </span>
                                        </div>
                                    </div>
                                </div>
    );
}