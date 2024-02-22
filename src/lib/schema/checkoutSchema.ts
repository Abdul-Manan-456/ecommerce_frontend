import * as yup from 'yup';

const checkoutSchema = yup.object().shape({
    fname: yup.string().required('First name is required'),
    lname: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    province: yup.string().required('Province is required'),
    phone: yup.string().required('Phone number is required'),
    // .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    notes: yup.string(), // Allow optional notes
    products: yup.array().of(
        yup.object().shape({
            product: yup.string().required('Product ID is required'),
            quantity: yup.number().required('Quantity is required').positive('Quantity must be positive'),
        })
    ),
    method: yup.string().required('Payment method is required'),
});

export default checkoutSchema;