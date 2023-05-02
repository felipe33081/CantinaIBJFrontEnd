import accounting from "accounting";
import { format } from "date-fns";
import moment from "moment";

export default class Helper {

	static formatPixValue(pixKeyTypeValue, keyPix) {

		if (pixKeyTypeValue === "NaturalRegistrationNumber") {
			return keyPix.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4").slice(0, 14);
		} else if (pixKeyTypeValue === "LegalRegistrationNumber") {
			return keyPix.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5").slice(0, 18);
		} else if (pixKeyTypeValue === "Phone") {
			return this.formatPhoneNumber(keyPix?.replace("+55", ""));
		} else if (pixKeyTypeValue === "Email") {
			return keyPix;
		} else {
			return keyPix;
		}
	}

	static formatPhoneNumber(value) {
		if (!value) return "";
		value = value.replace(/\D/g,'');
		value = value.replace(/(\d{2})(\d)/,"($1) $2").slice(0, 14); 
		value = value.replace(/(\d)(\d{4})$/,"$1-$2"); 
		return value;
	}

	static formatCEP(value) {
		if (!value) return;
		const cep = value.replace(/\D/g, "");
		return cep.replace(/(\d{5})(\d{3})/g, "$1-$2");
	}

	static formatThousand(num) {
		accounting.settings = {
			number: {
				precision: 0,
				thousand: ".",
				decimal: ",",
			},
		};
		if (num === undefined) return "0";
		// return num.toLocaleString(window.navigator.language, { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
		return accounting.formatNumber(num);
	}

	static formatDocumentNumber(value) {
		if (!value || !value.replace) return value;

		const cnpjCpf = value.replace(/\D/g, "");

		if (cnpjCpf.length <= 11) {
			return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
		} else if (cnpjCpf.length <= 14) {
			return cnpjCpf.replace(
				/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
				"$1.$2.$3/$4-$5"
			);
		}
		return null;
	}

	static formatCurrency(num) {
		if (isNaN(num)) return "N/D";
		if (!num) return "R$ 0,00";

		accounting.settings = {
			currency: {
				format: "%s%v",
				decimal: ",",
				thousand: ".",
				precision: 2,
			},
			number: {
				precision: 2,
				thousand: ".",
				decimal: ",",
			},
		};

		return accounting.formatMoney(num / 100, "R$ ");
	}

	static formatCurrencyAsIs(num) {
		if (isNaN(num)) return "N/D";
		if (!num) return "R$ 0,00";

		accounting.settings = {
			currency: {
				format: "%s%v",
				decimal: ",",
				thousand: ".",
				precision: 2,
			},
			number: {
				precision: 2,
				thousand: ".",
				decimal: ",",
			},
		};

		return accounting.formatMoney(num, "R$ ");
	}

	static formatPercentage = (num) => {
		if (!num) return 0;
		const formatNumber = `${(num * 100).toFixed(4)}%`;
		return formatNumber.toString().replace(".", ",");
	};

	static formatPercentageAsIs = (num) => {
		if (!num) return 0;
		const formatNumber = `${(num).toFixed(4)}%`;
		return formatNumber.toString().replace(".", ",");
	};

	static formatCurrencyWithoutSymbol = (num) =>
		this.formatCurrency(num).replace("R$", "");

	static formatDate(dateString) {
		return new Date(dateString).toLocaleDateString("pt-BR", {
			timeZone: "America/Sao_Paulo",
		});
	}

	static formatBankAccountDetails(item){			
		return { 
			name: item.operationTypeValue == "Pix" ? 
				item.pixKeyTypeValue == "AgencyAndAccount" ?
					`Chave Pix: ${item.bankCodeDisplay} - Ag: ${item.agency} ${item.agencyDigit ?
						("-" + item.agencyDigit) : ''}		Conta: ${item.account || ''}${item.accountDigit ? '-' + item.accountDigit : '' || ''}`   :
					`Chave Pix: ${item.keyPix}` :
				`Transferência: ${item.bankCodeDisplay} - Ag: ${item.agency} ${item.agencyDigit ? ("-" + item.agencyDigit) : ''}
				Conta: ${item.account || ''}${item.accountDigit ? '-' + item.accountDigit : '' || ''}`, 
			value: item.id };
	};


	static formatYearMonthToMonthYear(date) {
		if (date != null) {
			return date.substr(5, 2) + "/" + date.substr(0, 4);
		} else {
			return date;
		}
	}

	static translateDate(date) {
		if (date) {
			var day = date.substr(0, 2);
			var month = date.substr(3, 2);
			var year = date.substr(6, 4);
			return `${month}/${day}/${year}`;
		} else {
			return date;
		}
	}

	static formatDateToServerString = (date) =>
		format(date, "MM/dd/yyyy HH:mm:ss");

	static formatServerDateToString = (date) => {
		return moment(date).locale('pt-br').format('LLL');
	};
	
	static onlyNumbers = (str) => str.replace(/\D/g, "");

	static percentFormat = (number) => number.toFixed(2).replace(".", ",") + "%";
	
	static formatCepForInput = [
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		"-",
		/\d/,
		/\d/,
	];

	static cpfMask = [
		/\d/,
		/\d/,
		/\d/,
		".",
		/\d/,
		/\d/,
		/\d/,
		".",
		/\d/,
		/\d/,
		/\d/,
		"-",
		/\d/,
		/\d/,
	];
	static currencyMask = [/(\d)(?=(\d{3})+(?!\d))/];

	static cnpjMask = [
		/\d/,
		/\d/,
		".",
		/\d/,
		/\d/,
		/\d/,
		".",
		/\d/,
		/\d/,
		/\d/,
		"/",
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		"-",
		/\d/,
		/\d/,
	];
	static phoneNumberMask = [
		"(",
		/\d/,
		/\d/,
		")",
		" ",
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		"-",
		/\d/,
		/\d/,
		/\d/,
		/\d/,
	];

	static zipCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
}
