import style from "./css/Table.module.css";
import { Link } from "react-router-dom";
import { FormContext } from "../../context/FormContext";
import { useContext } from "react";
export default function TableSearch() {
  const search = useContext(FormContext);
  return (
    <form className={style.form}>
      <input
        type="text"
        className={style.form__input}
        placeholder="Search..."
        onChange={(e) => search?.handleChangeSearch(e.target.value)}
      />
      <Link to="/declaration" className="btn btn-success btn-md">
        New Form
      </Link>
    </form>
  );
}
