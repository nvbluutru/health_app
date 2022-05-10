import { Form } from "react-bootstrap";
import { Option } from "../../services/interface";
import { getValueForPath } from "../../services/index";

export default function SelectField({ field, form, options, ...props }: any) {
  const { label } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError =
    getValueForPath(touched, name) && getValueForPath(errors, name);
  return (
    <Form.Group>
      <Form.Label>
        {label}
        <Form.Text className="text-danger">*</Form.Text>
      </Form.Label>
      <Form.Select
        {...field}
        {...props}
        isValid={getValueForPath(touched, name)}
        isInvalid={showError}
      >
        {options?.map((item: Option, index: number) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">{showError}</Form.Control.Feedback>
    </Form.Group>
  );
}
