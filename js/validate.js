document.getElementById("meuFormulario").addEventListener("submit", function(event) {
    var nome = document.getElementsByName("nome")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var assunto = document.getElementsByName("assunto")[0].value;
    var mensagem = document.getElementsByName("mensagem")[0].value;
  
    var nomeValido = nome.trim() !== "";
    var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    var assuntoValido = assunto.trim() !== "";
    var mensagemValida = mensagem.trim() !== "";
  
    if (!nomeValido) {
      event.preventDefault();
      exibirMensagemErro("nome", "Por favor, insira um nome válido.");
    }
  
    if (!emailValido) {
      event.preventDefault();
      exibirMensagemErro("email", "Por favor, insira um e-mail válido.");
    }
  
    if (!assuntoValido) {
      event.preventDefault();
      exibirMensagemErro("assunto", "Por favor, insira um assunto válido.");
    }
  
    if (!mensagemValida) {
      event.preventDefault();
      exibirMensagemErro("mensagem", "Por favor, insira uma mensagem válida.");
    }
  });
  
  function exibirMensagemErro(campo, mensagem) {
    var campoInput = document.getElementsByName(campo)[0];
    var mensagemErro = document.createElement("span");
    mensagemErro.className = "mensagem-erro";
    mensagemErro.textContent = mensagem;
  
    var containerCampo = campoInput.parentElement;
    containerCampo.appendChild(mensagemErro);
  }
  