import ViewListIcon from '@material-ui/icons/ViewList';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { FormatListBulleted } from '@material-ui/icons';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { DashboardIcon, BriefcaseIcon, PersonIcon, DolarIcon, OperatorsIcon, SettingsIcon, BankIcon, SaleIcon, ProductIcon, RegisterIcon, FundIcon, SecurityIcon, GroupsIcon, ProductAccountIcon } from '../../assets';
import { useMyPermissions } from 'contexts/permissions';
import BillIcon from "../../assets/icons/BillIcon";

export default (user) => {
	const { getMyPermissionLevel } = useMyPermissions();

	const hasUserPerm = !!getMyPermissionLevel("User", "read");
	const hasGroupPerm = !!getMyPermissionLevel("UserGroup", "read");
	const hasCreditPerm = !!getMyPermissionLevel("CreditNote", "read");
	const hasCreditProductPerm = !!getMyPermissionLevel("CreditProduct", "read");
	const hasFundPerm = !!getMyPermissionLevel("Fund", "read");
	const hasAccountProductPerm = !!getMyPermissionLevel("BankAccountProduct", "read");
	const hasBankAccountPerm = !!getMyPermissionLevel("BankAccount", "read");
	const hasBankAccountRequestPerm = !!getMyPermissionLevel("BankAccountRequest", "read");
	const hasLegalPersonPerm = !!getMyPermissionLevel("LegalPerson", "read");
	const hasNaturalPersonPerm = !!getMyPermissionLevel("NaturalPerson", "read");

	const useScan3 = !!+window.__RUNTIME_CONFIG__.REACT_APP_USE_SCAN3;
	const useAccountActive = !!+window.__RUNTIME_CONFIG__.REACT_APP_BANK_ACCOUNT_ACTIVE_MENU;
	const useCredit = !!+window.__RUNTIME_CONFIG__.REACT_APP_CREDIT_MENU;
	const useBankAccount = !!+window.__RUNTIME_CONFIG__.REACT_APP_BANK_ACCOUNT_REQUEST_MENU;
	const useCTE = !!+window.__RUNTIME_CONFIG__.REACT_APP_CTE_MENU && hasCreditPerm;
	const useProduct = !!+window.__RUNTIME_CONFIG__.REACT_APP_PRODUCT_MENU;
	const useFund = !!+window.__RUNTIME_CONFIG__.REACT_APP_FUND_MENU;
	const useProductAccount = !!+window.__RUNTIME_CONFIG__.REACT_APP_PRODUCT_ACCOUNT_MENU;
	const isRootTenancy = window.__RUNTIME_CONFIG__.REACT_APP_TENANT_TYPE === '0';

	const sidebarMenuItems = [
		hasCreditPerm ? {
			label: "Dashboard",
			path: "/",
			iconClass: <DashboardIcon className="dashboard" />,
			exact: true, menuOpenedKey: 'home',
			secret: false,
			children: []
		} : null,
		hasLegalPersonPerm ? {
			label: 'Jurídicas',
			path: '/pessoa-juridica/todos',
			iconClass: <BriefcaseIcon className="briefcase" />,
			exact: false,
			menuOpenedKey: 'pessoa-juridica',
			secret: false,
			children: isRootTenancy ? [
				useAccountActive ? {
					label: 'Todos',
					path: `/pessoa-juridica/todos`,
					exact: false,
					iconClass: <BillIcon />,
				} : null,
				{
					label: 'Pendentes',
					path: `/pessoa-juridica/pendentes`,
					exact: true,
					iconClass: <FormatListBulleted style={{ color: 'white' }} />,
				},
			] : [],
		} : null,
		hasNaturalPersonPerm ? {
			label: 'Físicas',
			path: '/pessoa-fisica/todos',
			iconClass: <PersonIcon className="person" />,
			exact: false,
			menuOpenedKey: 'pessoa-fisica',
			secret: false,
			children: isRootTenancy ? [
				useAccountActive ? {
					label: 'Todos',
					path: `/pessoa-fisica/todos`,
					exact: false,
					iconClass: <BillIcon />,
				} : null,
				{
					label: 'Pendentes',
					path: `/pessoa-fisica/pendentes`,
					exact: true,
					iconClass: <FormatListBulleted style={{ color: 'white' }} />,
				},
			] : [],
		} : null,
		useBankAccount && hasBankAccountPerm && !useScan3 ? {
			label: 'Contas Digitais',
			path: '/conta-digital',
			iconClass: <BankIcon />,
			exact: false,
			menuOpenedKey: 'conta-digital',
			secret: false,
			children: [
				useAccountActive ? {
					label: 'Ativas',
					path: `/contas-digitais`,
					exact: false,
					iconClass: <BillIcon />,
				} : null,
				hasBankAccountRequestPerm ? {
					label: 'Solicitações',
					path: `/solicitacao-conta-digital`,
					exact: true,
					iconClass: <FormatListBulleted style={{ color: 'white' }} />,
				} : null,
			].filter(item => item != null)
		} : null,
		useCredit && hasCreditPerm && !useScan3 ? {
			label: 'Crédito',
			path: ['/ccb', '/ccb/simular'],
			iconClass: <DolarIcon className="dolar" />,
			exact: false,
			menuOpenedKey: 'ccb',
			secret: false,
			children: isRootTenancy ? [
				{
					label: 'Operações',
					path: `/ccb`,
					exact: true,
					iconClass: <ViewListIcon style={{ color: 'white' }} />,
				},
				{
					label: 'Simular',
					path: `/ccb/simular`,
					exact: false,
					iconClass: <ListAltIcon style={{ color: 'white' }} />,
				},
				{
					label: 'Excluídos',
					path: `/ccb/excluidos`,
					exact: true,
					iconClass: <FormatListBulleted style={{ color: 'white' }} />,
				}
			] : [
				{
					label: 'Operações',
					path: `/ccb`,
					exact: true,
					iconClass: <ViewListIcon style={{ color: 'white' }} />,
				},
				{
					label: 'Simular',
					path: `/ccb/simular`,
					exact: false,
					iconClass: <ListAltIcon style={{ color: 'white' }} />,
				},
			]
		} : null,
		(useProduct || useFund || useProductAccount && !useScan3) &&
			(hasAccountProductPerm || hasCreditProductPerm || hasFundPerm) ? {
				label: 'Cadastro',
				path: ['/produto', '/fundo'],
				iconClass: <RegisterIcon className="register" />,
				exact: false,
				menuOpenedKey: 'register',
				secret: false,
				children: [
					useProductAccount && hasAccountProductPerm ? {
						label: 'Produto Conta',
						path: '/produto-conta',
						exact: true,
						iconClass: <ProductAccountIcon />,
					} : null,
					useProduct && hasCreditProductPerm ? {
						label: 'Produto Crédito',
						path: '/produto',
						exact: true,
						iconClass: <ProductIcon />,
					} : null,
					useFund && hasFundPerm ? {
						label: 'Fundos',
						path: '/fundo',
						iconClass: <FundIcon />,
						exact: false
					} : null,
				].filter(item => item != null)
			} : null,
		useCTE && !useScan3 ? {
			label: 'Desconto CT-e',
			path: '/cte',
			iconClass: <SaleIcon />,
			exact: false,
			menuOpenedKey: 'cte',
			secret: false,
			children: [],
		} : null,
		{
			label: 'Configurações',
			path: ['/profile/owner', '/profile/place', '/profile/images'],
			iconClass: <SettingsIcon className="settings" />,
			menuOpenedKey: 'configuration',
			secret: false,
			children: [
				{
					label: 'Alterar senha',
					path: '/change-password',
					iconClass: <VpnKeyOutlinedIcon style={{ color: 'white' }} />,
				}
			]
		},
		hasUserPerm || hasGroupPerm ? {
			label: 'Segurança',
			path: ['/operador', '/grupo'],
			iconClass: <SecurityIcon className="register" />,
			exact: false,
			menuOpenedKey: 'register',
			secret: false,
			children: [
				hasUserPerm ? {
					label: 'Operadores',
					className: 'side-title-step-operators',
					path: '/operador',
					exact: true,
					iconClass: <OperatorsIcon className="operators" style={{ color: 'white' }} />,
					secret: true,
					children: [],
				} : null,
				hasGroupPerm ? {
					label: 'Grupos',
					path: '/grupo',
					iconClass: <GroupsIcon />,
					exact: false
				} : null,
			].filter(item => item != null)
		} : null
	].filter(i => i != null);

	return sidebarMenuItems;
};