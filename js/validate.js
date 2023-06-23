const messages = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válidos.",
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
    tooShort: "O campo de assunto não tem caractéres suficientes.",
  },
  mensagem: {
    valueMissing: "O campo de mensagem não pode estar vazio.",
    patternMismatch: "Por favor, preencha com uma mensagem válida.",
    tooShort: "O campo de mensagem não tem caractéres suficientes.",
  },
};

const formsInput = document.querySelectorAll("[required]");

formsInput.forEach((field) => {
  field.addEventListener("blur", () => checkField(field));
});

const errorTypes = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];

function checkField(field) {
  let message = "";

  errorTypes.forEach((error) => {
    if (field.validity[error]) {
      message = messages[field.name][error];
      console.log(message);
    }
  });
  const messageError = field.parentNode.querySelector(".formcontato__error");
  const inputCheck = field.checkValidity();

  if (!inputCheck) {
    messageError.textContent = message;
  } else {
    messageError.textContent = "";
  }
}
