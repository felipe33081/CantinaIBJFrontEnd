import { useState } from 'react';
import ContentContainer from "containers/ContentContainer";
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Link } from "react-router-dom";
import { RoutesContainer } from 'assets/style';

const PageTabs = ({ tabs }) => {
	const [tab, setTab] = useState(window.location.pathname);

	return (
		<>
			<AppBar position="relative" color="transparent" elevation={0}>
				<Tabs
					centered={false}
					value={tab}
					indicatorColor="primary"
					textColor="primary"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example"
				>
					{tabs.map((rota, index) => (
						rota.show &&
						<ContentContainer key={index}>
							<RoutesContainer>
								<Link to={rota.to} style={{ color: "#666666" }}>
									<Tab key={index} label={rota.name} />
								</Link>
							</RoutesContainer>
						</ContentContainer>
					))}
				</Tabs>
			</AppBar>
		</>
	);
};

export default PageTabs;
