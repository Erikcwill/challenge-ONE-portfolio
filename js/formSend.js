const messages = {
    // Objeto que contém as mensagens de erro para cada campo do formulário
    nome: {
      valueMissing: "O campo de nome não pode estar vazio.",
      patternMismatch: "Por favor, preencha um nome válido.",
      tooShort: "Por favor, preencha um nome válido.",
    },
    email: {
      valueMissing: "O campo de e-mail não pode estar vazio.",
      typeMismatch: "Por favor, preencha um email válido.",
      tooShort: "Por favor, preencha um e-mail válido.",
    },
    assunto: {
      valueMissing: "O campo de assunto não pode estar vazio.",
      patternMismatch: "Por favor, preencha com um assunto válido.",
      tooShort: "O campo de assunto não tem caracteres suficientes.",
    },
    mensagem: {
      valueMissing: "O campo de mensagem não pode estar vazio.",
      patternMismatch: "Por favor, preencha com uma mensagem válida.",
      tooShort: "O campo de mensagem não tem caracteres suficientes.",
    },
  };
  
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
      alert("Mensagem enviada!");
    }
  
    // Função para exibir uma mensagem de erro
    displayError() {
      alert("Não foi possível enviar sua mensagem, tente novamente mais tarde!");
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
        const messageError = field.parentNode.querySelector(".formcontato__error");
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
  