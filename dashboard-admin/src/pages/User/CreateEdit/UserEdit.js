import React, { useState, useEffect } from "react";
import ContentContainer from "../../../containers/ContentContainer";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import {
  putUserEdit,
  getUserById,
  getUserGroupsList,
} from "../../../services/User/user";
import { Box, TextField, Button, Grid } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useHeader } from "../../../contexts/header";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { PhoneMaskInput } from "../../../components/PhoneMask/PhoneMask";
import TabPanel from "../../../components/TabPanel/TabPanel";
import { a11yProps } from "../../../components/TabPanel/TabPanel";
import MaterialTable from "material-table";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const UserEdit = () => {
  const navigate = useNavigate();
  const tableRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Captura o ID do cliente da URL
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [emailVerified, setEmailVerified] = useState("");
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await getUserGroupsList(id);
        setData(response.data);
        setLoading(true);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserGroups();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phoneNumber);
        setEmailVerified(userData.emailVerified);
        setLoading(true);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (!loading) {
    return <div className="loading-editing"></div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      name,
      email,
      phoneNumber,
      emailVerified,
    };
    await putUserEdit(id, user).then(() => {
      navigate("/usuario");
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <ContentContainer className="main-content-only-table-conteiner">
        {<ActionBar hideSubmit={true} />}
        <Box>
          <form onSubmit={handleSubmit}>
            <h1>Atualizar usuário</h1>
            <AppBar position="static">
              <Tabs
                className="tab-panel"
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Usuário" {...a11yProps(0)} />
                <Tab label="Grupos" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    fullWidth
                    label="Nome"
                    required={true}
                    value={name}
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    required={true}
                    placeholder="email@host.com"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PhoneMaskInput
                    id="phoneNumber"
                    label="Telefone"
                    fullWidth
                    value={phoneNumber}
                    required={true}
                    placeholder="(00) 00000-0000"
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                    <InputLabel id="emailVerified-label">
                      Email está verificado
                    </InputLabel>
                    <Select
                      labelId="emailVerified-label"
                      id="emailVerified"
                      value={emailVerified}
                      onChange={(e) => setEmailVerified(e.target.value)}
                      label="Email está verificado"
                      required={true}
                    >
                      <MenuItem value={true}>Verdadeiro</MenuItem>
                      <MenuItem value={false}>Falso</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button className="save-button" type="submit" variant="contained">
                <SaveOutlinedIcon style={{ color: "#fff" }} />
                Salvar
              </Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <MaterialTable
                style={{ zIndex: 1 }}
                tableRef={tableRef}
                title="Grupos"
                columns={[
                  { title: "Nome do Groupo", field: "groupName" },
                  { title: "Precedência", field: "precedence" },
                ]}
                data={data}
              />
              <Button className="add-button" variant="contained">
                <SaveOutlinedIcon style={{ color: "#fff" }} />
                Adicionar
              </Button>
              <Button className="remove-button" variant="contained">
                <SaveOutlinedIcon style={{ color: "#fff" }} />
                Remover
              </Button>
            </TabPanel>
          </form>
        </Box>
      </ContentContainer>
    </>
  );
};

export default UserEdit;
