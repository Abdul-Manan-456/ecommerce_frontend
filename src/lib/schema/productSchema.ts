import * as yup from 'yup';

const productValidationSchema = yup.object().shape({
    title: yup.string().required('Title is required').trim().lowercase(),
    price: yup.number().typeError('Price must be a number').positive('Price must be positive').required('Title is required'),
    imageData: yup.array().of(yup.string().trim()),
});

export default productValidationSchema;
