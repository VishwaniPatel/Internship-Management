import * as Yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}$/;

export const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("FirstName is required").nullable(),
    lastName: Yup.string().trim().required("LastName is required"),
    emailId: Yup.string()
        .trim()
        .matches(emailRegex, "Email is not valid")
        .required("Email is required."),
    domain: Yup.string().required("Domain is required"),
})