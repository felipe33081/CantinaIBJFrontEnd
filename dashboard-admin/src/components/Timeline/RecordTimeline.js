import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

function RecordTimeline({ data }) {

	const renderColorDot = (item) => {
		if (item.startedAt && item.finishedAt) {
			return "primary";
		} else if (item.startedAt) {
			return "secondary";
		} else {
			return "grey";
		}


	};

	return (
		<Box mt={5} style={{ paddingLeft: 20 }}>
			<Timeline>
				{data?.map(item =>
					<TimelineItem key={item?.index}>
						<TimelineOppositeContent style={{ flex: 0 }}>
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot color={renderColorDot(item)} />
							{data.length !== item.index + 1 && <TimelineConnector />}
						</TimelineSeparator>
						<TimelineContent>
							<Typography>{item?.name}</Typography>
							<Typography>{item?.description}</Typography>
							{item?.startedAt && 
								<small>
									Iniciado em {new Date(item.startedAt).toLocaleString('pt-BR')} - {item?.createdBy?.userIdDisplay ?? "Sistema"}
								</small>}
							{item?.finishedAt &&
								<>
									<br />
									<small>Finalizado em {new Date(item.finishedAt).toLocaleString('pt-BR')} - {item?.updatedBy?.userIdDisplay ?? "Sistema"}</small>
								</>
							}														
						</TimelineContent>
					</TimelineItem>
				)}
			</Timeline>
		</Box>
	);
}

export default RecordTimeline;