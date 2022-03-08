import { IUser } from "types";
import React, { ChangeEvent, FormEvent, useState } from "react";

export interface UserFormProps {
  defaultValues: IUser;
  onSubmit?: (formValues: IUser) => void;
  isEdit: boolean;
}

export default function UserForm({
  defaultValues,
  onSubmit,
  isEdit,
}: UserFormProps) {
  const [values, setValues] = useState<IUser>(defaultValues);
  const { first_name, last_name, email, password } = values;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmitForm}>
        <div className="mb-3">
          <label className="form-label">Frist Name</label>
          <input
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        {!isEdit && (
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="text"
              name="password"
              value={password}
              onChange={handleOnChange}
              className="form-control"
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
