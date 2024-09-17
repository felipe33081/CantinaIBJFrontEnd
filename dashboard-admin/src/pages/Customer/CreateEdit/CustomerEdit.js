import React, { useState, useEffect } from "react";
import ContentContainer from "../../../containers/ContentContainer";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import {
  putCustomerEdit,
  getCustomerById,
  putResetAccountCustomer
} from "../../../services/Customer/customers";
import { Box, TextField, Button, Grid, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useHeader } from "../../../contexts/header";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { PhoneMaskInput } from "../../../components/PhoneMask/PhoneMask";
import { ArrowBackOutlined } from "@material-ui/icons";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CustomerEdit = () => {
  const [customerLoaded, setCustomerLoaded] = useState(false);
  const navigate = useNavigate();
  const { setTitle } = useHeader();
  const { id } = useParams(); // Captura o ID do cliente da URL
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getCustomerById(id);
        const customerData = response.data;
        setName(customerData.name);
        setEmail(customerData.email);
        setPhone(customerData.phone);
        setBalance(customerData.balance);
        setCustomerLoaded(true);
      } catch (error) {
        console.log(error);
        setCustomerLoaded(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (!customerLoaded) {
    return <div className="loading-editing"></div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customer = {
      name,
      email,
      phone,
    };
    try {
      const response = await putCustomerEdit(id, customer);
      navigate(`/cliente/editar/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = async () => {
    navigate("/cliente");
  }

  const handleResetAccount = async (event) => {
    event.preventDefault();
    try {
      await putResetAccountCustomer(id);
      setCustomerLoaded(true);
      
      window.location.reload();
    } catch (error) {
      console.log(error);
      setCustomerLoaded(false);
    }
  };

  return (
    <>
      <ContentContainer className="main-content-only-table-conteiner">
        {<ActionBar hideSubmit={true} />}
        <Box>
          <form onSubmit={handleSubmit}>
            <h1 className="titulosh1">Atualizar cliente</h1>
            <Button
              className="back-to-grid"
              variant="contained"
              onClick={handleBack}
            >
              <ArrowBackOutlined style={{ color: "fff" }} />
              Voltar
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  fullWidth
                  label="Nome"
                  required={true}
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PhoneMaskInput
                  id="phone"
                  label="Telefone"
                  fullWidth
                  required={true}
                  value={phone}
                  placeholder="(00) 00000-0000"
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="balance"
                  label="Saldo"
                  fullWidth
                  variant="outlined"
                  required={true}
                  value={balance.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  disabled={true}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
            <Button className="save-button" type="submit" variant="contained">
              <SaveOutlinedIcon style={{ color: "#fff" }} />
              Salvar
            </Button>
            <Button
              className="buttonFinishOrder-tabpanel"
              onClick={handleResetAccount}
              variant="contained"
            >
              <CheckCircleOutlineIcon />
              Zerar Conta - PAGO
            </Button>
          </form>
        </Box>
      </ContentContainer>
    </>
  );
};

export default CustomerEdit;
