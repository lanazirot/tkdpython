import * as yup from 'yup';

//Get current date
const today = new Date();


export const userSchema = yup.object().shape({
    name: yup.string().required().default('').min(3).max(255),
    email: yup.string().required().default('').min(20).max(255),
    registered_on: yup.date().notRequired().default(today),
    updated_at: yup.date().notRequired().default(today),
});

