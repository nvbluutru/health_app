import * as Yup from "yup";

export const validationSchema = Yup.object({
  fullName: Yup.string().required("Name is required"),
  object: Yup.string().required("Object is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  nationality: Yup.string().required("Nationality is required"),
  passportId: Yup.string().required("Passport id is required"),
  province: Yup.string().required("Province is required"),
  district: Yup.string().required("District is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().required("Email is required").email("Email invalidate"),
  mobile: Yup.string()
    .required("Mobile is requried")
    .min(10, "Phone number must be 10 digits"),
  travels: Yup.array().of(
    Yup.object().shape({
      departureDate: Yup.string().required("Departure Date is required"),
      immigration: Yup.string().required("Immigration Date is required"),
      departure: Yup.string().required("Departure is required"),
      destination: Yup.string().required("Destination is required"),
    })
  ),
});
