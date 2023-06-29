//Arquivo principal que executa as funções importadas de todos os arquivos, como formulário, botões e animaçãos.
import { rotateProfile } from "./profileAnimation.js";
import { initFormSubmit } from "./formSend.js";
import { adicionarBotaoVoltarAoTopo } from "./topButton.js";
import { configurarWhatsAppButton } from "./whatsButton.js";

var profileElement = document.querySelector(".tittle__profile");
profileElement.addEventListener("click", rotateProfile);

initFormSubmit();
adicionarBotaoVoltarAoTopo();
configurarWhatsAppButton();
