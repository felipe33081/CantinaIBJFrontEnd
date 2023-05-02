import { Toast } from "../components";

export default class Helper {

	static statusTheme(status: string) {

		return status === "Aprovado" ? "#00CD2D" :
			status === "Efetivada" ? "#00CD2D" :
				status === "Pendente" ? "#FF672F" :
					status === "Rejeitado" ?
						"#F50057" :
						status === "Tempo limite esgotado" ? "#f08700" :
							status === "Em processamento" ? "#f08700" :
								status === "Cancelado pelo usuário" ? "#f40000" :
									status === "Erro na autorização" ? "#F50057" : null;
	};

	static parseErrors(message: string, error: any) {
		if (error?.response?.data?.errors) {
			Toast.showErrorMessage(error.response.data.errors);
		} else {
			Toast.showErrorMessage(message);
		}
	};

	static typeStatus = (status: string) => {
		switch (status) {
			case "Approved":
				return "Aprovado";
			case "Disapproved":
				return "Reprovado";
			default:
				return "Não solicitado";
		}
	};

	static codeToMessage(code: string) {
		switch (code) {
			case "LimitExceededException":
				return "Limite de tentativas excedido. Tente novamente mais tarde.";
			case "UserNotConfirmedException":
				return "Este usuário não esta confirmado.";
			case "PasswordResetRequiredException":
				return "Você precisa alterar sua senha, através do esqueceu a senha.";
			case "NotAuthorizedException":
				return "Usuário e senha incorretos.";
			case "ResourceNotFoundException":
				return "Usuário e senha incorretos.";
			case "UsernameExistsException":
				return "Este e-mail/nome de usuário já esta sendo utilizado.";
			case "UserNotFoundException":
				return "Este usuário não existe.";
			case "CodeMismatchException":
				return "Código inválido, tente novamente.";
			default:
				return "Ocorreu um erro ao realizar a requisição. Tente novamente.";
		}
	}

	static invalidPasswordMessage(message: string) {
		if (message.includes('enough')) {
			return 'A senha não é longa o suficiente';
		} else if (message.includes('lowercase')) {
			return 'A senha deve conter letra minúscula';
		} else if (message.includes('uppercase')) {
			return 'A senha deve conter letra maiúscula';
		} else if (message.includes('numeric')) {
			return 'A senha deve conter número';
		} else if (message.includes('symbol')) {
			return 'A senha deve conter caracter especial';
		}
	}

}
