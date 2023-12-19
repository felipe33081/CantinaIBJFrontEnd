import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentContainer from "../../../containers/ContentContainer";
import ActionBar from "../../../components/ActionBar/ActionBar.tsx";
import { putOrderEdit, getOrderById } from "../../../services/Order/order";
import { Box, TextField, Button, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FormControl, Checkbox } from "@material-ui/core";
import PropTypes from "prop-types";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
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

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPersonId, setCustomerPerson] = useState("");
  const [customerPersonDisplay, setCustomerPersonDisplay] = useState("");
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id);
        const productData = response.data;
        setCustomerPerson(productData.customerPersonId);
        setCustomerPersonDisplay(productData.customerPersonDisplay);
        setCustomerName(productData.customerName);
        setData(productData.products);
        setLoading(true);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

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
        const response = await fetchProductList({ Name: newValue });
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao obter a lista de produtos:", error);
      }
    }
  };

  const handleRowUpdate = (newData, oldData) => {
    const updatedData = [...data];
    const index = oldData.tableData.id;
    updatedData[index] = newData;
    setData(updatedData);
  };

  const handleAddRow = () => {
    if (selectedProduct && selectedProductQuantity) {
      setData([
        ...data,
        {
          productId: selectedProduct.id,
          name: `${selectedProduct.name} - ${selectedProduct.description}`,
          quantity: selectedProductQuantity,
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
      customerName: customerName,
      customerPersonId: customerPersonId,
      products: data.map((item) => ({
        productId: item.productId,
        quantity: parseInt(item.quantity),
      })),
    };
    await putOrderEdit(id, order).then(() => {
      navigate("/pedido");
    });
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
                {customerName && (
                  <Grid item xs={12}>
                    <TextField
                      id="customerName"
                      name="customerName"
                      fullWidth
                      label="Nome do cliente"
                      value={customerName}
                      variant="outlined"
                      disabled={true}
                      onChange={(e) => setCustomerName(e.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                )}
                {customerPersonId && (
                  <Grid item xs={12} sm={12}>
                    <CustomAutocomplete
                      id="customerPerson"
                      options={customers}
                      value={customerPersonDisplay}
                      disabled={true}
                      onChange={(event, newValue) =>
                        setCustomerPersonDisplay(newValue)
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
                    startIcon={<SaveOutlinedIcon />}
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
                        field: "productName", // Nome temporário para a nova coluna concatenada
                      },
                      { title: "Quantidade", field: "quantity" },
                    ]}
                    data={data.map((item) => ({
                      ...item,
                      productName: item.description
                        ? `${item.name} - ${item.description}`
                        : item.name, // Verifica se há descrição antes de concatenar
                    }))}
                    title="Produtos"
                    variant="outlined"
                    options={{
                      actionsColumnIndex: -1,
                      search: false,
                      paging: false,
                      toolbar: false,
                    }}
                    editable={{
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          handleRowUpdate(newData, oldData);
                          resolve();
                        }),
                      onRowDelete: (rowData) =>
                        new Promise((resolve, reject) => {
                          handleDeleteRow(rowData);
                          resolve();
                        }),
                    }}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <Button
              variant="contained"
              className="buttonSave-tabpanel"
              type="submit"
              startIcon={<SaveOutlinedIcon />}
            >
              Salvar Pedido
            </Button>
          </form>
        </Box>
      </ContentContainer>
    </>
  );
};

export default OrderEdit;
