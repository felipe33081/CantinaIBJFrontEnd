import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useHeader } from "../../../contexts/header";
import ContentContainer from "../../../containers/ContentContainer";
import { getUserList } from "../../../services/User/user";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import {
  TablePagination,
  Button,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
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
          { title: "Operador", field: "name" },
          { title: "E-mail", field: "email" },
          {
            title: "Telefone",
            field: "phoneNumber",
            filtering: false,
            render: ({ phoneNumber }) => Helper.formatPhoneNumber(phoneNumber),
          },
          {
            title: "Verificação do E-mail",
            field: "emailVerified",
            filtering: false,
            render: ({ emailVerified }) => (
              <strong
                className={`uk-text-${
                  emailVerified !== true ? "danger" : "success"
                }`}
              >
                {emailVerified == true
                  ? "E-mail verificado"
                  : "E-mail não verificado"}
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
            onClick: (_, rowData) =>
              navigate(`/usuario/editar?id=${rowData.id}`),
          },
        ]}
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
                filters.find((f) => f.column.field === "name")?.value
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

export default UserList;
