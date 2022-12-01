import * as yup from 'yup';
import { userUpdateSchema } from '../../account/helpers/userMock';

export const professorSchema = yup.object().shape({
    belt_color: yup.string().required('El color de la cinta es requerido').default('').oneOf(['Blanca', 'Amarilla', 'Naranja', 'Verde', 'Azul', 'Roja', 'Negra']),
    age: yup.number().required('La edad es requerida').default(18).min(18, 'La edad mínima es 18 años').max(120, 'La edad máxima es 120 años'),
    role: yup.string().required().default('NA'),
});

export const professorUpdateSchema = yup.object().shape({
    belt_color: yup.string().required('El color de la cinta es requerido').default('').oneOf(['Blanca', 'Amarilla', 'Naranja', 'Verde', 'Azul', 'Roja', 'Negra']),
    age: yup.number().required('La edad es requerida').default(18).min(18, 'La edad mínima es 18 años').max(120, 'La edad máxima es 120 años'),
    role: yup.string().required().default('P'),
    userModel: userUpdateSchema
});