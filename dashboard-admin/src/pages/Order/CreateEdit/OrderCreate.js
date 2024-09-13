import React, { useState, useEffect, useRef } from "react";
import ContentContainer from "../../../containers/ContentContainer";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import { postOrderCreate } from "../../../services/Order/order";
import { Box, TextField, Button, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FormControl, Checkbox } from "@material-ui/core";
import PropTypes from "prop-types";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TabPanel from "../../../components/TabPanel/TabPanel";
import { a11yProps } from "../../../components/TabPanel/TabPanel";
import MaterialTable from "material-table";
import { fetchCustomerList } from "../../../services/Customer/customers";
import { Autocomplete } from "@mui/material";
import { fetchProductList } from "../../../services/Product/product";
import { styled } from "@mui/system";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const CustomAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    padding: "11px", // Ajuste o padding conforme necessário para alterar a altura
  },
});

const OrderCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPersonId, setCustomerPerson] = useState();
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [showCustomerName, setShowCustomerName] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProduct] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchProductList();
        setProducts(response.data);
        setLoading(true);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCustomerPersons = async () => {
      try {
        const response = await fetchCustomerList();
        setCustomers(response.data);
        setLoading(true);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCustomerPersons();
  }, []);

  const handleProductsChange = async (event, newValue) => {
    if (newValue !== null) {
      try {
        const response = await fetchProductList({ searchString: newValue });
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao obter a lista de produtos:", error);
      }
    }
  };

  const handleRowUpdate = (newData, oldData) => {
    const updatedData = [...data];
    const index = oldData.tableData.id;
  
    // Certifique-se de que a quantidade seja um número válido
    const quantity = Number(newData.quantity);
  
    // Verifique se o preço está presente e é válido
    const price = parseFloat(newData.price.replace('R$', '').trim());
  
    // Atualize o valor total do preço
    newData.totalValue = `R$ ` + (price * quantity).toFixed(2);
  
    updatedData[index] = newData;
    setData(updatedData);
  };

  const handleAddRow = () => {
    if (selectedProduct && selectedProductQuantity) {
      setData([
        ...data,
        {
          productId: selectedProduct.id,
          nameProduct: `${selectedProduct.name} - ${selectedProduct.description}`,
          quantity: selectedProductQuantity,
          price: `R$ ` + selectedProduct.price,
          totalValue: `R$ ` + selectedProduct.price * selectedProductQuantity
        },
      ]);
      // Limpe os estados após adicionar um item
      setSelectedProduct(null);
      setSelectedProductQuantity("");
    }
  };

  const handleDeleteRow = (rowData) => {
    const newData = [...data];
    newData.splice(rowData.tableData.id, 1);
    setData(newData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const order = {
      customerName,
      customerPersonId: customerPersonId ? customerPersonId.id : null,
      products: data.map((item) => ({
        productId: item.productId,
        quantity: parseInt(item.quantity),
      })),
    };
    const response = await postOrderCreate(order);
    navigate(`/pedido/editar/${response}`);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCustomerPersonChange = async (event, newValue) => {
    if (newValue !== null) {
      try {
        const response = await fetchCustomerList({ Name: newValue });
        setCustomers(response.data);
      } catch (error) {
        console.error("Erro ao obter a lista de clientes:", error);
      }
    }
  };

  const handleCheckboxChange = (event) => {
    setShowCustomerName(event.target.checked);
    setCustomerName("");
    setCustomerPerson(null);
  };

  if (!loading) {
    return <div className="loading-editing"></div>;
  }

  return (
    <>
      <ContentContainer className="main-content-only-table-conteiner">
        {<ActionBar hideSubmit={true} />}
        <Box>
          <form onSubmit={handleSubmit}>
            <h1 className="titulosh1">Cadastro de pedido</h1>
            <AppBar position="static">
              <Tabs
                className="tab-panel"
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Cliente" {...a11yProps(0)} />
                <Tab label="Produtos" {...a11yProps(1)} />
              </Tabs>
            </AppBar>

            {/* Tab menu de Cliente */}
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                <Grid>
                  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <p className="client-register">
                      O Cliente tem Cadastro? (Marque para selecionar o cliente
                      cadastrado)
                    </p>
                  </FormControl>
                </Grid>
                <Grid item xs={0}>
                  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <Checkbox
                      checked={showCustomerName}
                      onChange={handleCheckboxChange}
                    />
                  </FormControl>
                </Grid>
                {!showCustomerName && (
                  <Grid item xs={12}>
                    <TextField
                      id="customerName"
                      name="customerName"
                      fullWidth
                      label="Nome do cliente"
                      value={customerName}
                      variant="outlined"
                      onChange={(e) => setCustomerName(e.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                )}
                {showCustomerName && (
                  <Grid item xs={12} sm={12}>
                    <CustomAutocomplete
                      id="customerPerson"
                      options={customers}
                      getOptionLabel={(customer) => customer.name}
                      value={customerPersonId}
                      onChange={(event, newValue) =>
                        setCustomerPerson(newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Selecione o cliente"
                          variant="outlined"
                          onChange={(e) =>
                            handleCustomerPersonChange(e, e.target.value)
                          }
                          sx={{ mb: 3 }}
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>
            </TabPanel>

            {/* Tab menu de Produtos */}
            <TabPanel value={value} index={1}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CustomAutocomplete
                    id="productId"
                    options={products}
                    getOptionLabel={(product) =>
                      `${product.name} - ${product.description}`
                    }
                    value={selectedProduct} // Estado para armazenar o produto selecionado
                    onChange={(event, newValue) => setSelectedProduct(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Selecione o produto"
                        fullWidth
                        variant="outlined"
                        onChange={(e) =>
                          handleProductsChange(e, e.target.value)
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    label="Quantidade"
                    variant="outlined"
                    fullWidth
                    value={selectedProductQuantity} // Estado para armazenar a quantidade
                    onChange={(event) =>
                      setSelectedProductQuantity(event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    className="buttonAdd-tabpanel"
                    onClick={handleAddRow}
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    Adicionar Produto
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {/* Tabela para exibir os produtos adicionados */}
                  <MaterialTable
                    style={{ zIndex: 1 }}
                    columns={[
                      {
                        title: "Nome do Produto",
                        field: "nameProduct",
                        editable: 'never'
                      },
                      {
                        title: "Quantidade",
                        field: "quantity",
                        editable: 'onUpdate',
                        editComponent: props => (
                          <input
                            type="number"  // Define o input como numérico
                            value={props.value}
                            onChange={e => props.onChange(e.target.value)}
                            min="0"  // Evita números negativos
                            step="1" // Incrementa de 1 em 1
                            style={{ width: "100%" }}  // Garante que o campo use toda a largura da célula
                          />
                        )
                      },
                      {
                        title: "Preço Unitário",
                        field: "price",
                        editable: 'never'
                      },
                      {
                        title: "Preço Total",
                        field: "totalValue",
                        editable: 'never'
                      }
                    ]}
                    data={data}
                    title="Produtos"
                    variant="outlined"
                    options={{
                      actionsColumnIndex: -1,
                      search: false,
                      paging: false,
                      toolbar: false,
                    }}
                    editable={{
                      onRowDelete: (rowData) =>
                        new Promise((resolve, reject) => {
                          handleDeleteRow(rowData);
                          resolve();
                        }),
                        onRowUpdate: (rowData, oldData) =>
                        new Promise((resolve, reject) => {
                          handleRowUpdate(rowData, oldData);
                          resolve();
                        })
                    }}
                  />
                </Grid>
              </Grid>
            </TabPanel>
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

export default OrderCreate;
