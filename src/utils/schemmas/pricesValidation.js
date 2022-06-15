import * as yup from "yup";

export const pricesValidation = yup.object().shape({
    price: yup.number().typeError('вы должны указать цифры').required('Поле обязательно для заполнения'),
})
                
