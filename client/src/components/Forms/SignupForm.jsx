import React from "react";
import { useFormik } from "formik";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import { useRegisterMutation } from "../../features/authSlice/authApiSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [register, { isSuccess, isError, isLoading }] = useRegisterMutation();

  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = "username is required";

    if (!values.email) errors.email = "email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = "Invalid email address";

    if (!values.password) errors.password = "password is required";
    else if (values.password.length < 8)
      errors.password = "password must be greater than 8";

    return errors;
  };
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const signup = useFormik({
    initialValues,
    validate,
    onSubmit: async (body) => {
      try {
        const response = await register(body);
        response.error &&
          toast.error("A user with given username is already registered");
        !response.error && navigate("/login", { replace: true });
      } catch (e) {
        console.log("error", e);
      }
    },
  });

  return (
    <form autoComplete="off" onSubmit={signup.handleSubmit}>
      <div className="flex flex-col justify-center gap-[1.5rem]">
        <Input
          text={"Your username"}
          name={"username"}
          {...signup.getFieldProps("username")}
          error={signup.errors?.username}
          normalInput
        />
        <Input
          text={"Your email"}
          name={"email"}
          {...signup.getFieldProps("email")}
          error={signup.errors?.email}
          normalInput
        />
        <PasswordInput
          text={"Your password"}
          name={"password"}
          {...signup.getFieldProps("password")}
          error={signup.errors?.password}
        />
        <Link to={`/login`} className="flex justify-end">
          <p className="text-Blue text-bodyMD">Wanna Login?</p>
        </Link>
        <SubmitButton text={"Signup"} isLoading={isLoading} />
        <div>
          <Toaster position="bottom-right" reverseOrder="false" />
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
