import { useCallback, useEffect, useState } from 'react';
import * as personService from 'services/person';
import { Autocomplete } from '@material-ui/lab';
import debounce from 'random/debounce';
import { useTenant } from 'contexts/tenant';
import { TextField } from '@material-ui/core';
import Helper from 'helpers/format.helpers';

//@ts-ignore
export default function SearchPersonFields({ related, onRowDataChange, rowData }){

	//@ts-ignore
	const isRootTenancy = window.__RUNTIME_CONFIG__.REACT_APP_TENANT_TYPE == '0';
	const [searchField, setSearchField] = useState(undefined);
	const [options, setOptions] = useState([]);
	const { selectedTenant } = useTenant();

	const verify = useCallback(
		//@ts-ignore
		debounce(name => {
			fetchPersons(name);
		}, 500),
		[]
	);

	useEffect(() => {
		//@ts-ignore
		fetchPersons();
	}, []);

	useEffect(() => {
		verify(searchField);
	}, [searchField]);

	//@ts-ignore
	const fetchPersons = (name) => {
		//@ts-ignore
		personService.getPersonsList({ page: 0, size: 10, searchString: name }, selectedTenant).then(resp => {
			//@ts-ignore
			setOptions(resp?.data.map(n => {
				return { name: isRootTenancy ? `${n.name || "Não informado"} (${n.tenantDisplay}) - (${Helper.formatDocumentNumber(n.registrationNumber)})` : n.name, value: n.id };
			}));
		});
	};

	return (
        
		<Autocomplete
			fullWidth
			noOptionsText={'Nenhum registro foi encontrado.'}
			defaultValue={related ? { value: rowData.relatedToId, name: rowData.relatedToIdDisplay } : { value: rowData.personId, name: rowData.personIdDisplay }}
			options={options}
			getOptionLabel={(option) => option.name}
			filterOptions={(options, _) => options}
			//@ts-ignore
			renderInput={(params) => <TextField {...params} onChange={(event) => setSearchField(event?.target?.value)} shrink />}
			//@ts-ignore
			onFocus={() => setSearchField('')}
			//@ts-ignore
			onInputChange={(_, __, reason) => { if (reason === 'clear') setSearchField(''); }}
			onChange={(event, person) => {
				if (related) {
					onRowDataChange({
						...rowData,
						relatedToId: person?.value,
						relatedToIdDisplay: person?.name
					});
				}
				else {
					onRowDataChange({
						...rowData,
						personId: person?.value,
						personIdDisplay: person?.name
					});
				}
			}
			}

		/>);

};