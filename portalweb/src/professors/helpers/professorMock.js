import * as yup from 'yup';
import { userSchema } from '../../account/helpers/userMock';

export const professorSchema = yup.object().shape({
    belt_color: yup.string().required().default('').oneOf(['Blanca', 'Amarilla', 'Naranja', 'Verde', 'Azul', 'Roja', 'Negra']),
    age: yup.number().required().default(18),
    role: yup.string().required().default('S'),
    userModel: userSchema
});

