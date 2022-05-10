export interface Province {
  label: string;
  value: string;
  cities: string[];
}
export interface Option {
  label: string;
  value: string;
}
export interface Travel {
  departureDate: string;
  immigration: string;
  departure: string;
  destination: string;
}
export interface FormValue {
  formId?: string;
  fullName: string;
  object: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportId: string;
  province: string;
  district: string;
  address: string;
  email: string;
  mobile: string;
  travels: Array<Travel>;
  symptoms: string[];
  vaccines: string;
}
export interface Pagination {
  totalRow: number;
  currentPage: number;
}
export interface AppContextInterface {
  search: string;
  pagination: Pagination;
  listDeclaration: Array<FormValue>;
  handChangeListDeclaration: (value: Array<FormValue>) => void;
  handleChangeSearch: (value: string) => void;
  handleChangeTotalRow: (value: number) => void;
  handleChangeCurrentPage: (value: number) => void;
}
