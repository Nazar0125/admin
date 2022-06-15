import React from 'react'

export const MySelect = ({data, active, register}) => {
    if (!data) return null
    return (
        <select className = 'forms-select' defaultValue = {active.id} {...register('type')}>
            {
                data.map((item, i) => {
                    return <option className="forms-select__option" value = {item.id} key = {i}> {item.text} </option>
                })
            }
        </select>
    )
}