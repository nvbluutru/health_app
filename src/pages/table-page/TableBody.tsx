import TableTop from "./TableTop";
import { Container } from "react-bootstrap";
import TableSearch from "./TableSearch";
import TableList from "./TableList";
import TablePagination from "./TablePagination";

export default function TableBody() {
  return (
    <Container>
      <TableTop />
      <TableSearch />
      <TableList />
      <TablePagination />
    </Container>
  );
}
