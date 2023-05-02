import React from 'react';
import { useModal } from 'contexts/modal';
import { Modal, Box } from '@material-ui/core';

const ModalRenderer = () => {
	const { modalContent, setModalContent } = useModal();

	return <Modal
		open={modalContent != null}
		onClick={()=> setModalContent(null)}
	>
		<div className='modal' onClick={()=> setModalContent()}>
			<div className='container'>
				<button className='close' onClick={() => { setModalContent(null); }} />
				<div className='content'>{modalContent}</div>
			</div>
		</div>
	</Modal>;
};
export default ModalRenderer;
