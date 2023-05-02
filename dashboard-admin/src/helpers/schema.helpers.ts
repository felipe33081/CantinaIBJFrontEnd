export default class Helper {

	static validURL(str: string) {
		var regex =
            /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
		if (!regex.test(str)) {
			return false;
		} else {
			return true;
		}
	}

    static onlyNumbers = (str: string) => str.replace(/\D/g, "");

    static cpfValidate(cpf: string) {
    	if (!cpf || !cpf.length) {
    		return false;
    	}

    	cpf = this.onlyNumbers(cpf);
    	if (!cpf.length) {
    		return false;
    	}

    	if (
    		cpf.length !== 11 ||
            cpf === "00000000000" ||
            cpf === "11111111111" ||
            cpf === "22222222222" ||
            cpf === "33333333333" ||
            cpf === "44444444444" ||
            cpf === "55555555555" ||
            cpf === "66666666666" ||
            cpf === "77777777777" ||
            cpf === "88888888888" ||
            cpf === "99999999999"
    	)
    		return false;

    	var add = 0;
    	for (var i = 0; i < 9; i++) add += Number(cpf.charAt(i)) * (10 - i);
    	var rev = 11 - (add % 11);
    	if (rev === 10 || rev === 11) rev = 0;
    	if (rev !== Number(cpf.charAt(9))) return false;

    	add = 0;
    	for (i = 0; i < 10; i++) add += Number(cpf.charAt(i)) * (11 - i);
    	rev = 11 - (add % 11);
    	if (rev === 10 || rev === 11) rev = 0;
    	if (rev !== Number(cpf.charAt(10))) return false;
    	return true;
    }

    static cnpjValidate(cnpj: string) {
    	cnpj = cnpj.replace(/[^\d]+/g, "");

    	if (cnpj === "") return false;
    	var tamanho, numeros, digitos, pos, soma, i, resultado;
    	if (cnpj.length !== 14) return false;

    	// Elimina CNPJs invalidos conhecidos
    	if (
    		cnpj === "00000000000000" ||
            cnpj === "11111111111111" ||
            cnpj === "22222222222222" ||
            cnpj === "33333333333333" ||
            cnpj === "44444444444444" ||
            cnpj === "55555555555555" ||
            cnpj === "66666666666666" ||
            cnpj === "77777777777777" ||
            cnpj === "88888888888888" ||
            cnpj === "99999999999999"
    	)
    		return false;

    	// Valida DVs
    	tamanho = cnpj.length - 2;
    	numeros = cnpj.substring(0, tamanho);
    	digitos = cnpj.substring(tamanho);
    	soma = 0;
    	pos = tamanho - 7;
    	for (i = tamanho; i >= 1; i--) {
    		soma += Number(numeros.charAt(tamanho - i)) * pos--;
    		if (pos < 2) pos = 9;
    	}
    	resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    	if (resultado !== Number(digitos.charAt(0))) return false;

    	tamanho = tamanho + 1;
    	numeros = cnpj.substring(0, tamanho);
    	soma = 0;
    	pos = tamanho - 7;
    	for (i = tamanho; i >= 1; i--) {
    		soma += Number(numeros.charAt(tamanho - i)) * pos--;
    		if (pos < 2) pos = 9;
    	}
    	resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    	if (resultado !== Number(digitos.charAt(1))) return false;

    	return true;
    }

    static isEmailValid = (email: string) => {
    	const regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return regex.test(email);
    };
}
