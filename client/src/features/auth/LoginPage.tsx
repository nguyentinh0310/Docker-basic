import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { push } from "connected-react-router";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ILogin } from "types";
import { login } from "./authSlice";
import "./Login.css";

export default function LoginPage() {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<ILogin>({
    email: "",
    password: "",
  });
  const { email, password } = values;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
    setSubmitted(true);
    try {
      const resultAction = await dispatch(login(values));
      const user = unwrapResult(resultAction);

      localStorage.setItem("access_token", user.token);

      dispatch(push("/user"));
      toast.success("Login successfully!");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="container wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={handleSubmitForm}>
          <h1 className="text-center">{t("Login Page")}</h1>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              name="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={handleOnChange}
              className={
                "form-control " + (submitted && !email ? "is-invalid" : "")
              }
            />
            {submitted && !email && (
              <div className="invalid-feedback">{t("Email is required")}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">{t("Password")}</label>
            <input
              type="password"
              name="password"
              placeholder="*******"
              value={password}
              onChange={handleOnChange}
              className={
                "form-control " + (submitted && !password ? "is-invalid" : "")
              }
            />
            {submitted && !password && (
              <div className="invalid-feedback">
                {t("Password is required")}
              </div>
            )}
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              {t('Sign in')}
              {loading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
