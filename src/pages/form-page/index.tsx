import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { FastField, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import {
  optionObject,
  optionGender,
  optionCountry,
  optionProvince,
  optionDistrict,
  randomId,
} from "../../services/index";
import InputField from "../../Components/CustomFields/InputField";
import SelectField from "../../Components/CustomFields/SelectField";
import { FormValue } from "../../services/interface";
import TravelForm from "../../Components/TravelForm";
import CheckBoxField from "../../Components/CustomFields/CheckBoxField";
import {
  findDeclarationById,
  setDeclaration,
  updateDeclaration,
} from "../../services/model";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useContext } from "react";
import Notfound from "../notfound/Notfound";
import { validationSchema } from "./validation";
import { FormContext } from "../../context/FormContext";
export default function Declaration() {
  const { formId } = useParams<string>();
  const navigate = useNavigate();
  const pagination = useContext(FormContext);
  let initialValues: FormValue = {
    fullName: "",
    object: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    passportId: "",
    province: "",
    district: "",
    address: "",
    email: "",
    mobile: "",
    travels: [],
    symptoms: [],
    vaccines: "",
  };
  const findDeclaration = useMemo(() => findDeclarationById(formId), [formId]);
  if (findDeclaration) {
    initialValues = findDeclaration;
  } else if (formId) {
    return <Notfound />;
  }
  const handleSubmit = (values: any) => {
    if (formId) {
      updateDeclaration(formId, values);
    } else {
      const randomFormId = "_" + randomId(5);
      setDeclaration({ formId: randomFormId, ...values });
    }
    Swal.fire({
      title: "Success!",
      text: `${formId ? "Update" : "Add"} declaration successfull!`,
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        pagination?.handleChangeCurrentPage(1);
        navigate("/", { replace: true });
      }
    });
  };
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleReset, handleSubmit, values }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <h2 className="text-success text-center my-4">
                    MEDICAL DECLARATION FORM FOR FOREIGN ENTRY
                  </h2>
                  <h1 className="fs-5 fw-bold">Personal information:</h1>
                  <FastField
                    type="text"
                    name="fullName"
                    label="Full Name"
                    component={InputField}
                    placeholder="Full Name..."
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6}>
                  <FastField
                    component={SelectField}
                    name="object"
                    label="Object"
                    options={optionObject}
                  />
                </Col>
                <Col>
                  <FastField
                    type="date"
                    name="dateOfBirth"
                    label="Date Of Birth"
                    component={InputField}
                  />
                </Col>
                <Col>
                  <FastField
                    component={SelectField}
                    name="gender"
                    label="Gender"
                    options={optionGender}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <FastField
                    component={SelectField}
                    name="nationality"
                    label="Nationality"
                    options={optionCountry}
                  />
                </Col>
                <Col>
                  <FastField
                    type="text"
                    name="passportId"
                    label="Nation ID or Passport ID"
                    component={InputField}
                    placeholder="Nation ID or Passport ID..."
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <h1 className="fs-5 fw-bold">Travel:</h1>
                <TravelForm name="travels" />
              </Row>
              <Row className="mb-3">
                <h1 className="fs-5 fw-bold">Contact:</h1>
                <Col>
                  <FastField
                    component={SelectField}
                    name="province"
                    label="Province"
                    options={optionProvince}
                  />
                </Col>
                <Col>
                  <Field
                    component={SelectField}
                    name="district"
                    label="District"
                    options={optionDistrict(values.province)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6}>
                  <FastField
                    type="text"
                    component={InputField}
                    name="address"
                    label="Address"
                    placeholder="Address..."
                  />
                </Col>
                <Col>
                  <FastField
                    type="text"
                    component={InputField}
                    name="email"
                    label="Email"
                    placeholder="Email..."
                  />
                </Col>
                <Col>
                  <FastField
                    type="text"
                    component={InputField}
                    name="mobile"
                    label="Mobile"
                    placeholder="Mobile..."
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <h1 className="fs-5 fw-bold">Symptoms:</h1>
                <Col xs={3}>Do you have any following symptoms?:</Col>
                <Col>
                  <Row xs="auto">
                    <FastField
                      type="checkbox"
                      name="symptoms"
                      value="Fiber"
                      label="Fiber"
                      component={CheckBoxField}
                    />
                    <FastField
                      type="checkbox"
                      name="symptoms"
                      value="Fever"
                      label="Fever"
                      component={CheckBoxField}
                    />
                    <FastField
                      type="checkbox"
                      name="symptoms"
                      value="Sore throat"
                      label="Sore throat"
                      component={CheckBoxField}
                    />
                    <FastField
                      type="checkbox"
                      name="symptoms"
                      value="Difficulty of breathing"
                      label="Difficulty of breathing"
                      component={CheckBoxField}
                    />
                  </Row>
                </Col>
              </Row>
              <Row className="mb-3">
                <h1 className="fs-5 fw-bold">Vaccines:</h1>
                <Col xs={3}>Which one would you like to vaccinate ?:</Col>
                <Col>
                  <Row xs="auto">
                    <FastField
                      type="radio"
                      name="vaccines"
                      value="None"
                      label="None"
                      component={CheckBoxField}
                    />
                    <FastField
                      type="radio"
                      name="vaccines"
                      value="Astra Zemecca"
                      label="Astra Zemecca"
                      component={CheckBoxField}
                    />
                    <FastField
                      type="radio"
                      name="vaccines"
                      value="Pfizer"
                      label="Pfizer"
                      component={CheckBoxField}
                    />
                    <FastField
                      type="radio"
                      name="vaccines"
                      value="Moderna"
                      label="Moderna"
                      component={CheckBoxField}
                    />
                    <FastField
                      type="radio"
                      name="vaccines"
                      value="Fiber"
                      label="Fiber"
                      component={CheckBoxField}
                    />
                    <FastField
                      type="radio"
                      name="vaccines"
                      value="Sinopharm"
                      label="Sinopharm"
                      component={CheckBoxField}
                    />
                  </Row>
                </Col>
              </Row>
              <Stack direction="horizontal" gap={3}>
                <Button variant="success" type="submit">
                  Submit
                </Button>
                <Button variant="danger">Cancel</Button>
                <Button variant="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
