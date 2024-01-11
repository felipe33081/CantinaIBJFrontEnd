import { getToken } from '../../repository/AuthAmplify';
import { pickBy } from 'lodash';
import axios from 'axios';
import Toast from '../../components/Toasts/Toasts';
import { Environment } from '../../Environments/Index';

export const getDashboardData = async ( params ) => {
    
    let token = await getToken();
    let url = Environment.BASE_URL + "/Dashboard/Metrics";

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
			Toast.showErrorMessage("Não foi possível obter os dados do dashboard");
		}
		throw err;
    }
}