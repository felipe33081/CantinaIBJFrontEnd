import {
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import ContentContainer from "../../../containers/ContentContainer";
import { postProductCreate } from "../../../services/Product/product";
import { useNavigate } from "react-router";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { useState } from "react";
import FormattedInputs from "./FormattedInputs.js";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const product = {
      name,
      description,
      price,
      quantity,
    };
    const response = await postProductCreate(product);
    navigate(`/produto/editar/${response}`);
  };

  return (
    <>
      <ContentContainer className="main-content-only-table-conteiner">
        {<ActionBar hideSubmit={true} />}
        <Box>
          <form onSubmit={handleSubmit}>
            <h1 className="titulosh1">Cadastro de produto</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
                <FormattedInputs 
                  required={true}
                  label="Preço"
                  onChange={(e) => setPrice(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="quantity"
                  fullWidth
                  label="Quantidade"
                  required={true}
                  variant="outlined"
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label="Descrição"
                  fullWidth
                  required={false}
                  variant="outlined"
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
            <Button className="save-button" type="submit" variant="contained">
              <SaveOutlinedIcon style={{ color: "fff" }} />
              Cadastrar
            </Button>
          </form>
        </Box>
      </ContentContainer>
    </>
  );
};

export default ProductCreate;
