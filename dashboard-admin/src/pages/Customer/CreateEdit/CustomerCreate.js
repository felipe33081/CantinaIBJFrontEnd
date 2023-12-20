import React, { useState } from "react";
import ContentContainer from "../../../containers/ContentContainer";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import { postCustomerCreate } from "../../../services/Customer/customers";
import { Box, TextField, Button, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { PhoneMaskInput } from "../../../components/PhoneMask/PhoneMask";

const CustomerCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customer = {
      name,
      phone,
    };
    const response = await postCustomerCreate(customer);
    navigate(`/cliente/editar/${response}`);
  };

  return (
    <>
      <ContentContainer className="main-content-only-table-conteiner">
        {<ActionBar hideSubmit={true} />}
        <Box>
          <form onSubmit={handleSubmit}>
            <h1 className="titulosh1">Cadastro de cliente</h1>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  fullWidth
                  label="Nome"
                  required={true}
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <PhoneMaskInput
                  id="phone"
                  label="Telefone"
                  fullWidth
                  required={true}
                  placeholder="(00) 00000-0000"
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
            <Button className="save-button" type="submit" variant="contained">
              <SaveOutlinedIcon style={{ color: "#fff" }} />
              Cadastrar
            </Button>
          </form>
        </Box>
      </ContentContainer>
    </>
  );
};

export default CustomerCreate;
