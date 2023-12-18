import { getToken } from '../../repository/AuthAmplify';
import { pickBy } from 'lodash';
import axios from 'axios';
import Toast from '../../components/Toasts/Toasts';

export const getUserList = async (props) => {
    const { size, page, email, name, paginationToken } = props;
    let token = await getToken();
    var url = "http://localhost:8080/v1" + `/Users?size=${size}&page=${page}`;

    url = name ? url + `&filter=name^="${name}"` : url;
	url = email ? url + `&filter=email^="${email}"` : url;
	url = paginationToken ? url + `&paginationToken=${paginationToken}` : url;
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try{
        let result = await axios.get(url, config);
        return result.data;
    }
    catch (error){
        Toast.showErrorMessage("Não foi possível obter a lista de usuários");
    }
}

export const getUserGroupsList = async ( id ) => {
    let token = await getToken();
    var url = "http://localhost:8080/v1" + `/Users/${id}/Groups?page=0&size=5`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try{
        let result = await axios.get(url, config);
        return result.data;
    }
    catch (error){
        Toast.showErrorMessage("Não foi possível obter a lista de usuários");
    }
}

export const getUserById = async ( id ) => {
    
    let token = await getToken();
    let url = "http://localhost:8080/v1" + `/Users/${id}`;

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
			Toast.showErrorMessage("Não foi possível obter os dados do usuário");
		}
		throw err;
	}
}

export const postUserCreate = async ( data ) => {
    
    let token = await getToken();
    let url = "http://localhost:8080/v1" + "/Users";

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.post(url, data, config);
        Toast.showSuccessMessage("Usuário adicionado com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível cadastrar um usuário");
		}
		throw err;
	}
}

export const putUserEdit = async ( id, data ) => {
    
    let token = await getToken();
    let url = "http://localhost:8080/v1" + `/Users/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.put(url, data, config);
        Toast.showSuccessMessage("Usuário atualizado com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível atualizar um usuário");
		}
		throw err;
	}
}

export const addUserGroupEdit = async ( id, data ) => {
    
    let token = await getToken();
    let url = "http://localhost:8080/v1" + `/Users/${id}/AddUserToGroup`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.put(url, data, config);
        Toast.showSuccessMessage("Grupo adicionado ao usuário com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível adicionar um grupo ao usuário");
		}
		throw err;
	}
}

export const removeUserGroupEdit = async ( id, data ) => {
    
    let token = await getToken();
    let url = "http://localhost:8080/v1" + `/Users/${id}/RemoveUserToGroup`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.put(url, data, config);
        Toast.showSuccessMessage("Grupo removido do usuário com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível remover grupo do usuário");
		}
		throw err;
	}
}

export const deleteUserById = async ( id ) => {
    
    let token = await getToken();
    let url = "http://localhost:8080/v1" + `/Users/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        let result = await axios.delete(url, config);
        Toast.showSuccessMessage("Usuário excluído com sucesso!");
        return result.data;
    }
    catch (err) {
		if (err?.response?.data?.errors) {
			Toast.showErrorMessage(err.response.data.errors);
		} else {
			Toast.showErrorMessage("Não foi possível excluir o usuário");
		}
		throw err;
	}
}