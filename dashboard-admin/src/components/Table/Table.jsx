import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { TablePagination, Chip } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import { useHeader } from "../../contexts/header";
import "./Table.css";
import Helper from "../../helpers/format.helpers";
import { getOrderList } from "../../services/Order/order";
import moment from "moment";
import DatePicker from "@mui/lab/DatePicker";
import { localizationOptions } from "../../helpers/table.helpers.ts";

const makeStyle = (statusDisplay) => {
  if (statusDisplay === "Finalizado") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (statusDisplay === "Excluído") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else if (statusDisplay === "Em andamento") {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable() {
  const tableRef = React.useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { setTitle } = useHeader();
  const [enableFilter, setEnableFilter] = useState(false);

  const onRowsPerPageChange = (page) => {
    setRowsPerPage(page);
  };

  return (
    <div className="Table-refe">
      <MaterialTable
        style={{ zIndex: 1 }}
        tableRef={tableRef}
        title="Pedidos Recentes"
        columns={[
          { title: "Número do Pedido", field: "id", sorting: false },
          {
            title: "Nome do Cliente",
            field: "customerPersonDisplay",
            sorting: false,
            render: (rowData) =>
              rowData.customerPersonDisplay || rowData.customerName,
            filtering: false,
          },
          {
            title: "Valor total",
            field: "totalValue",
            sorting: false,
            filtering: false,
            render: ({ totalValue }) => Helper.formatCurrencyAsIs(totalValue),
          },
          {
            title: "Status",
            field: "statusDisplay",
            sorting: false,
            render: (rowData) => (
              <Chip
                label={rowData.statusDisplay}
                style={makeStyle(rowData.statusDisplay)}
              />
            ),
          },
          {
            title: "Criado em",
            field: "createdAt",
            sorting: false,
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
          {
            title: "Criado por",
            field: "createdBy",
            sorting: false,
            filtering: false,
          },
        ].filter((x) => x !== undefined)}
        data={(allParams) =>
          new Promise((resolve, reject) => {
            const { page, pageSize, search, filters } = allParams;
            const createdAt = filters.find(
              (f) => f.column.field === "createdAt"
            )?.value;

            const filterFinalDate =
              enableFilter &&
              createdAt &&
              moment(createdAt).isValid() &&
              moment(createdAt).set("hour", "23").set("minute", "59")?._d;

            const customerFilterValue =
              enableFilter &&
              filters.find(
                (f) =>
                  f.column.field === "customerPersonDisplay" ||
                  f.column.field === "customerName"
              )?.value;

            const filterInitialDate =
              enableFilter &&
              createdAt &&
              moment(createdAt).isValid() &&
              moment(createdAt).set("hour", "0").set("minute", "0")?._d;

            const filtersValues = {
              id:
                enableFilter &&
                filters.find((f) => f.column.field === "id")?.value,
              customerFilterValue,
              initialDate: filterInitialDate,
              finalDate: filterFinalDate,
              page,
              size: pageSize,
              searchString: search,
              orderByField: "createdAt",
              orderByDirection: "desc",
            };

            getOrderList(filtersValues)
              .then((result) => {
                setTitle("Pedidos");
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
        /*actions={[
          {
            icon: SearchIcon,
            tooltip: "Detalhes",
            position: "row",
            onClick: (_, rowData) => navigate(`/pedido/editar/${rowData.id}`),
          },
        ]}*/
        onChangeRowsPerPage={onRowsPerPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        localization={localizationOptions}
        components={{
          Pagination: (props) => (
            <TablePagination {...props} rowsPerPageOptions={[5, 10, 20, 50]} />
          ),
        }}
        options={{
          selection: false,
          search: false,
          actionsColumnIndex: -1,
          pageSize: rowsPerPage,
          debounceInterval: 500,
          // searchAutoFocus: true,
        }}
      />
    </div>
  );
}
