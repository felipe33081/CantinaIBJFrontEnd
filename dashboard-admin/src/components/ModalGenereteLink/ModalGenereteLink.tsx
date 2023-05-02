import { Typography } from '@material-ui/core';
import Button from 'components/Button/Button';

interface ModalGenereteLinkProps {
	link: string; 
	onClose: () => void;
}

const ModalGenereteLink = ({link, onClose}: ModalGenereteLinkProps) => {
  	return (
		<>
			<Typography variant='caption'>{link}</Typography>
			<Button variant='outlined' onClick={onClose} style={{marginTop: '30px'}}>Fechar</Button>
		</>
  	);
};

export default ModalGenereteLink;