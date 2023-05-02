import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useHeader } from "../../../contexts/header";
import ContentContainer from "../../../containers/ContentContainer";
import { getCustomerList } from "../../../services/Customer/Customer.js";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import { TablePagination, Button, Typography } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import Helper from "../../../helpers/format.helpers";
import { localizationOptions } from "../../../helpers/table.helpers.ts";

const CustomerList = (props) => {
  const { hideActions } = props;
  const navigate = useNavigate();
  const tableRef = React.useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(
    localStorage.getItem("rowsPerPage") || 5
  );
  const { setTitle } = useHeader();
  const [enableFilter, setEnableFilter] = useState(false);

  const onRowsPerPageChange = (page) => {
    setRowsPerPage(page);
    localStorage.setItem("rowsPerPage", page);
  };

  const actions = {
    onRefresh: () => tableRef?.current?.onQueryChange(),
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
      <MaterialTable
        style={{ zIndex:1}}
        tableRef={tableRef}
        title="Clientes"
        columns={[
          { title: "Nome", field: "name" },
          { title: "Email", field: "email" },
          { title: "Telefone", field: "phone", filtering: false },
          {
            title: "Saldo",
            field: "balance",
            filtering: false,
            render: ({ balance }) => Helper.formatCurrencyAsIs(balance),
          },
          {
            title: "Criado em",
            field: "createdAt",
            render: ({ createdAt }) =>
              createdAt && new Date(createdAt).toLocaleDateString("pt-BR"),
            filterComponent: (props) => (
              <DatePicker
                {...props}
                format="dd/MM/yyyy"
                InputLabelProps={{ shrink: true }}
                placeholder="dd/mm/aaaa"
                variant="inline"
                value={props?.columnDef?.tableData?.filterValue || null}
                disableFuture={true}
                onChange={(e) =>
                  props.onFilterChanged(props?.columnDef?.tableData?.id, e)
                }
                helperText={false}
              />
            ),
          },
        ].filter((x) => x !== undefined)}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Editar",
            position: "row",
            onClick: (_, rowData) =>
              navigate(`/cliente/editar?id=${rowData.id}`),
          },
        ]}
        data={(allParams) =>
          new Promise((resolve, reject) => {
            const { page, pageSize, search, filters, orderBy, orderDirection  } = allParams;

            const createdAt = filters.find(
              (f) => f.column.field === "createdAt"
            )?.value;

            const filterFinalDate =
              enableFilter &&
              createdAt &&
              moment(createdAt).isValid() &&
              moment(createdAt).set("hour", "23").set("minute", "59")?._d;

            const filterInitialDate =
              enableFilter &&
              createdAt &&
              moment(createdAt).isValid() &&
              moment(createdAt).set("hour", "0").set("minute", "0")?._d;

            const filtersValues = {
              name:
                enableFilter &&
                filters.find((f) => f.column.field === "name")?.value,
              email:
                enableFilter &&
                filters.find((f) => f.column.field === "email")?.value,
              initialDate: filterInitialDate,
              finalDate: filterFinalDate,
              page,
              size: pageSize,
              searchString: search,
              orderByField: orderBy?.field,
              orderByDirection: orderDirection
            };

            getCustomerList(filtersValues)
              .then((result) => {
                setTitle("Clientes");
                if (result?.data)
                  resolve({
                    data: result?.data,
                    page: result?.page,
                    totalCount: result?.totalItems,
                  });
                else {
                  resolve({
                    data: [],
                    page: 0,
                    totalCount: 0,
                  });
                }
              })
              .catch((err) => reject(err));
          })
        }
        onChangeRowsPerPage={onRowsPerPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        localization={localizationOptions}
        components={{
          Pagination: (props) => (
            <TablePagination {...props} rowsPerPageOptions={[5, 10, 20, 50]} />
          ),
        }}
        options={{
          actionsColumnIndex: -1,
          pageSize: rowsPerPage,
          debounceInterval: 500,
          // searchAutoFocus: true,
          filtering: enableFilter,
        }}
      />
    </ContentContainer>
  );
};

export default CustomerList;
