import { getToken } from '../../repository/AuthAmplify';
import { pickBy } from 'lodash';
import axios from 'axios';

export const getCustomerList = async ( filters) => {
    filters.orderBy = filters?.orderByField != undefined ? filters?.orderByField + "_" + filters?.orderByDirection.toUpperCase() : undefined;
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    let token = await getToken();
    let url = "https://web-cantina-ibj.azurewebsites.net/v1" + "/CustomerPerson";

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params
    }
    try{
        let result = await axios.get(url, config);
        return result.data;
    }
    catch (error){
        return error;
    }
}