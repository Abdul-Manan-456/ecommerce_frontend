import * as yup from 'yup';

// Schema for registration
export const RegistrationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

// Schema for login
export const LoginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});