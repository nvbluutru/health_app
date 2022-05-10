import { Table } from "react-bootstrap";
import { getListDeclaration, removeDeclaration } from "../../services/model";
import config from "../../services/config";
import { FormValue } from "../../services/interface";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FormContext } from "../../context/FormContext";
import { useEffect, useContext } from "react";
import { getTotalPage } from "../../services";
export default function TableList() {
  const search = useContext(FormContext);
  useEffect(() => {
    renderSearch();
  }, [search?.search]);
  useEffect(() => {
    const { totalRow, currentPage } = search?.pagination as any;
    const totalPage = getTotalPage(
      totalRow as number,
      search?.listDeclaration.length as number
    );
    if ((currentPage as number) > totalPage) {
      search?.handleChangeCurrentPage(totalPage);
    }
  }, [search?.listDeclaration, search?.search, search?.pagination.totalRow]);
  const renderSearch = () => {
    const data = getListDeclaration(config.NAME_LOCALSTORAGE);
    const newData: Array<FormValue> = data.filter((item) => {
      const arrayValue = Object.values(item);
      const stringValue = arrayValue.join(" ").toLowerCase();
      return (
        stringValue.includes(search?.search.toLowerCase().trim() as string) &&
        item
      );
    });
    search?.handChangeListDeclaration(newData);
  };
  const lastSlice =
    (search?.pagination.currentPage as number) *
    (search?.pagination.totalRow as number);
  const firstSlice = lastSlice - (search?.pagination.totalRow as number);
  const tempListDeclaration = search?.listDeclaration && [
    ...search?.listDeclaration,
  ];
  const listDeclarationSlice = tempListDeclaration
    ?.reverse()
    .slice(firstSlice, lastSlice);
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th>Form ID</th>
          <th>Full Name</th>
          <th>Object</th>
          <th>Date Of Birth</th>
          <th>Gender</th>
          <th>Contact Province</th>
        </tr>
      </thead>
      <tbody>
        {(search?.listDeclaration.length as number) > 0 ? (
          listDeclarationSlice?.map((item: FormValue, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/declaration/${item.formId}`}>
                  <i className="fa-solid fa-pen-to-square me-2 text-success"></i>
                </Link>
                <i
                  className="fa-solid fa-trash-can me-3 text-danger"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        removeDeclaration(item.formId);
                        Swal.fire({
                          title: "Success!",
                          text: "Delete declaration successfull!",
                          icon: "success",
                          confirmButtonText: "OK",
                        });
                        search?.handChangeListDeclaration(
                          getListDeclaration(config.NAME_LOCALSTORAGE)
                        );
                      }
                    });
                  }}
                ></i>
                {item.formId}
              </td>
              <td>{item.fullName}</td>
              <td>{item.object}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.gender}</td>
              <td>{item.province}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className="text-center">
              No Declarations
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
