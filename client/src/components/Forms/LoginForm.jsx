import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice/authSlice";
import { useLoginMutation } from "../../features/authSlice/authApiSlice";
import usePersist from "../../customHooks/usePersist";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [persist, setPersist] = usePersist();
  const [login, { isLoading }] = useLoginMutation();
  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = "username is required";

    if (!values.password) errors.password = "password is required";
    else if (values.password.length < 8)
      errors.password = "password must be greater than 8";

    return errors;
  };

  const initialValues = {
    username: "",
    password: "",
  };

  const userLogin = useFormik({
    initialValues,
    validate,
    onSubmit: async (body) => {
      try {
        const userData = await login(body).unwrap();
        setPersist(true);
        dispatch(
          setCredentials({
            accessToken: userData.accessToken,
            user: body.username,
          })
        );
        if (!userData.user.preference) {
          navigate("/", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
        body.username = "";
        body.password = "";
      } catch (err) {
        if (err?.status === 400) {
          toast.error("Password or username is incorrect");
        }
      }
    },
  });

  return (
    <form autoComplete="off" onSubmit={userLogin.handleSubmit}>
      <div className="flex flex-col justify-center gap-[1.5rem]">
        <Input
          text={"Your username"}
          name={"username"}
          {...userLogin.getFieldProps("username")}
          error={userLogin.errors?.username}
          normalInput
        />
        <PasswordInput
          text={"Your password"}
          name={"password"}
          {...userLogin.getFieldProps("password")}
          error={userLogin.errors?.password}
        />
        <Link to={`/register`} className="flex justify-end">
          <p className="text-Blue text-bodyMD">Wanna Register?</p>
        </Link>
        <SubmitButton text={"Login"} isLoading={isLoading} />
        <div>
          <Toaster position="right-bottom" reverseOrder="false" />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
