import { getToken } from '../../repository/AuthAmplify';
import { pickBy } from 'lodash';
import axios from 'axios';
import Toast from '../../components/Toasts/Toasts';

export const getOrderList = async ( filters) => {
    filters.orderBy = filters?.orderByField != undefined ? filters?.orderByField + "_" + filters?.orderByDirection.toUpperCase() : undefined;
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    let token = await getToken();
    let url = "https://web-cantina-ibj.azurewebsites.net/v1" + "/Order";

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params
    }
    try{
        let result = await axios.get(url, config);
        return result.data;
    }
    catch (err){
        if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível obter a lista de pedidos");
		}
		throw err;
    }
}

export const postOrderCreate = async ( data ) => {
    
    let token = await getToken();
    let url = "https://web-cantina-ibj.azurewebsites.net/v1" + "/Order";

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.post(url, data, config);
        Toast.showSuccessMessage("Pedido adicionado com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível cadastrar um pedido");
		}
		throw err;
	}
}

export const getOrderById = async ( id ) => {
    
    let token = await getToken();
    let url = "https://web-cantina-ibj.azurewebsites.net/v1" + `/Order/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.get(url, config);
        return result;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível obter os dados do cliente");
		}
		throw err;
	}
}

export const putOrderEdit = async ( id, data ) => {
    
    let token = await getToken();
    let url = "https://web-cantina-ibj.azurewebsites.net/v1" + `/Order/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.put(url, data, config);
        Toast.showSuccessMessage("Pedido atualizado com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível atualizar o pedido");
		}
		throw err;
	}
}

export const deleteOrderById = async ( id ) => {
    
    let token = await getToken();
    let url = "https://web-cantina-ibj.azurewebsites.net/v1" + `/Order/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.delete(url, config);
        Toast.showSuccessMessage("Pedido excluído com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível excluir o pedido");
		}
		throw err;
	}
}