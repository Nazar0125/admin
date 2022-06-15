import * as yup from "yup";

export const slideValidation = yup.object().shape({
    name: yup.string().required('Поле обязательно для заполнения').default(''),
    description: yup.string().required('Поле обязательно для заполнения').default(''),
    title: yup.string().required('Поле обязательно для заполнения').default(''),
    prototype: yup.string().notRequired().nullable().default(null),
    prototype2: yup.string().notRequired().nullable().default(null),
    design: yup.string().notRequired().nullable().default(null),
    design2: yup.string().notRequired().nullable().default(null),
    frontend: yup.string().notRequired().nullable().default(null),
    frontend2: yup.string().notRequired().nullable().default(null),
    backend: yup.string().notRequired().nullable().default(null),
    backend2: yup.string().notRequired().nullable().default(null),
    api: yup.string().notRequired().nullable().default(null),
    api2: yup.string().notRequired().nullable().default(null),
    ios: yup.string().notRequired().nullable().default(null),
    ios2: yup.string().notRequired().nullable().default(null),
    android: yup.string().notRequired().nullable().default(null),
    android2: yup.string().notRequired().nullable().default(null),
})