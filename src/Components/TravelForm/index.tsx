import { FastField, FieldArray, useField } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { Travel } from "../../services/interface";
import InputField from "../CustomFields/InputField";
import SelectField from "../CustomFields/SelectField";
import { optionCountry } from "../../services";
export default function TravelForm(props: any) {
  const [field, meta] = useField(props);
  const { value } = meta;
  return (
    <FieldArray
      name={field.name}
      render={(arrayHelpers) => (
        <>
          {value && value.length > 0 ? (
            value.map((travel: Travel, index: number) => {
              return (
                <div key={index}>
                  <span className="text-primary fw-bold">
                    Travel {index + 1}
                  </span>
                  <Row className="mb-3">
                    <Col>
                      <FastField
                        type="date"
                        component={InputField}
                        name={`travels.${index}.departureDate`}
                        label="Departure Date"
                      />
                    </Col>
                    <Col>
                      <FastField
                        type="date"
                        component={InputField}
                        name={`travels.${index}.immigration`}
                        label="Immigration Date"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <FastField
                        component={SelectField}
                        name={`travels.${index}.departure`}
                        label="Departure"
                        options={optionCountry}
                      />
                    </Col>
                    <Col>
                      <FastField
                        component={SelectField}
                        name={`travels.${index}.destination`}
                        label="Destination"
                        options={optionCountry}
                      />
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs="auto">
                      <Button
                        variant="warning"
                        className="me-3"
                        onClick={() =>
                          arrayHelpers.insert(index + 1, {
                            departureDate: "",
                            immigration: "",
                            departure: "",
                            destination: "",
                          })
                        }
                      >
                        Add more
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </div>
              );
            })
          ) : (
            <Row className="align-items-center" xs="auto">
              <Col>
                <h6>Do you travel in the last 14 days ?</h6>
              </Col>
              <Col>
                <Button
                  variant="warning"
                  onClick={() => {
                    arrayHelpers.push({
                      departureDate: "",
                      immigration: "",
                      departure: "",
                      destination: "",
                    });
                  }}
                >
                  Add more
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}
    />
  );
}
