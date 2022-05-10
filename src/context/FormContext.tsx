import { useState, createContext } from "react";
import {
  AppContextInterface,
  FormValue,
  Pagination,
} from "../services/interface";
import { getListDeclaration } from "../services/model";
import config from "../services/config";
import { getTotalPage } from "../services/index";
const FormContext = createContext<AppContextInterface | null>(null);

function FormProvider({ children }: any) {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<Pagination>({
    totalRow: 2,
    currentPage: 1,
  });
  const [listDeclaration, setListDeclaration] = useState(
    getListDeclaration(config.NAME_LOCALSTORAGE)
  );
  const handleChangeTotalRow = (value: number) => {
    if ([2, 4, 6].indexOf(Number(value)) !== -1) {
      setPagination({
        ...pagination,
        totalRow: value,
      });
      return true;
    } else {
      return false;
    }
  };
  const handChangeListDeclaration = (value: Array<FormValue>) => {
    setListDeclaration(() => value);
  };
  const handleChangeCurrentPage = (newPage: number) => {
    if (
      newPage >
        getTotalPage(
          pagination.totalRow,
          getListDeclaration(config.NAME_LOCALSTORAGE).length
        ) ||
      newPage < 1
    )
      return;
    setPagination((prevState) => ({ ...prevState, currentPage: newPage }));
  };
  const handleChangeSearch = (value: string) => {
    setSearch(value);
  };
  const value: AppContextInterface = {
    search,
    pagination,
    listDeclaration,
    handChangeListDeclaration,
    handleChangeSearch,
    handleChangeTotalRow,
    handleChangeCurrentPage,
  };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
export { FormContext, FormProvider };
