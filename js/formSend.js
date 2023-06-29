import { messages } from "./messages.js";

class FormSubmit {
  constructor(settings) {
    // Configurações do formulário
    this.settings = settings;
    // Referência para o elemento do formulário
    this.form = document.querySelector(settings.form);
    // Referência para o botão do formulário
    this.formButton = document.querySelector(settings.button);
    // URL de destino do formulário
    this.url = this.form ? this.form.getAttribute("action") : null;
    // Lista de campos do formulário que são obrigatórios
    this.fields = this.form ? this.form.querySelectorAll("[required]") : [];
    // Vincula o contexto do método sendForm à instância da classe
    this.sendForm = this.sendForm.bind(this);
  }

  // Função para exibir uma mensagem de sucesso
  displaySuccess() {
    Swal.fire({
      icon: "success",
      title: "Mensagem enviada!",
      text: "Eu te respondo o mais rápido possivel!",
      background: "#eaf2fd",
      confirmButtonColor: "#2a7ae4",
    });
  }

  // Função para exibir uma mensagem de erro
  displayError() {
    Swal.fire({
      icon: "error",
      title: "Algo deu errado...",
      text: "Tente mais tarde! Eu vou corrigir isso",
      background: "#eaf2fd",
      confirmButtonColor: "#2a7ae4",
    });
  }

  // Obtém um objeto contendo os valores dos campos do formulário
  getFormObject() {
    const formObject = {};
    this.fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  // Obtém a mensagem de erro correspondente a um campo inválido
  getErrorMessage(field) {
    const error = Object.keys(messages[field.name]).find((errorType) => {
      return field.validity[errorType];
    });

    if (error) {
      return messages[field.name][error];
    }

    return "";
  }

  // Exibe a mensagem de erro de um campo inválido
  displayFieldError(field) {
    const messageError = field.parentNode.querySelector(".formcontato__error");
    const message = this.getErrorMessage(field);
    messageError.textContent = message;
  }

  // Valida o formulário verificando se todos os campos são válidos
  validateForm() {
    for (const field of this.fields) {
      const isValid = field.checkValidity();
      const messageError = field.parentNode.querySelector(
        ".formcontato__error"
      );
      if (!isValid) {
        this.displayFieldError(field);
        return false;
      } else {
        messageError.textContent = "";
        field.setCustomValidity("");
      }
    }
    return true;
  }

  // Envia o formulário via requisição assíncrona
  async sendForm(event) {
    try {
      event.preventDefault();

      const isValid = this.validateForm();

      if (!isValid) {
        return;
      }

      this.formButton.disabled = true;
      this.formButton.innerText = "Enviando...";

      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });

      if (response.ok) {
        this.displaySuccess();
        this.form.reset();
      } else {
        throw new Error("Erro ao enviar o formulário");
      }
    } catch (error) {
      this.displayError();
    } finally {
      this.formButton.disabled = false;
      this.formButton.innerText = "Enviar mensagem";
    }
  }

  // Inicializa o formulário adicionando os event listeners aos campos e ao botão
  init() {
    if (this.form) {
      this.formButton.addEventListener("click", this.sendForm);
      this.fields.forEach((field) => {
        field.addEventListener("input", () => {
          this.displayFieldError(field);
        });
        field.addEventListener("blur", () => {
          this.displayFieldError(field);
        });
      });
    }
    return this;
  }
}

// Instância da classe FormSubmit
export function initFormSubmit() {
  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
  });
  formSubmit.init();
}
