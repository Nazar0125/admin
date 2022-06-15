import * as yup from "yup";

export const applicationValidation = yup.object().shape({
    name: yup.string().required('Поле обязательно для заполнения').default(''),
    email: yup.string().email("Не верный email"),
})
                
