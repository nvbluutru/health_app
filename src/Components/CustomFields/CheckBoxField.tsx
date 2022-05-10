import { Form } from "react-bootstrap";

export default function CheckBoxField({ field, ...props }: any) {
  return <Form.Check {...field} {...props} />;
}
