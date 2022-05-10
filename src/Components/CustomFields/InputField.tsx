import { Form } from "react-bootstrap";
import { getValueForPath } from "../../services/index";

export default function InputField({ field, form, ...props }: any) {
  const { label } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError =
    getValueForPath(touched, name) && getValueForPath(errors, name);

  return (
    <Form.Group>
      <Form.Label htmlFor={name}>
        {label}
        <Form.Text className="text-danger">*</Form.Text>
      </Form.Label>
      <Form.Control
        className="form-control"
        id={name}
        {...field}
        {...props}
        isValid={getValueForPath(touched, name)}
        isInvalid={showError}
      />
      <Form.Control.Feedback type="invalid">
        {getValueForPath(errors, name)}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
