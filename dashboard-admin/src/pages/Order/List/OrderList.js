import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useHeader } from "../../../contexts/header";
import ContentContainer from "../../../containers/ContentContainer";
import {
  getOrderList,
  deleteOrderById,
} from "../../../services/Order/order.js";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import { TablePagination, Button, Typography, Chip, MenuItem, Grid, Select } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import Helper from "../../../helpers/format.helpers";
import { localizationOptions } from "../../../helpers/table.helpers.ts";
import SearchIcon from '@mui/icons-material/Search';
import OrderDetailsModal from "../../../components/Modal/OrderDetailsModal.jsx";

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

const OrderList = (props) => {
  const { hideActions } = props;
  const navigate = useNavigate();
  const tableRef = React.useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setTitle } = useHeader();
  const [enableFilter, setEnableFilter] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [customerNameGrid, setCustomerNameGrid] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleOpenModal = (rowData) => {
    setSelectedRows(rowData); // Armazena os dados da linha selecionada
    setOpenModal(true); // Abre o modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Fecha o modal
  };

  const onRowsPerPageChange = (page) => {
    setRowsPerPage(page);
  };

  const handleDelete = () => {
    selectedRows.map((row) => {
      deleteOrderById(row?.id)
        .then((_) => {
          tableRef.current.onQueryChange();
        })
        .catch((error) => {
          tableRef.current.onQueryChange();
        });
    });
    setSelectedRows([]);
  };

  const handleFilterStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const actions = {
    onRefresh: () => tableRef?.current?.onQueryChange(),
    onDelete: selectedRows.length > 0 && handleDelete,
  };

  return (
    <ContentContainer className="main-content-only-table-conteiner">
      {<ActionBar {...actions} hideSubmit={true} />}
      {!hideActions && (
        <>
          <div className="uk-width-auto@m uk-width-1-1">
            <div className="uk-width-auto@m uk-width-1-1">
              <Link
                to="/pedido/novo"

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
                  Adicionar novo pedido
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
        style={{ zIndex: 1 }}
        tableRef={tableRef}
        title="Pedidos"
        columns={[
          { title: "Número do Pedido", field: "id" },
          {
            title: "Nome do Cliente",
            field: "customerPersonDisplay",
            render: (rowData) =>
              rowData.customerPersonDisplay || rowData.customerName,
            filtering: false,
          },
          {
            title: "Valor total",
            field: "totalValue",
            filtering: false,
            render: ({ totalValue }) => Helper.formatCurrencyAsIs(totalValue),
          },
          {
            title: "Status",
            field: "statusDisplay",
            render: (rowData) => (
              <Chip
                label={rowData.statusDisplay}
                style={makeStyle(rowData.statusDisplay)}
              />
            ),
            filterComponent: (props) => (
              <Select
                value={props?.columnDef?.tableData?.filterValue || ""}
                onChange={(event) => {
                  props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                }}
                fullWidth
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="InProgress">Em andamento</MenuItem>
                <MenuItem value="Finished">Finalizado</MenuItem>
                <MenuItem value="Canceled">Cancelado</MenuItem>
                <MenuItem value="Excluded">Excluído</MenuItem>
              </Select>
            ),
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
          { title: "Criado por", field: "createdBy", filtering: false },
        ].filter((x) => x !== undefined)}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Editar",
            position: "row",
            onClick: (_, rowData) => navigate(`/pedido/editar/${rowData.id}`),
          },
          {
            icon: SearchIcon,
            tooltip: "Detalhes",
            position: "row",
            onClick: (_, rowData) => handleOpenModal(rowData), // Chama a função para abrir o modal
          },
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              deleteOrderById(oldData.id)
                .then((_) => {
                  resolve();
                })
                .catch(() => {
                  resolve();
                });
            }),
        }}
        data={(allParams) =>
          new Promise((resolve, reject) => {
            const { page, pageSize, search, filters, orderBy, orderDirection } =
              allParams;

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
              orderByField: orderBy?.field,
              orderByDirection: orderDirection,
              status:
                enableFilter &&
                filters.find((f) => f.column.field === "statusDisplay")?.value,
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
        onRowsPerPageChange={onRowsPerPageChange}
        localization={localizationOptions}
        components={{
          Pagination: (props) => (
            <TablePagination {...props} rowsPerPageOptions={[5, 10, 20, 50]} />
          ),
        }}
        options={{
          selection: true,
          actionsColumnIndex: -1,
          pageSize: rowsPerPage,
          debounceInterval: 500,
          // searchAutoFocus: true,
          filtering: enableFilter,
          padding: "dense"
        }}
        onSelectionChange={(rows) => setSelectedRows(rows)}
      />
      {selectedRows && (
        <OrderDetailsModal
          open={openModal}
          onClose={handleCloseModal}
          selectedRows={selectedRows}
        />
      )}
    </ContentContainer>
  );
};

export default OrderList;
