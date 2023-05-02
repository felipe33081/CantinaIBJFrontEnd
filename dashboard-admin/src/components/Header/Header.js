import * as React from "react";
import { Link } from "react-router-dom";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Grid,
	TextField,
} from "@material-ui/core";
import { useUser } from "contexts/user";
import md5 from "crypto-js/md5";
import { useHeader } from "contexts/header";
import { useTenant } from "contexts/tenant";
import Autocomplete from "@material-ui/lab/Autocomplete";
import debounce from "random/debounce";

const AutoCompleteTenant = ({
	id,
	options,
	onChange,
	fetch,
	params,
	defaultValue,
}) => {
	const [searchField, setSearchField] = React.useState(undefined);
	const { page, size } = params;

	const verify = React.useCallback(
		debounce((name) => {
			fetch(page, size, name);
		}, 500),
		[]
	);

	React.useEffect(() => {
		fetch(page, size);
	}, []);

	React.useEffect(() => {
		verify(searchField);
	}, [searchField]);

	return (
		<>
			<Autocomplete
				noOptionsText={"Nenhum registro foi encontrado."}
				options={options}
				id={id}
				fullWidth
				defaultValue={defaultValue}
				getOptionSelected={(props) => {
					return props.id;
				}}
				getOptionLabel={(option) => {
					return option.name ?? "";
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						InputProps={{
							...params.InputProps,
							disableUnderline: true,
							style: {
								backgroundColor: "#f5f5f5",
								borderRadius: 10,
								height: 48,
								padding: 10,
								borderBottom: 0,
							},
							onChange: (event) => {
								setSearchField(event?.currentTarget?.value);
							},
						}}
						shrink
					/>
				)}
				disablePortal={true}
				onChange={onChange}
			/>
		</>
	);
};

function Header({ mobileOpen }) {
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [hasTenants, setHasTenants] = React.useState(false);
	const { user } = useUser();
	const { title } = useHeader();
	const {
		tenantList,
		getTenantList,
		setSelectedTenant
	} = useTenant();

	React.useEffect(() => {
		if (tenantList?.length > 0 ) {
			setHasTenants(true);
		}
	}, [tenantList]);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const isSeletorTenant =
		!!+window.__RUNTIME_CONFIG__.REACT_APP_SELETOR_TENANTS;
	const useScan3 = !!+window.__RUNTIME_CONFIG__.REACT_APP_USE_SCAN3;
	return (
		<Box mb={1} sx={{ flexGrow: 1 }}>
			<img
				src={window.__RUNTIME_CONFIG__.REACT_APP_MAIN_LOGO}
				alt=""
				className="enablePrint wt-register-logo"
			/>
			<AppBar position="static" color="inherit" elevation={0}>
				<Toolbar>
					<Box sx={{ flexGrow: 0 }} />
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ display: { xs: "none", sm: "block" } }}
						style={{ fontSize: 18, paddingLeft: mobileOpen ? 245 : 85 }}
					>
						<div className="printHeader">{title}</div>
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					{hasTenants && isSeletorTenant && !useScan3 && (
						<>
							<Typography
								variant="h6"
								noWrap
								component="span"
								className="disablePrint"
								sx={{ display: { xs: "none", sm: "block" } }}
								style={{ fontSize: 18, paddingLeft: mobileOpen ? 245 : 85 }}
							>
								Correspondente:
							</Typography>
							<Grid
								item
								xs={1}
								className="disablePrint"
								style={{ padding: "10px" }}
							>
								<AutoCompleteTenant
									id="tenant"
									params={{
										page: 0,
										size: 10,
									}}
									fetch={getTenantList}
									options={tenantList}
									onChange={(_, options) => {
										setSelectedTenant(options);
									}}
								/>
							</Grid>
						</>
					)}
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<Typography className="wt-content-profile uk-flex uk-flex-middle">
							{user?.payload && user?.payload?.name}
						</Typography>
						<Link
							to="/"
							className="uk-margin-left wt-user wt-user-small"
							style={{
								backgroundImage: `url('https://www.gravatar.com/avatar/${md5(
									user?.payload["cognito:username"] || "none"
								)}?d=robohash')`,
							}}
						></Link>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="medium"
							aria-label="show more"
							aria-controls="primary-search-account-menu-mobile"
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						></IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
export default Header;
