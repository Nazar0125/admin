import React from 'react'
import { useDispatch } from 'react-redux';
import {FetchTemplates} from '../../store/ducks/templates/actionCreators'

export const ShowNumber = () => {
    const dispatch = useDispatch()

    let [isopen, setIsOpen] = React.useState(false)
    let [number, setNumber] = React.useState(10)
    let numbers = [10, 20, 30, 40, 50];
    const onOpen = () => {
        setIsOpen(!isopen)
    }
    const selectNumber = (item) => {
        setNumber(item)
        setIsOpen(!isopen)
        console.log(item)
        dispatch(FetchTemplates(1, item))
    } 
    return (
        <div className='templates-show'>
            <div className='templates-show__text'>
                Показать
            </div>
            <div className='templates-show__number' onClick={onOpen}>
                <span>{number}</span>
                <svg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8097 0.4972C11.6612 0.348786 11.4599 0.265411 11.25 0.265411C11.0401 0.265411 10.8387 0.348786 10.6903 0.4972L7.05969 4.12778C6.90917 4.27225 6.70862 4.35293 6.49999 4.35293C6.29135 4.35293 6.0908 4.27225 5.94028 4.12778L2.30969 0.4972C2.16038 0.352992 1.96041 0.273196 1.75284 0.275C1.54526 0.276804 1.3467 0.360062 1.19992 0.506844C1.05314 0.653625 0.969882 0.852185 0.968078 1.05976C0.966274 1.26733 1.04607 1.46731 1.19028 1.61662L4.82007 5.2472C5.04061 5.46778 5.30245 5.64276 5.59062 5.76214C5.8788 5.88152 6.18767 5.94296 6.49959 5.94296C6.81151 5.94296 7.12038 5.88152 7.40856 5.76214C7.69673 5.64276 7.95857 5.46778 8.17911 5.2472L11.8097 1.61662C11.9581 1.46816 12.0415 1.26683 12.0415 1.05691C12.0415 0.846987 11.9581 0.64566 11.8097 0.4972Z" fill="#333333"/>
                </svg>
                {
                    isopen &&
                    <ul className='templates-show__numbers'>
                        {
                            numbers.map((item, i) => <li key = {i} onClick = {() => selectNumber(item)}> {item} </li>)
                        }
                    </ul>
                }
            </div>
        </div>
    )
}