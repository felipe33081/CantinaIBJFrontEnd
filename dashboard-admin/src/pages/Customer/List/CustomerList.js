import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useHeader } from "../../../contexts/header";
import ContentContainer from "../../../containers/ContentContainer";
import {
  getCustomerList,
  deleteCustomerById,
} from "../../../services/Customer/customers";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import { TablePagination, Button, Typography, Chip } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import Helper from "../../../helpers/format.helpers";
import SearchIcon from '@mui/icons-material/Search';
import { localizationOptions } from "../../../helpers/table.helpers.ts";
import ClientDetailsModal from "../../../components/Modal/ClientDetailsModal.jsx";

const makeStyle = (balance) => {
  if (balance == 0) {
    return {
      background: "hsl(210, 10%, 58%)",
      color: "white",
    };
  }
  else if (balance < 0) {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  }
  else {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  }
};

const CustomerList = (props) => {
  const { hideActions } = props;
  const navigate = useNavigate();
  const tableRef = React.useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { setTitle } = useHeader();
  const [enableFilter, setEnableFilter] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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
      deleteCustomerById(row?.id)
        .then((_) => {
          tableRef.current.onQueryChange();
        })
        .catch((error) => {
          tableRef.current.onQueryChange();
        });
    });
    setSelectedRows([]);
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return ""; // Verifica se o número está vazio ou nulo

    // Suponha que o número de telefone tenha 10 dígitos
    const areaCode = phoneNumber.substring(0, 2);
    const firstPart = phoneNumber.substring(2, 7);
    const secondPart = phoneNumber.substring(7, 11);

    return `(${areaCode}) ${firstPart}-${secondPart}`;
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
          <div>
            <div>
              <Link
                to="/cliente/novo"
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
        style={{ zIndex: 1 }}
        tableRef={tableRef}
        title="Clientes"
        columns={[
          { title: "Nome", field: "name" },
          {
            title: "Telefone",
            field: "phone",
            filtering: false,
            render: (rowData) => formatPhoneNumber(rowData.phone),
          },
          {
            title: "Saldo",
            field: "balance",
            filtering: false,
            render: ({ balance }) => (
              <Chip
                style={makeStyle(balance)}
                label={Helper.formatCurrencyAsIs(balance)}
              />
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
          { title: "Criado por", field: "createdBy" },
        ].filter((x) => x !== undefined)}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Editar",
            position: "row",
            onClick: (_, rowData) => navigate(`/cliente/editar/${rowData.id}`),
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
              deleteCustomerById(oldData.id)
                .then((_) => {
                  resolve();
                })
                .catch((error) => {
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
              orderByDirection: orderDirection,
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
        }}
        onSelectionChange={(rows) => setSelectedRows(rows)}
      />
      {selectedRows && (
        <ClientDetailsModal
          open={openModal}
          onClose={handleCloseModal}
          selectedRows={selectedRows}
        />
      )}
    </ContentContainer>
  );
};

export default CustomerList;
