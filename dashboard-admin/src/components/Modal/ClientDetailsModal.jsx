import React, { useState } from "react";
import { Modal, Grid, Typography, Button } from '@material-ui/core';
import Helper from "../../helpers/format.helpers";
import ModalCustomerComponent from './ModalCustomerComponent';
import useStyles from './styles/style.modules';

const makeStyle = (balance) => {
    if (balance == 0) {
        return {
            color: "black",
        };
    }
    else if (balance < 0) {
        return {
            color: "red",
        };
    }
    else {
        return {
            color: "green",
        };
    }
};

const makeStylePaymentValue = (balance) => {
    return {
        color: "red",
    };
};

const makeStyleChangeValue = (balance) => {
    return {
        color: "green",
    };
};

const makeStyleStatus = (statusDisplay) => {
    if (statusDisplay === "Finalizado") {
        return {
            background: "rgb(145 254 159 / 47%)",
            color: "green",
        };
    } else if (statusDisplay === "Excluído") {
        return {
            background: "#ffadad8f",
            color: "red",
        };
    } else if (statusDisplay === "Em andamento") {
        return {
            background: "#59bfff",
            color: "white",
        };
    }
};

const makeStyleTypePayment = (statusDisplay) => {
    if (statusDisplay === "Fiado(em conta)") {
        return {
            background: "rgb(0 194 255 / 47%)",
            color: "blue",
        };
    }
};

const ClientDetailsModal = ({ open, onClose, selectedRows }) => {
    const classes = useStyles();
    const [openOrdersModal, setOpenOrdersModal] = useState(false);

    const handleOpenOrdersModal = () => {
        setOpenOrdersModal(true);
    };

    const handleCloseOrdersModal = () => {
        setOpenOrdersModal(false);
    };

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return ""; // Verifica se o número está vazio ou nulo
        // Suponha que o número de telefone tenha 10 dígitos
        const areaCode = phoneNumber.substring(0, 2);
        const firstPart = phoneNumber.substring(2, 7);
        const secondPart = phoneNumber.substring(7, 11);

        return `(${areaCode}) ${firstPart}-${secondPart}`;
    };

    return (
        <>
            <ModalCustomerComponent
                open={open}
                onClose={onClose}
                title="Detalhes do Cliente"
                buttonText="Fechar"
                onClick={onClose}
            >
                {/* Detalhes do cliente */}
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Id do Cliente:</span> {selectedRows?.id}
                </Typography>
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Nome:</span> {selectedRows?.name}
                </Typography>
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Telefone:</span> {formatPhoneNumber(selectedRows?.phone)}
                </Typography>
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Saldo:</span> <span style={makeStyle(selectedRows?.balance)}>{Helper.formatCurrencyAsIs(selectedRows?.balance)}</span>
                </Typography>

                {/* Botão para ver pedidos, aparece só se houver pedidos */}
                {selectedRows?.orders && selectedRows.orders.length > 0 && (
                    <Button className={classes.modalverpedidos} variant="contained" onClick={handleOpenOrdersModal}>
                        Ver Pedidos
                    </Button>
                )}
            </ModalCustomerComponent>

            {/* Modal de pedidos */}
            <ModalCustomerComponent
                open={openOrdersModal}
                onClose={handleCloseOrdersModal}
                title="Pedidos do Cliente"
                buttonText="Fechar"
                onClick={handleCloseOrdersModal}
            >
                {/* Detalhes dos pedidos */}
                {selectedRows?.orders?.filter(order => order.statusDisplay === "Finalizado").map(order => (
                    <div key={order.id}>
                        <Typography>
                            <span style={{ fontWeight: 'bold' }}>Pedido #{order.id}</span>
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: 'bold' }}>Status:</span> <span style={makeStyleStatus(order.statusDisplay)}>{order.statusDisplay}</span>
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: 'bold' }}>Valor Total: <span style={makeStyle(order.totalValue)}>{Helper.formatCurrencyAsIs(order.totalValue)}</span></span> 
                        </Typography>
                        {order.paymentOfType !== null && (
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>Forma de Pagamento: </span><span style={makeStyleTypePayment(order.paymentOfTypeDisplay)}>{order.paymentOfTypeDisplay}</span>
                            </Typography>
                        )}
                        {order.paymentValue !== null && (
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>Valor do Pagamento: </span> <span style={makeStylePaymentValue(order.paymentValue)}>{Helper.formatCurrencyAsIs(order.paymentValue)}</span>
                            </Typography>
                        )}
                        {order.changeValue !== null && (
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>Valor do Troco: </span> <span style={makeStyleChangeValue(order.changeValue)}>{Helper.formatCurrencyAsIs(order.changeValue)}</span>
                            </Typography>
                        )}
                        <Typography>
                            <span style={{ fontWeight: 'bold' }}>Produtos:</span>
                        </Typography>
                        <ul>
                            {order.products.map(product => (
                                <li key={product.productId} style={{ fontFamily: 'Arial', fontSize: '17.5px' }}>
                                    {product.name} - {product.description} - {product.quantity} x {Helper.formatCurrencyAsIs(product.price)} = 
                                    <span style={makeStyle(order.totalValue)}> {Helper.formatCurrencyAsIs(product.quantity * product.price)}</span>
                                </li>
                            ))}
                        </ul>
                        <hr className={classes.productItem} /> {/* Linha separadora entre pedidos */}
                    </div>
                ))}
            </ModalCustomerComponent>
        </>
    );
};

export default ClientDetailsModal;