import { getToken } from '../../repository/AuthAmplify';
import { pickBy } from 'lodash';
import axios from 'axios';

export const getUserList = async (props) => {
    const { size, page, email, name, paginationToken, selectedTenant } = props;
    let token = await getToken();
    var url = "http://localhost:8080/v1" + `/Users?size=${size}&page=${page}`;

    url = name ? url + `&filter=name^="${name}"` : url;
	url = email ? url + `&filter=email^="${email}"` : url;
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try{
        let result = await axios.get(url, config);
        return result.data;
    }
    catch (error){
        return error;
    }
}