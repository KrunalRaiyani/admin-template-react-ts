import * as Yup from 'yup';

export const AuthSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const ProductSchema = Yup.object({
  name: Yup.string().required('Product Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .positive('Price must be positive')
    .required('Price is required'),
  category: Yup.string().required('Category is required'),
});