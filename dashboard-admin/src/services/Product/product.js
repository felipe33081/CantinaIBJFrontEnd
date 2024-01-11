import { getToken } from '../../repository/AuthAmplify';
import { pickBy } from 'lodash';
import axios from 'axios';
import Toast from '../../components/Toasts/Toasts';
import { Environment } from '../../Environments/Index';

export const getProductList = async ( filters) => {
    filters.orderBy = filters?.orderByField != undefined ? filters?.orderByField + "_" + filters?.orderByDirection.toUpperCase() : undefined;
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    let token = await getToken();
    let url = Environment.BASE_URL + "/Product";

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
			Toast.showErrorMessage("Não foi possível obter a lista de produtos");
		}
		throw err;
    }
}

export const fetchProductList = async ( filters) => {
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    let token = await getToken();
    let url = Environment.BASE_URL + "/Product";

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
			Toast.showErrorMessage("Não foi possível obter a lista de produtos");
		}
		throw err;
    }
}

export const getProductById = async (id) => {
    
    let token = await getToken();
    let url = Environment.BASE_URL + `/Product/${id}`;
    
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
			Toast.showErrorMessage("Não foi possível excluir o produto");
		}
		throw err;
	}
}

export const postProductCreate = async ( data ) => {
    let token = await getToken();
    let url = Environment.BASE_URL + "/Product";

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.post(url, data, config);
        Toast.showSuccessMessage("Produto adicionado com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível cadastrar o produto");
		}
		throw err;
	}
} 

export const putProductEdit = async ( id, data ) => {
    
    let token = await getToken();
    let url = Environment.BASE_URL + `/Product/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.put(url, data, config);
        Toast.showSuccessMessage("Produto atualizado com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível atualizar um produto");
		}
		throw err;
	}
}

export const deleteProductById = async ( id ) => {
    
    let token = await getToken();
    let url = Environment.BASE_URL + `/Product/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.delete(url, config);
        Toast.showSuccessMessage("Produto excluído com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível excluir um produto");
		}
		throw err;
	}
}