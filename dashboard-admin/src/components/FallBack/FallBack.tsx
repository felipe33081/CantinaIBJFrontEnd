import { Alert } from '@material-ui/lab';

export const FallBackComponent = (props: any) => { 
	
	return (
		<Alert severity="warning" >Ocorreu um erro inesperado ao obter os dados. Tente novamente mais tarde.</Alert>
	);
};