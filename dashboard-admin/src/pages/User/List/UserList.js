import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useHeader } from "../../../contexts/header";
import ContentContainer from "../../../containers/ContentContainer";
import { getUserList, deleteUserById } from "../../../services/User/user";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import { TablePagination, Button, Typography } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import Helper from "../../../helpers/format.helpers";
import { localizationOptions } from "../../../helpers/table.helpers.ts";

const statusFiltering = [
  {
    name: "Confirmado",
    value: "CONFIRMED",
  },
  {
    name: "Alteração de Senha",
    value: "FORCE_CHANGE_PASSWORD",
  },
];

const UserList = (props) => {
  const { hideActions } = props;
  const navigate = useNavigate();
  const tableRef = React.useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { setTitle } = useHeader();
  const [paginationState, setPaginationState] = useState({ 0: null });
  const [enableFilter, setEnableFilter] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const onRowsPerPageChange = (page) => {
    setRowsPerPage(page);
    setPaginationState({ 0: null });
  };

  const handleDelete = () => {
    selectedRows.map((row) => {
      deleteUserById(row?.id)
        .then((_) => {
          tableRef.current.onQueryChange();
        })
        .catch((error) => {
          tableRef.current.onQueryChange();
        });
    });
    setSelectedRows([]);
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
                to="/usuario/novo"
                style={{ backgroundColor: "#5465ff", textDecoration: "none" }}
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
                  Adicionar novo usuário
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
        title="Usuários"
        columns={[
          { title: "Nome", field: "name" },
          { title: "E-mail", field: "email" },
          {
            title: "Telefone",
            field: "phoneNumber",
            filtering: false,
            render: ({ phoneNumber }) => Helper.formatPhoneNumber(phoneNumber),
          },
          // {
          //   title: "Verificação do E-mail",
          //   field: "emailVerified",
          //   filtering: false,
          //   render: ({ emailVerified }) => (
          //     <strong
          //       className={`uk-text-${
          //         emailVerified !== true ? "danger" : "success"
          //       }`}
          //     >
          //       {emailVerified == true
          //         ? "E-mail verificado"
          //         : "E-mail não verificado"}
          //     </strong>
          //   ),
          //   draggable: false,
          //   cellStyle: {
          //     textOverflow: "ellipsis",
          //     whiteSpace: "nowrap",
          //     overflow: "hidden",
          //     maxWidth: 200,
          //   },
          // },
          {
            title: "Status",
            field: "userStatus",
            filtering: false,
            render: ({ userStatus }) => (
              <strong
                className={`uk-text-${
                  userStatus !== "CONFIRMED" ? "danger" : "success"
                }`}
              >
                {userStatus == "CONFIRMED"
                  ? "Confirmado"
                  : "Alteração de Senha"}
              </strong>
            ),
            draggable: false,
            cellStyle: {
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: 200,
            },
          },
        ]}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Editar",
            position: "row",
            onClick: (_, rowData) => navigate(`/usuario/editar/${rowData.id}`),
          },
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              deleteUserById(oldData.id)
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
            const { page, pageSize, filters } = allParams;

            const filtersValues = {
              page,
              size: pageSize,
              email:
                enableFilter &&
                filters.find((f) => f.column.field === "email")?.value,
              name:
                enableFilter &&
                filters.find((f) => f.column.field === "name")?.value,
              paginationToken: paginationState[page],
            };

            getUserList(filtersValues)
              .then((result) => {
                setTitle("Usuários");
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
                var paginationToken = result?.paginationToken;
                setPaginationState({
                  ...paginationState,
                  [page + 1]: paginationToken,
                });
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
          selection: true,
          actionsColumnIndex: -1,
          pageSize: rowsPerPage,
          debounceInterval: 500,
          // searchAutoFocus: true,
          filtering: enableFilter,
        }}
        onSelectionChange={(rows) => setSelectedRows(rows)}
      />
    </ContentContainer>
  );
};

export default UserList;
