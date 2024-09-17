import React, { useState } from "react";
import ContentContainer from "../../../containers/ContentContainer";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import { postUserCreate } from "../../../services/User/user";
import { Box, TextField, Button, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { PhoneMaskInput } from "../../../components/PhoneMask/PhoneMask";
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const UserCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      name,
      email,
      phoneNumber,
      password,
    };
    await postUserCreate(user).then(() => {
      navigate("/usuario");
    });
  };

  return (
    <>
      <ContentContainer className="main-content-only-table-conteiner">
        {<ActionBar hideSubmit={true} />}
        <Box>
          <form onSubmit={handleSubmit}>
            <h1 className="titulosh1">Cadastro de usuário</h1>

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
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  label="Email"
                  fullWidth
                  variant="outlined"
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
                  required={true}
                  placeholder="(00) 00000-0000"
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="password"
                  label="Senha Temporária"
                  fullWidth
                  variant="outlined"
                  required={true}
                  placeholder="Senha@123"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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

export default UserCreate;
