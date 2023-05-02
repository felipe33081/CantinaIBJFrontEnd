import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHeader } from "../../../contexts/header";
import ContentContainer from "../../../containers/ContentContainer";
import { getCustomerList } from "../../../services/Customer/Customer.js";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import TablePaginationActions from "../../../components/TablePaginationActions/TablePaginationActions";
import TableFooter from "@mui/material/TableFooter";
import {
  TablePagination,
  Button,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import DatePicker from "@mui/lab/DatePicker";

const CustomerList = (props) => {
  const { hideActions } = props;
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const tableRef = React.useRef(null);
  const [enableFilter, setEnableFilter] = useState(false);
  const [rows, setClients] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCustomerList();
      setClients(result.data);
    };
    fetchData();
  }, []);

  const actions = {
    onRefresh: () => tableRef?.current?.onQueryChange(),
  };

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  return (
    <ContentContainer className="main-content-only-table-conteiner">
      {<ActionBar {...actions} hideSubmit={true} />}
      {!hideActions && (
        <>
          <div className="uk-width-auto@m uk-width-1-1">
            <div className="uk-width-auto@m uk-width-1-1">
              <Link
                to="/cliente/novo"
                style={{ backgroundColor: "#fca311", textDecoration: "none" }}
                className="uk-button"
              >
                <i
                  className="uk-margin-small-right"
                  style={{ color: "white" }}
                ></i>
                <Typography
                  component="span"
                  style={{ color: "white", textTransform: "none" }}
                >
                  Adicionar novo cliente
                </Typography>
              </Link>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => setEnableFilter(!enableFilter)}
              >
                <FilterListIcon /> Filtrar
              </Button>
            </div>
          </div>
          <br />
        </>
      )}
      <Box sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Saldo</TableCell>
                <TableCell>Criado em</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.phone}</TableCell>
                  <TableCell>{data.balance}</TableCell>
                  <TableCell>{data.createdAt}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage="Itens por Página"
                  rowsPerPageOptions={[ 5, 10, 25, 50,
                    { label: "All", value: -1 },
                  ]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </ContentContainer>
  );
};

export default CustomerList;
