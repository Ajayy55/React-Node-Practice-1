// 

import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
    username: Yup.string()
        .min(4, 'Must have more than 4 characters')
        .max(25, 'Must have less than 25 characters')
        .required('Please enter a username'),
        
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Please enter your email'),
        
    gender: Yup.string()
        .required('Please choose your gender'),
        
    qualification: Yup.array()
        .min(1, 'Please choose at least one qualification')
        .required('Please choose your qualifications'),
        
    mobile: Yup.string()
        .required('Please enter your mobile number')
        .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'), // Add regex for mobile format if needed
        
    password: Yup.string()
        .min(6, 'Must have at least 6 characters in the password')
        .required('Please enter a password'),
        
    password1: Yup.string()
        .min(6, 'Must have at least 6 characters to confirm password')
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'), // Fixed the position of null
});
