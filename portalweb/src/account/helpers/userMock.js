import * as yup from 'yup';

export const userSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido').default('').min(3, 'Mínimo tres caracteres').max(255, 'Máximo 255 caracteres'),
    email: yup.string().required('El email es requerido').default('').min(3, 'Mínimo tres caracteres').max(255, 'Máximo 255 caracteres').email('El email no es válido'),
    password: yup.string().required('El password es requerido').default('').min(8, 'Necesitas 8 caracteres de longitud').max(255),
    img_url: yup.string().default('assets/img/Profile.svg'),
});


