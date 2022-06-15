import React from "react";
import DeleteIcon from '../../img/delete.svg';
import { useFieldArray } from "react-hook-form";


export const CheckBoxList = ({ nestIndex, isSite, control, register }) => {
   
    const { fields, remove, append } = useFieldArray({
        control,
        name: `slides[${nestIndex}].checkboxes`
      });
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
            <div className = "slide-item__tabel">
                <div className = "slide-item__tabel-head">
                    <div className="tabel-head-name"> Название чек-боксов </div>
                    <div className="tabel-head"> Prototype </div>
                    <div className="tabel-head"> Design </div>
                    <div className="tabel-head"> Frontend </div>
                    <div className="tabel-head"> Backend </div>
                    <div className="tabel-head"> API </div>
                    <div className="tabel-head"> IOS </div>
                    <div className="tabel-head"> Android </div>
                    <div className="tabel-head__delete">  </div>
                </div>
                {fields.map((item, k) => {
                    return (
                        <div className = "template-slide__item" key = {k}>  
                            <div className="tabel-body-name modules-textare__padding"> 
                                <textarea
                                    tabindex="-1"
                                    defaultValue = {item ? item.name : ''}
                                    className = {'forms-textarea__module'}
                                    name={`slides[${nestIndex}].checkboxes[${k}].name`}
                                    {...register(`slides[${nestIndex}].checkboxes[${k}].name`)}
                                />
                            </div>

                        <div className="tabel-body__content">
                            <div className={isSite ? "tabel-body__content-top he-100" : "tabel-body__content-top he-50"}>
                                <div className="tabel-body__content-input">
                                    <input
                                        defaultValue = {item ? item.prototype1 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].prototype1`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].prototype1`)}
                                    />
                                </div>
                                <div className="tabel-body__content-input">
                                    <input
                                        defaultValue = {item ? item.design1 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].design1`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].design1`)}
                                    />
                                </div>
                                <div className="tabel-body__content-input">
                                    <input
                                        defaultValue = {item ? item.frontend1 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].frontend1`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].frontend1`)}
                                    />
                                </div>
                                <div className="tabel-body__content-input">
                                    <input
                                        defaultValue = {item ? item.backend1 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].backend1`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].backend1`)}
                                    />
                                </div>
                                <div className="tabel-body__content-input">
                                    <input
                                        defaultValue = {item ? item.api1 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].api1`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].api1`)}
                                    />
                                </div>
                                <div className="tabel-body__content-input">
                                    <input
                                        defaultValue = {item ? item.ios1 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].ios1`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].ios1`)}
                                    />
                                </div>
                                <div className="tabel-body__content-input">
                                    <input
                                        defaultValue = {item ? item.android1 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].android1`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].android1`)}
                                    />
                                </div>
                            </div>
                            {
                                !isSite &&
                                <div className="tabel-body__content-bottom he-50">
                                    <div className="tabel-body__content-input">
                                        <input
                                            defaultValue = {item ? item.prototype2 : ''}
                                            className = {'tabel-body__input'}
                                            name = {`slides[${nestIndex}].checkboxes[${k}].prototype2`}
                                            type="number"
                                            {...register(`slides[${nestIndex}].checkboxes[${k}].prototype2`)}
                                        />
                                    </div>
                                    <div className="tabel-body__content-input">
                                        <input
                                            defaultValue = {item ? item.design2 : ''}
                                            className = {'tabel-body__input'}
                                            name = {`slides[${nestIndex}].checkboxes[${k}].design2`}
                                            type="number"
                                            {...register(`slides[${nestIndex}].checkboxes[${k}].design2`)}
                                        />
                                    </div>
                                    <div className="tabel-body__content-input">
                                        <input
                                            defaultValue = {item ? item.frontend2 : ''}
                                            className = {'tabel-body__input'}
                                            name = {`slides[${nestIndex}].checkboxes[${k}].frontend2`}
                                            type="number"
                                            {...register(`slides[${nestIndex}].checkboxes[${k}.frontend2`)}
                                        />
                                    </div>
                                    <div className="tabel-body__content-input">
                                        <input
                                            defaultValue = {item ? item.backend2 : ''}
                                            className = {'tabel-body__input'}
                                            name = {`slides[${nestIndex}].checkboxes[${k}].backend2`}
                                            type="number"
                                            {...register(`slides[${nestIndex}].checkboxes[${k}].backend2`)}
                                        />
                                    </div>
                                    <div className="tabel-body__content-input">
                                        <input
                                            defaultValue = {item ? item.api2 : ''}
                                            className = {'tabel-body__input'}
                                            name = {`slides[${nestIndex}].checkboxes[${k}].api2`}
                                            type="number"
                                            {...register(`slides[${nestIndex}].checkboxes[${k}].api2`)}
                                        />
                                    </div>
                                    <div className="tabel-body__content-input">
                                        <input
                                            defaultValue = {item ? item.ios2 : ''}
                                            className = {'tabel-body__input'}
                                            name = {`slides[${nestIndex}].checkboxes[${k}].ios2`}
                                            type="number"
                                            {...register(`slides[${nestIndex}].checkboxes[${k}].ios2`)}
                                        />
                                    </div>
                                    <div className="tabel-body__content-input">
                                        <input
                                            defaultValue = {item ? item.android2 : ''}
                                            className = {'tabel-body__input'}
                                            name = {`slides[${nestIndex}].checkboxes[${k}].android2`}
                                            type="number"
                                            {...register(`slides[${nestIndex}].checkboxes[${k}].android2`)}
                                        />
                                    </div>
                                </div>
                            }
                        </div>

                        {/*<div className="tabel-body">
                            <div className="tabel-body-top">
                                <input
                                    defaultValue = {item ? item.prototype1 : ''}
                                    className = {'tabel-body__input'}
                                    name = {`slides[${nestIndex}].checkboxes[${k}].prototype1`}
                                    type="number"
                                    {...register(`slides[${nestIndex}].checkboxes[${k}].prototype1`)}
                                />
                            </div>
                            {
                                !isSite &&
                                <div className="tabel-body-bottom"> 
                                    <input
                                        defaultValue = {item ? item.prototype2 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].prototype2`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].prototype2`)}
                                    />
                                </div>
                            }
                        </div>
                        <div className="tabel-body">
                            <div className="tabel-body-top">
                                <input
                                    defaultValue = {item ? item.design1 : ''}
                                    className = {'tabel-body__input'}
                                    name = {`slides[${nestIndex}].checkboxes[${k}].design1`}
                                    type="number"
                                    {...register(`slides[${nestIndex}].checkboxes[${k}].design1`)}
                                />
                            </div>
                            {
                                !isSite &&
                                <div className="tabel-body-bottom">
                                    <input
                                        defaultValue = {item ? item.design2 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].design2`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].design2`)}
                                    />
                                </div>
                            }
                        </div>
                        <div className="tabel-body">
                            <div className="tabel-body-top">
                                <input
                                    defaultValue = {item ? item.frontend1 : ''}
                                    className = {'tabel-body__input'}
                                    name = {`slides[${nestIndex}].checkboxes[${k}].frontend1`}
                                    type="number"
                                    {...register(`slides[${nestIndex}].checkboxes[${k}].frontend1`)}
                                />
                            </div>
                            
                            {
                                !isSite &&
                                <div className="tabel-body-bottom">
                                    <input
                                        defaultValue = {item ? item.frontend2 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].frontend2`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}.frontend2`)}
                                    />
                                </div>
                            }
                            
                        </div>
                        <div className="tabel-body">
                            <div className="tabel-body-top">
                                <input
                                    defaultValue = {item ? item.backend1 : ''}
                                    className = {'tabel-body__input'}
                                    name = {`slides[${nestIndex}].checkboxes[${k}].backend1`}
                                    type="number"
                                    {...register(`slides[${nestIndex}].checkboxes[${k}].backend1`)}
                                />
                            </div>
                            {
                                !isSite &&
                                <div className="tabel-body-bottom">
                                    <input
                                        defaultValue = {item ? item.backend2 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].backend2`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].backend2`)}
                                    />
                                </div>
                            }
                        </div>
                        <div className="tabel-body">
                            <div className="tabel-body-top">
                                <input
                                    defaultValue = {item ? item.api1 : ''}
                                    className = {'tabel-body__input'}
                                    name = {`slides[${nestIndex}].checkboxes[${k}].api1`}
                                    type="number"
                                    {...register(`slides[${nestIndex}].checkboxes[${k}].api1`)}
                                />
                            </div>
                            {
                                !isSite &&
                                <div className="tabel-body-bottom">
                                    <input
                                        defaultValue = {item ? item.api2 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].api2`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].api2`)}
                                    />
                                </div>
                            }
                        </div>
                        <div className="tabel-body">
                            <div className="tabel-body-top">
                                <input
                                    defaultValue = {item ? item.ios1 : ''}
                                    className = {'tabel-body__input'}
                                    name = {`slides[${nestIndex}].checkboxes[${k}].ios1`}
                                    type="number"
                                    {...register(`slides[${nestIndex}].checkboxes[${k}].ios1`)}
                                />
                            </div>
                            
                            {
                                !isSite &&
                                <div className="tabel-body-bottom">
                                    <input
                                        defaultValue = {item ? item.ios2 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].ios2`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].ios2`)}
                                    />
                                </div>
                            }
                        </div>
                        <div className="tabel-body">
                            <div className="tabel-body-top">
                                <input
                                    defaultValue = {item ? item.android1 : ''}
                                    className = {'tabel-body__input'}
                                    name = {`slides[${nestIndex}].checkboxes[${k}].android1`}
                                    type="number"
                                    {...register(`slides[${nestIndex}].checkboxes[${k}].android1`)}
                                />
                            </div>
                            {
                                !isSite &&
                                <div className="tabel-body-bottom">
                                    <input
                                        defaultValue = {item ? item.android2 : ''}
                                        className = {'tabel-body__input'}
                                        name = {`slides[${nestIndex}].checkboxes[${k}].android2`}
                                        type="number"
                                        {...register(`slides[${nestIndex}].checkboxes[${k}].android2`)}
                                    />
                                </div>
                            }
                        </div>*/}
                        <div className="tabel-head__delete" onClick={() => remove(k)}> 
                            <img src = {DeleteIcon} alt = "" />
                        </div>
                    </div>
                        )
                })}
                <div className = "slide-item__tabel-fotter">
                    <div className = "tabel-fotter">
                        <div className = "tabel-fotter__top" onClick={() => {
                            append({ 
                                title: "", prototype1: "", prototype2: "", design1: "", design2: "",
                                frontend1: "", frontend2: "", backend1: "", backend2: "", api1: "", api2: "", ios1: "",
                                ios2: "", android1: "", android2: ""
                            });
                        }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16667 4.16667H5.83333V0.833333C5.83333 0.61232 5.74554 0.400358 5.58926 0.244078C5.43297 0.0877975 5.22101 0 5 0C4.77899 0 4.56702 0.0877975 4.41074 0.244078C4.25446 0.400358 4.16667 0.61232 4.16667 0.833333V4.16667H0.833333C0.61232 4.16667 0.400358 4.25446 0.244078 4.41074C0.0877975 4.56702 0 4.77899 0 5C0 5.22101 0.0877975 5.43297 0.244078 5.58926C0.400358 5.74554 0.61232 5.83333 0.833333 5.83333H4.16667V9.16667C4.16667 9.38768 4.25446 9.59964 4.41074 9.75592C4.56702 9.9122 4.77899 10 5 10C5.22101 10 5.43297 9.9122 5.58926 9.75592C5.74554 9.59964 5.83333 9.38768 5.83333 9.16667V5.83333H9.16667C9.38768 5.83333 9.59964 5.74554 9.75592 5.58926C9.9122 5.43297 10 5.22101 10 5C10 4.77899 9.9122 4.56702 9.75592 4.41074C9.59964 4.25446 9.38768 4.16667 9.16667 4.16667Z" fill="#194AA2"/>
                            </svg>
                            <span>
                                Добавить чекбокс
                            </span>
                        </div>
                        <div className = "tabel-fotter__bottom">
                            *Часы работы с мобильной версией
                        </div>
                    </div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                    <div className = "tabel-fotter"></div>
                </div>
            </div>
        </>
                    
    )
}
