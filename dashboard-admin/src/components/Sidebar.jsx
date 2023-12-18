import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Logo from "../imgs/LOGO_IBJ1.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Button } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState(
    localStorage.getItem("selectedPage") || 0
  );
  const [expanded, setExpaned] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768 && !expanded) {
        setExpaned(true);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [expanded]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("selectedPage", selected);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selected]);

  useEffect(() => {
    const savedSelected = localStorage.getItem("selectedPage");
    if (savedSelected !== null) {
      setSelected(parseInt(savedSelected));
    }
  }, []);

  const handleItemClick = (index) => {
    setSelected(index);
    switch (index) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/customerPerson");
        break;
      default:
        break;
    }
  };

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      localStorage.clear(); // limpa o localStorage
      navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            // Adicione o componente Link para o item "Customer"
            if (item.heading === "Dashboard") {
              return (
                <Link
                  to="/" // Adicione a rota aqui
                  className={
                    selected === index ? "menuItem active" : "menuItem"
                  }
                  key={index}
                  onClick={() => handleItemClick(index)}
                >
                  <item.icon />
                  <span>{item.heading}</span>
                </Link>
              );
            } else if (item.heading === "Pedidos") {
              return (
                <Link
                  to="/pedido" // Adicione a rota aqui
                  className={
                    selected === index ? "menuItem active" : "menuItem"
                  }
                  key={index}
                  onClick={() => handleItemClick(index)}
                >
                  <item.icon />
                  <span>{item.heading}</span>
                </Link>
              );
            } else if (item.heading === "Clientes") {
              return (
                <Link
                  to="/cliente" // Adicione a rota aqui
                  className={
                    selected === index ? "menuItem active" : "menuItem"
                  }
                  key={index}
                  onClick={() => handleItemClick(index)}
                >
                  <item.icon />
                  <span>{item.heading}</span>
                </Link>
              );
            } else if (item.heading === "Produtos") {
              return (
                <Link
                  to="/produto" // Adicione a rota aqui
                  className={
                    selected === index ? "menuItem active" : "menuItem"
                  }
                  key={index}
                  onClick={() => handleItemClick(index)}
                >
                  <item.icon />
                  <span>{item.heading}</span>
                </Link>
              );
            } else if (item.heading === "Usuários") {
              return (
                <Link
                  to="/usuario" // Adicione a rota aqui
                  className={
                    selected === index ? "menuItem active" : "menuItem"
                  }
                  key={index}
                  onClick={() => handleItemClick(index)}
                >
                  <item.icon />
                  <span>{item.heading}</span>
                </Link>
              );
            }
          })}
          {/* signoutIcon */}
          <div className="buttonLogout">
            <Button className="buttonColor" onClick={handleLogout} fullWidth>
              <UilSignOutAlt />
              Sair
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
