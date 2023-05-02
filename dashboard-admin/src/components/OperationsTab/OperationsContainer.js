import { Box, MenuItem } from '@material-ui/core';
import React, { useMemo, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';
import { Select } from '@material-ui/core';
import * as uploadService from 'services/files';
import { getCreditNoteList } from 'services/creditNote';
import { useLoading } from 'contexts/loading';

export function OperationsContainer(props) {

	const { loading, addLoader, completeLoader } = useLoading();
	const [ ops, setOps ]= useState([]);
	const { personId } = props;
	const [ error, setError ] = useState(null);
	const [ rowsPerPage, setRowsPerPage ] = useState(localStorage.getItem('rowsPerPage')|| 5);
	const [ page, setPage ] = useState(0);
	const [ search, setSearch ] = useState('');

	useEffect(() => {
		try{			
			fetchData();	
			setError(null);		
		} catch (err) {
			setError(err);
		}		
	}, []);

	useEffect(()=>{
		fetchData();

	},[page, rowsPerPage, search]);
  
  
	const onRowsPerPageChange = (page) =>{
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};


	const fetchData = () => {
		addLoader("fetchData");
		getCreditNoteList({personId, page, rowsPerPage, searchString:search}).then(response => {
			if (response) setOps(response);
			completeLoader("fetchData");
		}).catch(err => completeLoader("fetchData"));
	};

	return React.cloneElement(props.children, {
		data: ops, error: error,
		rowsPerPage, setRowsPerPage,
		page, setPage,
		search, setSearch,
		onRowsPerPageChange
	});
}
