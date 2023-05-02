import React, { ReactNode } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type AccordionProps = {
	accordions: {
		name: string;
		children?: ReactNode;
	}[];
	title: string;
};

function AccordionComponent({ accordions, title }: AccordionProps) {

	return (
		<>
			{title && <Typography variant="h6">{title}</Typography>}
			{accordions && accordions.map(accordion=>(
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>{accordion?.name}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Container>
							<Box>
								{accordion?.children}
							</Box>
						</Container>
					</AccordionDetails>
				</Accordion>
			))}
		</>
	);
}

export default AccordionComponent;