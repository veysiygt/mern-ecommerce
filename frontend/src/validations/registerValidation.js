import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});