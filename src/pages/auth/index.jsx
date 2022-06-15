import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthSchema } from '../../utils/schemmas/authValidation';
import {ErrorText} from '../../components/forms/errorText';
import Logo from './logo.svg' 
import { useDispatch, useSelector } from "react-redux";
import {FetchUser} from "../../store/ducks/user/actionCreators"
import {useNavigate} from "react-router-dom";
import CustomizedProgressBars from '../../components/loading/CustomizedProgressBars';

 export const Auth = () => {
    let navigate = useNavigate();

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(AuthSchema)
    })

    const {userLoding} = useSelector((state) => {
        return {
            userLoding: state.user.userLoding,
        }
    });

    const onAuth = (data) => {
        console.log(data)
        dispatch(FetchUser(data))
    }

    React.useEffect(() => {
        return navigate("/auth");
    }, [])

    return (
        <div className = "auth">
            <div className = "auth-logo">
                <img src = {Logo} alt = "" className="LogoHeader-img"/>
            </div>
            <div className = "auth-wrapper">
                {userLoding ? 
                <div className = "auth-loding">
                    <CustomizedProgressBars />
                </div>
                 : 
                <></>}
                <p className="auth-title">Вход в систему</p>
                <div className = "auth-block">
                    <p className = "auth-block__title">Войти</p>
                    <p className = "auth-block__text">Для входа в систему требуются ваши данные. Пожалуйста заполните форму ниже:</p>
                    <form onSubmit = {handleSubmit(onAuth)}>
                        <div className = "auth-block__form">
                            <p className = "auth-input__title">Email</p>
                            <input 
                                className = {errors.email?.message ? 'auth-input auth-input__error': 'auth-input'}
                                name = "email"
                                placeholder = "Введите Email"
                                {...register('email')}
                            />
                            <ErrorText text = {errors.email?.message}/>
                            <p className = "auth-input__title mt-24">Пароль</p>
                            <input
                                className = {errors.password?.message ? 'auth-input auth-input__error': 'auth-input'}
                                name = "password"
                                placeholder = "Введите пароль"
                                type = "password"
                                {...register('password')}
                            />
                            <ErrorText text = {errors.password?.message}/>
                        </div>

                            <div>
                                <button type = "submit" className="auth-button">
                                    Войти
                                </button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    )
}