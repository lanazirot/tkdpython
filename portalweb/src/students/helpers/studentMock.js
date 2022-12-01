import * as yup from 'yup';
import { userSchema } from '../../account/helpers/userMock';
import { professorSchema } from '../../professors/helpers/professorMock';

export const studentSchema = yup.object().shape({
    belt_color: yup.string().required('El color de la cinta es requerido').default('').oneOf(['Blanca', 'Amarilla', 'Naranja', 'Verde', 'Azul', 'Roja', 'Negra']),
    age: yup.number().required('La edad es requerida').default(18).min(18, 'La edad mínima es 18 años').max(120, 'La edad máxima es 120 años'),
    role: yup.string().required().default('S'),
    weight: yup.number().required('El peso es requerido').default(0).min(0, 'El peso mínimo es 0 kg').max(300, 'El peso máximo es 300 kg'),
    uuid: yup.string().required('El uuid es requerido').default(''),
    professorModel: professorSchema
});

export const studentUpdateSchema = yup.object().shape({
    belt_color: yup.string().required('El color de la cinta es requerido').default('').oneOf(['Blanca', 'Amarilla', 'Naranja', 'Verde', 'Azul', 'Roja', 'Negra']),
    age: yup.number().required('La edad es requerida').default(18).min(18, 'La edad mínima es 18 años').max(120, 'La edad máxima es 120 años'),
    role: yup.string().required().default('P'),
    weight: yup.number().required('El peso es requerido').default(0).min(0, 'El peso mínimo es 0 kg').max(300, 'El peso máximo es 300 kg'),
    userModel: userSchema,
    professorModel: professorSchema
});