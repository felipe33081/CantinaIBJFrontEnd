import { Box, TablePagination } from '@material-ui/core';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';
import { useHistory } from 'react-router-dom';
import Helper from 'helpers/format.helpers';

export function OperationsTab(props) {

	const history = useHistory();
	const { data, setPage, setSearch, rowsPerPage, page, onRowsPerPageChange } = props;

	const table = <MaterialTable
		title="Operações"
		columns={[
			{
				title: 'Tomador',
				field: 'personDisplay',
				cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 250 }
			},
			{
				title: 'Valor do Principal',
				field: 'amortization.principalAmountInCents',
				render: (props) => (Helper.formatCurrency(props?.amortization?.principalAmountInCents))
			},
			{
				title: 'Status',
				field: 'statusDisplay',
				draggable: false
			},
			{
				title: 'Criado em',
				render: ({ createdAt }) => createdAt && new Date(createdAt).toLocaleDateString('pt-BR') + " " + new Date(createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
			},
			{
				title: 'Taxa (%)',
				field: 'apr',
				filtering: false, render: (props) => (Helper.percentFormat(props.amortization.apr * 100))
			},

		]}
		actions={[
			{
				icon: 'search',
				tooltip: 'Abrir operação',
				onClick: (event, rowData) => history.push(`/ccb/editar?id=${rowData.id}`)
			}
		]}

		onRowsPerPageChange={onRowsPerPageChange}
		onSearchChange={setSearch}
		components={{
			Pagination: props => (
				<TablePagination
					{...props}
					onPageChange={(e, page) => {
						setPage(page);
					}}
					rowsPerPageOptions={[5, 10, 20, 50]}
					count={data.totalItems}
					page={page}
				/>
			),
		}}
		options={{
			actionsColumnIndex: -1,
			pageSize: rowsPerPage,
		}}
		data={data.data}
		localization={localizationOptions}

	/>;

	return (
		<>
			<Box p={1}>
				{table}
			</Box>
		</>
	);
}
