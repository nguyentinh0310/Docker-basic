import { useAppDispatch, useAppSelector } from "app/hooks";
import { push } from "connected-react-router";
import { logout } from "features/auth/authSlice";
import { markAsRead } from "features/notification/notificationSlice";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { INotification } from "types";

export default function Header() {
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [langue, setLangue] = useState("");
  const { t, i18n } = useTranslation();


  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const notifications = useAppSelector((state) => state.notification.items);

  const readCount = notifications.filter((item) => item.read === false).length;
  console.log(readCount);

  const markNotificationAsRead = (id: string) => {
    dispatch(markAsRead({ id: id }));
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("persist:root");
    dispatch(push("/login"));
  };

  const handleOnChangeLangue = (e: any) => {
    const { value } = e.target;
    setLangue(value);
    i18n.changeLanguage(value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="d-flex">
          <a className="navbar-brand" href="/">
            <h3>{t('Learn Docker')}</h3>
          </a>
          <select
            className="form-select"
            aria-label="Default select example"
            name="langue"
            defaultValue={langue}
            onChange={handleOnChangeLangue}
          >
            <option value="vi">VI</option>
            <option value="en">EN</option>
          </select>
        </div>
        {token && (
          <ul className="navbar-nav ml-auto ">
            <li
              className={
                "nav-item dropdown no-arrow mx-1" +
                (isShowNotification ? " show" : "")
              }
            >
              <a
                className="dropdown-toggle"
                style={{
                  color: "white",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={isShowNotification ? "true" : "false"}
                onClick={() => setIsShowNotification(!isShowNotification)}
              >
                <span className="position-relative">
                  <i className="fas fa-bell fa-fw  " />
                  {readCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {readCount}
                    </span>
                  )}
                </span>
              </a>
              <div
                className={
                  "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in " +
                  (isShowNotification ? " show" : "")
                }
                aria-labelledby="alertsDropdown"
              >
                <h6 className="dropdown-header">Alerts Center</h6>
                {notifications?.map((item: INotification) => (
                  <a
                    key={item._id}
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => markNotificationAsRead(item._id)}
                  >
                    <div className="mr-3">
                      <div className="icon-circle bg-primary"></div>
                    </div>
                    <div className="">
                      <div className="small text-gray-500">{item.date}</div>
                      <span className="font-weight-bold">{item.message}</span>
                    </div>
                  </a>
                ))}
                <a
                  className="dropdown-item text-center small text-gray-500"
                  href="/#"
                >
                  Show All Alerts
                </a>
              </div>
            </li>

            <li
              className="nav-item "
              style={{ color: "white", cursor: "pointer" }}
              onClick={handleLogout}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
