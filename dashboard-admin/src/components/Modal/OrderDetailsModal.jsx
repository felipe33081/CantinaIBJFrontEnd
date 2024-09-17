import React from "react";
import { Typography } from '@material-ui/core';
import Helper from "../../helpers/format.helpers";
import ModalCustomerComponent from './ModalCustomerComponent';

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

const makeStylePaymentValue = () => {
    return {
        color: "red",
    };
};

const makeStyleChangeValue = () => {
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

const OrderDetailsModal = ({ open, onClose, selectedRows }) => {
    return (
        <>
            <ModalCustomerComponent
                open={open}
                onClose={onClose}
                title="Detalhes do Pedido"
                buttonText="Fechar"
                onClick={onClose}
            >
                {/* Detalhes do cliente */}
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Pedido #{selectedRows.id}</span>
                </Typography>
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Status:</span> <span style={makeStyleStatus(selectedRows.statusDisplay)}>{selectedRows.statusDisplay}</span>
                </Typography>
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Valor Total: <span style={makeStyle(selectedRows.totalValue)}>{Helper.formatCurrencyAsIs(selectedRows.totalValue)}</span></span>
                </Typography>
                {selectedRows.paymentOfType !== null && (
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Forma de Pagamento: </span><span style={makeStyleTypePayment(selectedRows.paymentOfTypeDisplay)}>{selectedRows.paymentOfTypeDisplay}</span>
                    </Typography>
                )}
                {selectedRows.paymentValue !== null && (
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Valor do Pagamento: </span> <span style={makeStylePaymentValue(selectedRows.paymentValue)}>{Helper.formatCurrencyAsIs(selectedRows.paymentValue)}</span>
                    </Typography>
                )}
                {selectedRows.changeValue !== null && (
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Valor do Troco: </span> <span style={makeStyleChangeValue(selectedRows.changeValue)}>{Helper.formatCurrencyAsIs(selectedRows.changeValue)}</span>
                    </Typography>
                )}
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>Produtos:</span>
                </Typography>
                <ul>
                    {selectedRows?.products?.length > 0 ? (
                        selectedRows.products.map(product => (
                            <li key={product.productId} style={{ fontFamily: 'Arial', fontSize: '17.5px' }}>
                                {product.name} - {product.description} - {product.quantity} x {Helper.formatCurrencyAsIs(product.price)} =
                                <span style={makeStyle(selectedRows.totalValue)}>{Helper.formatCurrencyAsIs(product.quantity * product.price)}</span>
                            </li>
                        ))
                    ) : (
                        <Typography>Sem produtos</Typography>
                    )}
                </ul>
            </ModalCustomerComponent>
        </>
    );
};

export default OrderDetailsModal;