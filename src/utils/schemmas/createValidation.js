import * as yup from "yup";

export const createValidation = yup.object().shape({
    name: yup.string().required('Поле обязательно для заполнения').default(''),
    type: yup.string().nullable().required('Поле обязательно для заполнения').default(null),
    description: yup.string().required('Поле обязательно для заполнения').nullable().default(null),
    slides: yup.array().of(
        yup.object({
          name: yup.string().required('Поле обязательно для заполнения').default(''),
          description: yup.string().required('Поле обязательно для заполнения').default(''),
        }),
    ),
})
                
