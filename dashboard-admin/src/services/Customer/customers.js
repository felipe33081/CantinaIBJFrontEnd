import { getToken } from '../../repository/AuthAmplify';
import { pickBy } from 'lodash';
import axios from 'axios';
import Toast from '../../components/Toasts/Toasts';
import { Environment } from '../../Environments/Index';

export const getCustomerList = async ( filters) => {
    filters.orderBy = filters?.orderByField != undefined ? filters?.orderByField + "_" + filters?.orderByDirection.toUpperCase() : undefined;
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    let token = await getToken();
    let url = Environment.BASE_URL + "/CustomerPerson";

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params
    }
    try{
        let result = await axios.get(url, config);
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível obter a lista de clientes");
		}
		throw err;
	}
}

export const fetchCustomerList = async ( filters) => {
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    let token = await getToken();
    let url = Environment.BASE_URL + "/CustomerPerson";

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params
    }
    try{
        let result = await axios.get(url, config);
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível obter a lista de clientes");
		}
		throw err;
	}
}

export const getCustomerById = async ( id ) => {
    
    let token = await getToken();
    let url = Environment.BASE_URL + `/CustomerPerson/${id}`;

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

export const postCustomerCreate = async ( data ) => {
    
    let token = await getToken();
    let url = Environment.BASE_URL + "/CustomerPerson";

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.post(url, data, config);
        Toast.showSuccessMessage("Cliente adicionado com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível cadastrar um cliente");
		}
		throw err;
	}
}

export const putCustomerEdit = async ( id, data ) => {
    
    let token = await getToken();
    let url = Environment.BASE_URL + `/CustomerPerson/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.put(url, data, config);
        Toast.showSuccessMessage("Cliente atualizado com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível atualizar um cliente");
		}
		throw err;
	}
}

export const putResetAccountCustomer = async ( id, data ) => {
    
    let token = await getToken();
    let url = Environment.BASE_URL + `/CustomerPerson/${id}/resetAccount`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.put(url, data, config);
        Toast.showSuccessMessage("Cliente atualizado com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível atualizar um cliente");
		}
		throw err;
	}
}

export const deleteCustomerById = async ( id ) => {
    
    let token = await getToken();
    let url = Environment.BASE_URL + `/CustomerPerson/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.delete(url, config);
        Toast.showSuccessMessage("Cliente excluído com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível excluir um cliente");
		}
		throw err;
	}
}