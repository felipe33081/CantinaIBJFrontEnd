import "./App.css";
import "./styles/AuthStyle.css";
import "./assets/css/style.css";
import React from "react";
import MainDash from "./components/MainDash/MainDash";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import {
  Authenticator,
  translations,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { Amplify, I18n } from "aws-amplify";
import awsExports from "./aws-exports";
import CustomerList from "./pages/Customer/List/CustomerList";
import ProductList from "./pages/Product/List/ProductList";
import ProductCreate from "./pages/Product/CreateEdit/ProductCreate";
import ProductEdit from "./pages/Product/CreateEdit/ProductEdit";
import UserList from "./pages/User/List/UserList";
import OrderList from "./pages/Order/List/OrderList";
import OrderCreate from "./pages/Order/CreateEdit/OrderCreate";
import OrderEdit from "./pages/Order/CreateEdit/OrderEdit";
import CustomerCreate from "./pages/Customer/CreateEdit/CustomerCreate";
import CustomerEdit from "./pages/Customer/CreateEdit/CustomerEdit";
import UserCreate from "./pages/User/CreateEdit/UserCreate";
import UserEdit from "./pages/User/CreateEdit/UserEdit";
I18n.putVocabularies(translations);
I18n.setLanguage("pt-BR");
Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <Authenticator className="bodyAuth">
        <div className="AppGlass">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainDash />} />
            <Route path="/pedido" element={<OrderList />} />
            <Route path="/pedido/novo" element={<OrderCreate />} />
            <Route path="/pedido/editar" element={<OrderEdit />} />
            <Route path="/cliente" element={<CustomerList />} />
            <Route path="/cliente/novo" element={<CustomerCreate />} />
            <Route
              exact
              path="/cliente/editar/:id"
              element={<CustomerEdit />}
            />
            <Route path="/produto" element={<ProductList />} />
            <Route path="/produto/novo" element={<ProductCreate />} />
            <Route exact path="/produto/editar/:id" element={<ProductEdit />} />
            <Route path="/usuario" element={<UserList />} />
            <Route path="/usuario/novo" element={<UserCreate />} />
            <Route exact path="/usuario/editar/:id" element={<UserEdit />} />
          </Routes>
        </div>
      </Authenticator>
    </div>
  );
}

export default App;
