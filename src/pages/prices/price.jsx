import React from "react";
import {ErrorText} from '../../components/forms/errorText'
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {pricesValidation} from '../../utils/schemmas/pricesValidation'
import { PricesApi } from "../../utils/api/pricesApi";
import {ErrorNotifications} from '../../components/notifications/errorNotifications.jsx'
import { useDispatch } from 'react-redux';
import {LogOffAc} from '../../store/ducks/user/actionCreators';

export const Price = ({price}) => {
    const [isError, setIsError] = React.useState(false);
    const [errorText, SetErrorText] = React.useState();
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({        
        mode: 'onBlur',
        reValidateMode: 'onChange',
        resolver: yupResolver(pricesValidation)
    })
    const onChange = async (data) => {
        try {
            if (price) {
                await PricesApi.updatePriesApi(price.id, data)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch(LogOffAc())
                }
                if (error.response.status === 400) {
                    setIsError(true)
                    SetErrorText(error.response.data.message)
                }
            }
        }
    }
    return (
        <div className = "price">
            <div className='notifications-block'>
                {isError && <ErrorNotifications text = {errorText}/>}                                    
            </div>
            <p className = "price-title">{price.name}</p>
            <div className = "price-input">
                <form onBlur = {handleSubmit(onChange)}>
                    <p className = "price-info">Введите сумму часа</p>
                    <input 
                        placeholder="Текст.."
                        name = 'price'
                        defaultValue = {price.price}
                        className = {errors.price?.message ? 'forms-input forms-input__error': 'forms-input'}
                        {...register('price')}
                    />
                    <ErrorText text = {errors.price?.message}/>
                </form>
            </div>
        </div>
    )
}