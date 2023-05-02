import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText, IconButton, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { useUser } from "contexts/user";
import * as cognitoRepository from "repository/cognito";
import getSidebarMenuItems from "./items";
import mainLogo from "./Logo.png";
import OpenSubMenuButton from "./OpenSubMenuButton";
import HideSubMenuButton from "../HideSubMenuButton/HideSubMenuButton";
import {
	LogoutIcon,
	ShowMenuIcon,
	ShortLineIcon,
	LongLineIcon,
} from "../../assets";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: "none",
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			backgroundColor: "#5F5F5F",
			borderTopRightRadius: "24px",
			borderBottomRightRadius: "24px",
			['@media print']: {
				display: 'none',
			}
		},
		drawerClose: {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: "hidden",
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9) + 1,
			},
			backgroundColor: "#5F5F5F",
			borderTopRightRadius: "24px",
			borderBottomRightRadius: "24px",
			['@media print']: {
				display: 'none',

			}
		},
		toolbar: {
			display: "flex",
			top: 0,
			left: 8,
			alignItems: "center",
			justifyContent: "flex-end",
			padding: theme.spacing(0, 1),
			backgroundColor: "#5F5F5F",
			...theme.mixins.toolbar,
		},
		downToolbarButton: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			paddingTop: "50px",
			backgroundColor: "#5F5F5F",
			color: "white",
			...theme.mixins.toolbar,
		},
		downToolbarOpenMenuButton: {
			position: "fixed",
			bottom: 0,
			left: 8,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "#5F5F5F",
			color: "white",
			...theme.mixins.toolbar,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			fontSize: "28px",
		},
		linkItem: {
			color: "white",
		},
		activeLinkItem: {
			color: "orange",
		},
		drawerPaper: {
			width: drawerWidth,
		},
		navbarList: {
			paddingTop: 0,
		},
	})
);

const SideMenu = ({ handleDrawerToggle, mobileOpen }) => {

	const { user } = useUser();
	const history = useHistory();
	const classes = useStyles();
	const theme = useTheme();

	const signOut = () => {
		localStorage.clear();
		// window.Intercom('shutdown');
		cognitoRepository.signOut();
		history.push("/login/0");
	};

	const [visible, setVisible] = useState(false);
	const [currentLabel, setLabel] = useState(null);
	const [activeLink, setActiveLink] = useState(0);

	const showSubMenuButtons = (index) => {
		makeActive(index);
		setVisible(!visible);
		setLabel((state) => {
			if (state === index) {
				setVisible(false);
				return null;
			} else {
				setVisible(true);
				return index;
			}
		});
	};
	const hideSubMenuButtons = (index) => {
		setVisible(!visible);
		setLabel((state) => {
			if (state === index) {
				setVisible(false);
				return null;
			} else {
				setVisible(true);
				return index;
			}
		});
	};
	const showSubMenuButtonsAndShowSubMenu = (index) => {
		handleDrawerToggle();
		setVisible(!visible);
		setLabel((state) => {
			if (state === index) {
				setVisible(false);
				return null;
			} else {
				setVisible(true);
				return index;
			}
		});
	};

	const makeActive = (index) => {
		setActiveLink((state) => {
			if (state === index) {
				return index;
			} else {
				return index;
			}
		});
	};

	const drawer = () => {
		const menu = getSidebarMenuItems(user);
		const links = menu.map((item, index) => {
			if (item.children.length > 0) {
				return (
					<div key={index} style={{ color: "white" }}>
						{mobileOpen ? (
							<ListItem
								key={index}
								button
								onClick={() => showSubMenuButtons(index)}
							>
								<ListItemIcon>{item.iconClass}</ListItemIcon>
								<ListItemText primary={item.label} />
								{visible && currentLabel === index ? (
									<HideSubMenuButton
										handler={() => hideSubMenuButtons(index)}
									/>
								) : (
									<OpenSubMenuButton
										handler={() => showSubMenuButtons(index)}
									/>
								)}
							</ListItem>
						) : (
							<ListItem
								key={index}
								button
								onClick={() => showSubMenuButtonsAndShowSubMenu(index)}
							>
								<ListItemIcon>{item.iconClass}</ListItemIcon>
								<ListItemText primary={item.label} />
								{visible && currentLabel === index ? (
									<HideSubMenuButton
										handler={() => hideSubMenuButtons(index)}
									/>
								) : (
									<OpenSubMenuButton
										handler={() => showSubMenuButtons(index)}
									/>
								)}
							</ListItem>
						)}
						{visible && currentLabel === index
							? item.children.map((childrenItem, childrenIndex) => {
								const newChildrenIndex = childrenIndex + 10;
								return (
									<NavLink
										to={childrenItem.path}
										className={classes.linkItem}
										key={newChildrenIndex}
										style={{ color: "white", textDecoration: "inherit" }}
										onClick={() => makeActive(newChildrenIndex)}
									>
										{mobileOpen ? (
											activeLink === newChildrenIndex ? (
												<div className="active-wide-menu-item-area active-wide-menu-item-area-sub-menu-item">
													<ListItem key={`${index}_${childrenIndex}`} button>
														<ListItemIcon style={{ paddingLeft: "30px" }}>
															{childrenItem.iconClass}
														</ListItemIcon>
														<ListItemText
															primary={childrenItem.label}
															style={{ paddingLeft: "25px" }}
														/>
													</ListItem>
												</div>
											) : (
												<ListItem key={`${index}_${childrenIndex}`} button>
													<ListItemIcon style={{ paddingLeft: "30px" }}>
														{childrenItem.iconClass}
													</ListItemIcon>
													<ListItemText
														primary={childrenItem.label}
														style={{ paddingLeft: "25px" }}
													/>
												</ListItem>
											)
										) : activeLink === newChildrenIndex ? (
											<div className="active-hide-menu-item-area">
												<ListItem
													key={`${index}_${childrenIndex}`}
													button
													onClick={handleDrawerToggle}
												>
													<ListItemIcon style={{ paddingLeft: "0px" }}>
														{childrenItem.iconClass}
													</ListItemIcon>
													<ListItemText
														primary={childrenItem.label}
														style={{ paddingLeft: "25px" }}
													/>
												</ListItem>
											</div>
										) : (
											<ListItem
												key={`${index}_${childrenIndex}`}
												button
												onClick={handleDrawerToggle}
											>
												<ListItemIcon style={{ paddingLeft: "0px" }}>
													{childrenItem.iconClass}
												</ListItemIcon>
												<ListItemText
													primary={childrenItem.label}
													style={{ paddingLeft: "25px" }}
												/>
											</ListItem>
										)}
									</NavLink>
								);
							})
							: null}
					</div>
				);
			} else {
				return (
					<NavLink
						to={item.path}
						exact={true}
						key={index}
						style={{ color: "white", textDecoration: "inherit" }}
						onClick={() => makeActive(index)}
					>
						{mobileOpen ? (
							activeLink === index ? (
								<div key={index} className="active-wide-menu-item-area">
									<ListItem button>
										<ListItemIcon>{item.iconClass}</ListItemIcon>
										<ListItemText primary={item.label} />
									</ListItem>
								</div>
							) : (
								<ListItem key={index} button>
									<ListItemIcon>{item.iconClass}</ListItemIcon>
									<ListItemText primary={item.label} />
								</ListItem>
							)
						) : activeLink === index ? (
							<div key={index} className="active-hide-menu-item-area">
								<ListItem button>
									<ListItemIcon>{item.iconClass}</ListItemIcon>
									<ListItemText primary={item.label} />
								</ListItem>
							</div>
						) : (
							<ListItem key={index} button>
								<ListItemIcon>{item.iconClass}</ListItemIcon>
								<ListItemText primary={item.label} />
							</ListItem>
						)}
					</NavLink>
				);
			}
		});
		return (
			<div key="main">
				{!mobileOpen ? (
					<div className={classes.toolbar}>
						<Button onClick={handleDrawerToggle}>
							<img
								src={window.__RUNTIME_CONFIG__.REACT_APP_INVERTED_LOGO}
								alt="logo"
								width="50"
								height="40"
								style={{
									paddingTop: '20px',
									paddingBottom: '25px',
								}}

							/>
						</Button>
					</div>
				) : (
					<div className={classes.toolbar}>
						<div style={{
							paddingTop: '20px',
							paddingBottom: '35px',
						}}>
							<img
								src={window.__RUNTIME_CONFIG__.REACT_APP_INVERTED_LOGO}
								alt="logo"
								style={{
									padding: '0 2px',
									margin: '0.1em 2',
									display: 'flex',
									textAlign: 'center'
								}}
							/>
						</div>
					</div>
				)}
				<List className={classes.navbarList}>{links}</List>
				{!mobileOpen ? (
					<div style={{ paddingLeft: "15px", paddingTop: "1px" }}>
						<ShortLineIcon className="short-line" />
					</div>
				) : (
					<div style={{ paddingLeft: "15px", paddingTop: "1px" }}>
						<LongLineIcon className="long-line" />
					</div>
				)}
				<List>
					<br />
					{["Sair"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon onClick={signOut}>
								<LogoutIcon className="logout" />
							</ListItemIcon>
							<ListItemText
								primary={text}
								style={{ color: "white" }}
								onClick={signOut}
							/>
						</ListItem>
					))}
				</List>
				{mobileOpen ? (
					<Button
						variant="outlined"
						onClick={handleDrawerToggle}
						style={{
							color: "white",
							position: "fixed",
							left: "50px",
							bottom: "30px",
							borderRadius: "48px",
						}}
					>
						Ocultar menu
					</Button>
				) : (
					<div className={classes.downToolbarOpenMenuButton}>
						<IconButton onClick={handleDrawerToggle}>
							<ShowMenuIcon className="showMenu" />
						</IconButton>
					</div>
				)}
			</div>
		);
	};

	return (
		<Drawer
			variant="permanent"
			anchor={theme.direction === "rtl" ? "right" : "left"}
			open={mobileOpen}
			onClose={handleDrawerToggle}
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: mobileOpen,
				[classes.drawerClose]: !mobileOpen,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: mobileOpen,
					[classes.drawerClose]: !mobileOpen,
				}),
			}}
			ModalProps={{
				keepMounted: true, // better open performance on mobile.
			}}
		>
			{drawer()}
		</Drawer>
	);
};

SideMenu.toggleMenuVisibility = () => {
	const menuContainer = document.querySelector("#menu-container");
	menuContainer.classList.toggle("uk-visible@m");
};

SideMenu.propTypes = {};

export default SideMenu;
