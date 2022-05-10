import provinceAndDistince from "../data/vietnam-province-district.json";
import { Province, Option } from "./interface";
import country from "../data/countries.json";
export const getProvince = (): Array<Province> => {
  const values = Object.values(provinceAndDistince);
  return values.map((item) => ({
    label: item.name,
    value: item.name,
    cities: Object.values(item.cities),
  }));
};
export const getDistrict = (province: string): Array<string> => {
  const findProvince = getProvince().find((item) => item.label === province);
  return findProvince ? findProvince.cities : [];
};
export const randomId = (length: number) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const getValueForPath = (obj: object, path: string) => {
  try {
    const arrPath = path.split(".");
    let values: any = { ...obj };
    for (let item of arrPath) {
      values = values[`${item}`];
    }
    return values;
  } catch (e) {
    return undefined;
  }
};
export const getTotalPage = (totalRow: number, TotalData: number) => {
  return Math.ceil(TotalData / totalRow);
};
export const optionObject: Array<Option> = [
  {
    label: "Choose...",
    value: "",
  },
  {
    label: "Expert",
    value: "Expert",
  },
  {
    label: "Vietnamese",
    value: "Vietnamese",
  },
  {
    label: "International Student",
    value: "International Student",
  },
  {
    label: "Order",
    value: "Order",
  },
];

export const optionGender: Array<Option> = [
  {
    label: "Choose...",
    value: "",
  },
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Order",
    value: "Order",
  },
];
export const optionCountry: Array<Option> = [
  {
    label: "Choose...",
    value: "",
  },
  ...country.map((item) => ({
    label: item.name,
    value: item.name,
  })),
];
export const optionProvince: Array<Option> = [
  {
    label: "Choose...",
    value: "",
  },
  ...getProvince().map((item) => ({
    label: item.label,
    value: item.value,
  })),
];
export const optionDistrict = (province: string): Array<Option> => {
  const resultDistrict = getDistrict(province).map((item) => ({
    label: item,
    value: item,
  }));
  resultDistrict.unshift({
    label: "Choose...",
    value: "",
  });

  return resultDistrict;
};
