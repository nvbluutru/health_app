import { useContext } from "react";
import Swal from "sweetalert2";
import { FormContext } from "../../context/FormContext";
import { Pagination } from "react-bootstrap";
import { getTotalPage } from "../../services/index";

export default function TablePagination() {
  const pagination = useContext(FormContext);
  const totalRow = pagination?.pagination.totalRow as number;
  const currentPage = pagination?.pagination.currentPage;
  const handleChangeItem = (e: any) => {
    const result = pagination?.handleChangeTotalRow(e.target.value.trim());
    if (!result) {
      Swal.fire({
        title: "Error!",
        text: `Number page invalid`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const renderCountPage = () => {
    const arrCount = [];
    for (
      let i = 1;
      i <= getTotalPage(totalRow, pagination?.listDeclaration.length as number);
      i++
    ) {
      arrCount.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => pagination?.handleChangeCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return arrCount;
  };
  console.log(currentPage);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="d-flex justify-content-center align-items-center gap-3">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-end m-0">
              <Pagination>
                <Pagination.Prev
                  onClick={() =>
                    pagination?.handleChangeCurrentPage(
                      (currentPage as number) - 1
                    )
                  }
                  disabled={(currentPage as number) <= 1}
                >
                  Previous
                </Pagination.Prev>
                {renderCountPage()}
                <Pagination.Next
                  onClick={() =>
                    pagination?.handleChangeCurrentPage(
                      (currentPage as number) + 1
                    )
                  }
                  disabled={
                    (currentPage as number) >=
                    getTotalPage(
                      totalRow,
                      pagination?.listDeclaration.length as number
                    )
                  }
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </ul>
          </nav>
          <form className="d-flex align-items-center justify-content-end">
            <select
              className="form-select"
              defaultValue={totalRow}
              onChange={handleChangeItem}
            >
              <option value={totalRow}>{totalRow}</option>
              {[2, 4, 6].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <label className="mx-2">Items/Page</label>
          </form>
        </div>
      </div>
    </div>
  );
}
