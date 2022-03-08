import { userApi } from "api/userApi";
import { IUser } from "types";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserForm from "../components/UserForm";

const AddEditPage = () => {
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const isEdit = Boolean(userId);
  const [user, setUser] = useState<IUser>();


  useEffect(() => {
    if (!userId) return;

    // IFFE
    (async () => {
      try {
        const data: IUser = await userApi.getById(userId);
        setUser(data);
      } catch (error) {
        console.log("Failed to fetch student details", error);
      }
    })();
  }, [userId]);

  const defaultValues: any = Boolean(userId)
    ? user
    : {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      };

  const handleFormSubmit = async (formValues: IUser) => {
    if (isEdit) {
      await userApi.update(formValues);
    } else {
      await userApi.add(formValues);
    }
    toast.success("Save student successfully!");

    history.push("/");
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">{isEdit ? "Update user" : "Add new user"}</h1>
      {(!isEdit || Boolean(user)) && (
        <UserForm
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default AddEditPage;
