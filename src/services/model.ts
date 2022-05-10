import { FormValue } from "./interface";
import config from "./config";

export const setDeclaration = (declaration: FormValue) => {
  const res = getListDeclaration(config.NAME_LOCALSTORAGE);
  res.push(declaration);
  localStorage.setItem(config.NAME_LOCALSTORAGE, JSON.stringify(res));
};
export const removeDeclaration = (id: string | undefined) => {
  const res = getListDeclaration(config.NAME_LOCALSTORAGE);
  const index = res.findIndex((item) => item.formId === id);
  if (index !== -1) res.splice(index, 1);
  localStorage.setItem(config.NAME_LOCALSTORAGE, JSON.stringify(res));
};
export const updateDeclaration = (
  id: string | undefined,
  declaration: FormValue
) => {
  const res = getListDeclaration(config.NAME_LOCALSTORAGE);
  const index = res.findIndex((item) => item.formId === id);
  if (index !== -1) res[index] = declaration;
  localStorage.setItem(config.NAME_LOCALSTORAGE, JSON.stringify(res));
};
export const getListDeclaration = (name: string): Array<FormValue> => {
  const res = localStorage.getItem(name);
  return res ? JSON.parse(res) : [];
};
export const findDeclarationById = (
  id: string | undefined
): FormValue | undefined => {
  const res = getListDeclaration(config.NAME_LOCALSTORAGE);
  return res.find((item) => item.formId === id);
};
