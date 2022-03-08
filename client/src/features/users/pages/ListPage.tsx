import { userApi } from "api/userApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IUser } from "types";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import swal from "sweetalert";
import { Pagination } from "../components/Pagination";
import SearchTerm from "../components/SearchTerm";
import { fetchListUser } from "../userSlice";
import queryString from "query-string";
import { useTranslation } from "react-i18next";

const ListPage = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    keyword: "",
  });

  const { loading, items, page, total, pageSize } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // TODO: Sync filter to URL
    history.push({
      pathname: history.location.pathname, // đường dẫn hiện tại
      search: queryString.stringify(filters),
    });
  }, [history, filters]);

  const queryParams = useMemo(() => {
    const params: any = queryString.parse(location.search);
    console.log(params);
    return {
      ...params,
    };
  }, [location.search]);

  useEffect(() => {
    dispatch(fetchListUser(currentPage));
  }, [dispatch, currentPage]);

  const handleSelectRow = (id: string) => {
    let newSelectedItems = [...selectedItems];
    selectedItems.indexOf(id) !== -1
      ? (newSelectedItems = selectedItems.filter((item) => item !== id))
      : newSelectedItems.push(id);

    setSelectedItems(newSelectedItems);
  };

  const onPageChanged = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(fetchListUser(pageNumber));
  };

  const handleSearchForm = (formValues: any) => {
    console.log(formValues);
    // history.push({
    //   pathname: history.location.pathname,
    //   search: queryString.stringify(formValues),
    // });
  };

  const handleEditUser = (user: IUser) => {
    history.push(`${match.url}/${user._id}`);
  };

  const handleDelete = () => {
    if (selectedItems) {
      swal({
        title: t("Comfirm"),
        text: `${t("Do you want to delete")} ${selectedItems.length} ${t(
          "user"
        )} ?`,
        icon: "warning",
        buttons: [`${t("Cancel")}`, `${t("Degree")}`],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await userApi.removeMany(selectedItems);
          setSelectedItems([]);
          dispatch(fetchListUser(currentPage));
        }
      });
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center">{t("List user")}</h1>

      <div>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/user/add">
            <button className="btn btn-primary">+{t("Add")}</button>
          </Link>
          &nbsp;
          {selectedItems.length > 0 && (
            <Fragment>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
              >
                <span className="fa fa-trash"></span> {t("Delete")}
              </button>
              &nbsp;
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setSelectedItems([])}
              >
                <i className="fas fa-check"></i> {t("Unchecked")}
              </button>
            </Fragment>
          )}
        </div>
      </div>
      <SearchTerm onSubmit={handleSearchForm} />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>{t("Fullname")}</th>
            <th>Email</th>
            <th>{t("Action")}</th>
          </tr>
        </thead>

        {loading ? (
          <tbody className="text-center">
            <tr>
              <td>
                <span className="spinner-border spinner-border-sm mt-1 text-center"></span>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {items?.map((user: IUser) => (
              <tr
                key={user._id}
                className={`table-row ${
                  selectedItems.indexOf(user._id) !== -1 ? "selected" : ""
                }`}
                onClick={() => handleSelectRow(user._id)}
              >
                <td>
                  <input
                    type="checkbox"
                    value={`${user._id}`}
                    onChange={() => handleSelectRow(user._id)}
                    checked={selectedItems.indexOf(user._id) !== -1}
                  />
                </td>
                <td>{user._id}</td>
                <td>{user.first_name + " " + user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <a
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEditUser(user)}
                  >
                    {t("Edit")}
                  </a>
                  &nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div>
        <Pagination
          totalRecords={total}
          pageLimit={5}
          pageSize={pageSize}
          onPageChanged={onPageChanged}
        ></Pagination>
      </div>
    </div>
  );
};

export default ListPage;
