import "toastr/build/toastr.css";
import "./toast.scss";
import toastr from "toastr";
import Helper from "../../helpers/messages.helpers";

// Adicione suas classes de ícones aqui
toastr.options.closeButton = true;
toastr.options.timeOut = 4000;
toastr.options.extendedTimeOut = 4000;
toastr.options.toastClass = "toast__container";
// Classes de ícones do Font Awesome
toastr.options.iconClasses = {
	error: 'toast__container--error',
	success: 'toast__container--success',
	info: 'toast__container--info'
};

export default class Toast {
  static showErrorMessage(message, title = "Erro", exception) {
    if (exception) {
      if (
        exception.response &&
        exception.response.data &&
        exception.response.data.errors
      ) {
        message = exception.response.data.errors;
      } else if (exception.code) {
        const isInvalidPasswordException =
          exception.code === "InvalidPasswordException";
        const cognitoErrorMessage = !isInvalidPasswordException
          ? Helper.codeToMessage(exception.code)
          : Helper.invalidPasswordMessage(exception.message);
        if (cognitoErrorMessage) {
          message = cognitoErrorMessage;
        }
      }
    }
    if (Array.isArray(message)) message = message.join(", ");

    toastr.error(message, title);
  }

  static showSuccessMessage(message, title = "Sucesso") {
    toastr.success(message, title);
  }

  static showInfoMessage(message, title = "Informação") {
    toastr.info(message, title);
  }
}
